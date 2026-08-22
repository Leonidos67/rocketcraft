"""Calibrate 11 columns x 10 rows from imagetracer SVG window pixels."""
import re
from collections import defaultdict
from pathlib import Path

VB_W, VB_H = 1086.0, 1448.0
text = Path("public/skyscraper.svg").read_text(encoding="utf-8")

pattern = re.compile(
    r'<path fill="rgb\((\d+),(\d+),(\d+)\)"[^>]*d="([^"]+)"'
)

def parse_points(d):
    nums = [float(n) for n in re.findall(r"-?\d+\.?\d*", d)]
    pts = []
    for i in range(0, len(nums) - 1, 2):
        pts.append((nums[i], nums[i + 1]))
    return pts

centers = []
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
    if w < 10 or h < 10:
        continue
    centers.append(((min(xs)+max(xs))/2, (min(ys)+max(ys))/2))

# facade only (above entrance)
facade = [(x, y) for x, y in centers if y < VB_H * 0.78]
xs = [p[0] for p in facade]
ys = [p[1] for p in facade]
left, right = min(xs), max(xs)
top, bottom = min(ys), max(ys)
print("bounds %", round(left/VB_W*100,2), round(top/VB_H*100,2), round(right/VB_W*100,2), round(bottom/VB_H*100,2))

COLS, ROWS = 11, 10
best = None
for inset_x in [i/100 for i in range(3, 9)]:
    for inset_y in [i/100 for i in range(4, 10)]:
        ix = (right-left)*inset_x
        iy = (bottom-top)*inset_y
        el, et = left+ix, top+iy
        ew, eh = (right-left)-2*ix, (bottom-top)-2*iy
        col_c = [(el+(i+0.5)*ew/COLS) for i in range(COLS)]
        row_c = [(et+(i+0.5)*eh/ROWS) for i in range(ROWS)]
        hits = 0
        for cc in col_c:
            for rc in row_c:
                if any(abs(x-cc)<28 and abs(y-rc)<32 for x,y in facade):
                    hits += 1
        if best is None or hits > best[0]:
            best = (hits, inset_x, inset_y, col_c, row_c)

hits, ix, iy, col_c, row_c = best
print(f"best {hits}/{COLS*ROWS} inset {ix}/{iy}")
cols = [round(c/VB_W*100, 2) for c in col_c]
rows = [round(r/VB_H*100, 2) for r in row_c]
print("cols", cols)
print("rows", rows)
print("icon%", round((cols[1]-cols[0])*0.72, 2))

# verify vs potrace top row x% if available
potrace_cols = [33.66, 38.9, 44.15, 49.31, 54.65, 59.9, 65.15, 70.4, 75.74]
print("potrace 9 cols vs our 11:", cols[:3], "...", cols[-3:])
