"""Extract window centers from vector skyscraper SVG."""
import re
import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path

path = Path("cc02c1c2-633e-49e7-8fa6-ed07f692a57d (1).svg")
VB_W, VB_H = 1086.0, 1448.0

text = path.read_text(encoding="utf-8")
root = ET.fromstring(text)

# path coords use scale(0.1, -0.1) translate(0, 1448)
def to_vb(x, y):
    return x * 0.1, VB_H - y * 0.1

# Find horizontal bands that look like window rows: paths with "250 -10" pattern (window width)
row_paths = []
for elem in root.iter():
    if elem.tag.endswith("path"):
        d = elem.get("d", "")
        if "250 -10" in d or "250 -10" in d.replace(" ", ""):
            # extract M x y
            m = re.match(r"M\s*(\d+)\s+(\d+)", d)
            if m:
                px, py = int(m.group(1)), int(m.group(2))
                row_paths.append((px, py, d[:80]))

print("window-row paths:", len(row_paths))
# group by y
by_y = defaultdict(list)
for px, py, _ in row_paths:
    by_y[py].append(px)

print("unique row Y values:", len(by_y))
for y in sorted(by_y.keys(), reverse=True)[:15]:
    xs = sorted(by_y[y])
    vx, vy = to_vb(xs[0], y)
    print(f"  path_y={y} vb_y%={vy/VB_H*100:.1f} windows={len(xs)} xs={xs[:12]}")

# Also find all small rects via bounding box of paths with fill blue-ish - this svg is monochrome
# Count windows per row from M x y at start of paths with width 250
windows = []
for elem in root.iter():
    if not elem.tag.endswith("path"):
        continue
    d = elem.get("d", "")
    if not d.startswith("M"):
        continue
    # pattern: MXXXX YYYY c0 -6 90 -10 250 -10
    if re.search(r"c0 -6 \d+ -10 250 -10", d):
        m = re.match(r"M(\d+) (\d+)", d)
        if m:
            px, py = int(m.group(1)), int(m.group(2))
            cx, cy = to_vb(px + 125, py - 5)  # center approx
            windows.append((cx, cy))

print("\nstrict window paths:", len(windows))
by_row = defaultdict(list)
for cx, cy in windows:
    by_row[round(cy / 15) * 15].append((cx, cy))

facade = sorted(by_row.items(), key=lambda kv: kv[0])
print("facade rows:", len(facade))
for key, pts in facade:
    pts.sort(key=lambda p: p[0])
    print(f"  y_vb~{key} count={len(pts)} x%={[round(p[0]/VB_W*100,1) for p in pts]}")

# aggregate columns from rows with 11 windows
rows11 = [pts for _, pts in facade if len(pts) >= 11]
print("\nrows with >=11:", len(rows11))
if rows11:
    ncol = 11
    col_sums = [0.0]*ncol
    col_n = [0]*ncol
    row_centers = []
    for pts in sorted(rows11, key=lambda p: p[0][1])[:11]:
        pts.sort(key=lambda p: p[0])
        row_centers.append(round(sum(p[1] for p in pts[:11])/11/VB_H*100, 2))
        for i, (cx, _) in enumerate(pts[:11]):
            col_sums[i] += cx
            col_n[i] += 1
    cols = [round(col_sums[i]/col_n[i]/VB_W*100, 2) for i in range(ncol)]
    print("cols:", cols)
    print("rows:", row_centers)
    print("icon%:", round((cols[1]-cols[0])*0.72, 2))
