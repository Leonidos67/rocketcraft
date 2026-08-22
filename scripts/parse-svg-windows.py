"""Parse imagetracer skyscraper SVG for blue window path centers."""
import re
from collections import defaultdict
from pathlib import Path

path = Path("public/skyscraper.svg")
VB_W, VB_H = 1086.0, 1448.0
text = path.read_text(encoding="utf-8")

# imagetracer paths: <path fill="rgb(186,218,247)" ... d="M x y L ..." />
pattern = re.compile(
    r'<path fill="rgb\((\d+),(\d+),(\d+)\)"[^>]*d="([^"]+)"'
)

def parse_points(d: str) -> list[tuple[float, float]]:
    nums = [float(n) for n in re.findall(r"-?\d+\.?\d*", d)]
    pts = []
    i = 0
    while i + 1 < len(nums):
        pts.append((nums[i], nums[i + 1]))
        i += 2
    return pts

windows = []
for m in pattern.finditer(text):
    r, g, b = int(m.group(1)), int(m.group(2)), int(m.group(3))
    if not (180 <= r <= 195 and 210 <= g <= 225 and 240 <= b <= 255):
        continue
    pts = parse_points(m.group(4))
    if len(pts) < 3:
        continue
    xs = [p[0] for p in pts]
    ys = [p[1] for p in pts]
    w, h = max(xs) - min(xs), max(ys) - min(ys)
    if w < 15 or h < 15 or w > 120 or h > 120:
        continue
    cx = (min(xs) + max(xs)) / 2
    cy = (min(ys) + max(ys)) / 2
    windows.append((cx, cy, w, h))

print("blue window paths:", len(windows))

by_row = defaultdict(list)
for cx, cy, w, h in windows:
    by_row[round(cy / 12) * 12].append((cx, cy))

rows = sorted(by_row.items(), key=lambda kv: kv[0])
print("rows:", len(rows))
for yk, pts in rows:
    pts.sort(key=lambda p: p[0])
    counts = len(pts)
    if counts >= 8:
        print(f"  y_key={yk} count={counts}")

# cluster rows with ~11 windows
facade = [pts for _, pts in rows if len(pts) >= 9]
# merge adjacent row buckets
merged: list[list[tuple[float, float]]] = []
for _, pts in rows:
    if len(pts) < 8:
        continue
    if merged and abs(sum(p[1] for p in pts)/len(pts) - sum(p[1] for p in merged[-1])/len(merged[-1])) < 25:
        merged[-1].extend(pts)
    else:
        merged.append(list(pts))

print("\nmerged facade rows:", len(merged))
for i, pts in enumerate(merged):
    pts.sort(key=lambda p: p[0])
    # cluster x into columns
    cols_x = [p[0] for p in pts]
    print(f"  row {i}: n={len(pts)} y%={round(sum(p[1] for p in pts)/len(pts)/VB_H*100,2)}")

# Use rows with most windows
best_rows = sorted(merged, key=lambda r: -len(r))[:11]
best_rows.sort(key=lambda r: sum(p[1] for p in r) / len(r))

# column clustering across best rows
all_pts = []
for row in best_rows:
    all_pts.extend(row)

# k-means style: sort unique x clusters
xs_sorted = sorted(set(round(p[0], 0) for p in all_pts))
col_clusters: list[list[float]] = []
for x in xs_sorted:
    if not col_clusters or x - col_clusters[-1][-1] > 40:
        col_clusters.append([x])
    else:
        col_clusters[-1].append(x)

col_centers = [round(sum(c)/len(c)/VB_W*100, 2) for c in col_clusters]
print("\ncol clusters:", len(col_clusters), col_centers)

# If not 11 cols, use grid inference from bounds
if windows:
    xs = [w[0] for w in windows]
    ys = [w[1] for w in windows]
    # only upper facade (exclude entrance)
    facade_wins = [w for w in windows if w[1] < VB_H * 0.78]
    xs = [w[0] for w in facade_wins]
    ys = [w[1] for w in facade_wins]
    left, right = min(xs), max(xs)
    top, bottom = min(ys), max(ys)
    print(f"\nbounds %: {left/VB_W*100:.2f} {top/VB_H*100:.2f} {right/VB_W*100:.2f} {bottom/VB_H*100:.2f}")

    for cols in [11, 10]:
        for inset_x, inset_y in [(0.04, 0.05), (0.05, 0.06)]:
            ix = (right-left)*inset_x
            iy = (bottom-top)*inset_y
            el, et = left+ix, top+iy
            ew, eh = (right-left)-2*ix, (bottom-top)-2*iy
            col_c = [round((el+(i+0.5)*ew/cols)/VB_W*100,2) for i in range(cols)]
            row_c = [round((et+(i+0.5)*eh/11)/VB_H*100,2) for i in range(11)]
            hits = sum(
                1 for cc in col_c for rc in row_c
                if any(abs(w[0]/VB_W*100-cc)<2 and abs(w[1]/VB_H*100-rc)<3 for w in facade_wins)
            )
            print(f"  grid {cols}x11 inset {inset_x}/{inset_y} hits={hits}/{cols*11}")
