"""Find all window slots in potrace skyscraper SVG."""
import re
import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path

path = Path("cc02c1c2-633e-49e7-8fa6-ed07f692a57d (1).svg")
VB_W, VB_H = 1086.0, 1448.0

def to_vb(x, y):
    return x * 0.1, VB_H - y * 0.1

def bbox_from_path(d: str):
    nums = [float(n) for n in re.findall(r"-?\d+\.?\d*", d)]
    if len(nums) < 4:
        return None
    xs = nums[0::2][:200]
    ys = nums[1::2][:200]
    if not xs or not ys:
        return None
    return min(xs), min(ys), max(xs), max(ys)

root = ET.fromstring(path.read_text(encoding="utf-8"))
candidates = []

for elem in root.iter():
    if not elem.tag.endswith("path"):
        continue
    d = elem.get("d", "")
    bb = bbox_from_path(d)
    if not bb:
        continue
    x0, y0, x1, y1 = bb
    pw, ph = x1 - x0, y1 - y0
    # window cell in path units
    if 200 < pw < 400 and 150 < ph < 450:
        cx = (x0 + x1) / 2
        cy = (y0 + y1) / 2
        vx, vy = to_vb(cx, cy)
        candidates.append((vx, vy, pw * 0.1, ph * 0.1))

print("candidates:", len(candidates))

by_row = defaultdict(list)
for vx, vy, pw, ph in candidates:
    by_row[round(vy / 10) * 10].append((vx, vy))

rows = sorted(by_row.items(), key=lambda kv: kv[0])
facade = [(k, v) for k, v in rows if len(v) >= 9]
print("rows with >=9:", len(facade))
for k, pts in facade:
    pts.sort(key=lambda p: p[0])
    print(f"  vy~{k} n={len(pts)} x%={[round(p[0]/VB_W*100,1) for p in pts]}")

# pick rows with exactly 11 or closest
target = [v for k, v in facade if len(v) >= 10]
target.sort(key=lambda pts: sum(p[1] for p in pts) / len(pts))

# dedupe columns
if target:
    use = target[:11] if len(target) >= 11 else target
    ncol = max(len(r) for r in use)
    print("\nmax cols in row:", ncol)
    col_acc = defaultdict(list)
    for row in use:
        row.sort(key=lambda p: p[0])
        for i, (vx, vy) in enumerate(row):
            col_acc[i].append(vx)
    # if variable count, cluster all x
    all_x = sorted(set(round(p[0], 1) for row in use for p in row))
    clusters = []
    for x in all_x:
        if not clusters or x - clusters[-1][-1] > 35:
            clusters.append([x])
        else:
            clusters[-1].append(x)
    cols = [round(sum(c)/len(c)/VB_W*100, 2) for c in clusters]
    row_centers = [round(sum(p[1] for p in row)/len(row)/VB_H*100, 2) for row in use]
    print("col clusters", len(clusters), cols)
    print("rows", len(row_centers), row_centers)
    if len(cols) > 1:
        print("icon%", round((cols[1]-cols[0])*0.72, 2))
