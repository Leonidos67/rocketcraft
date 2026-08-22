import re
from collections import defaultdict
from pathlib import Path

text = Path("cc02c1c2-633e-49e7-8fa6-ed07f692a57d (1).svg").read_text(encoding="utf-8")
VB_W, VB_H = 1086.0, 1448.0

def to_vb(px, py):
    return px * 0.1, VB_H - py * 0.1

# window ledge / head paths
pat = re.compile(r'<path d="M(\d+) (\d+) c0 -6 \d+ -10 \d+ -10')
by_y = defaultdict(set)
for m in pat.finditer(text):
    px, py = int(m.group(1)), int(m.group(2))
    by_y[py].add(px)

print("rows found:", len(by_y))
for py in sorted(by_y.keys(), reverse=True):
    xs = sorted(by_y[py])
    vy = to_vb(xs[0], py)[1]
    print(f"path_y={py} vb_y%={vy/VB_H*100:.2f} windows={len(xs)}")
    if len(xs) >= 9:
        centers = [round(to_vb(x + 125, py - 30)[0]/VB_W*100, 2) for x in xs]
        print("  x%:", centers)

# full window body paths - broader pattern
pat2 = re.compile(r'<path d="M(\d+) (\d+) c0 -6')
by_y2 = defaultdict(list)
for m in pat2.finditer(text):
    px, py = int(m.group(1)), int(m.group(2))
    by_y2[py].append(px)

print("\nbroader pattern rows:", len(by_y2))
facade_ys = sorted([py for py, xs in by_y2.items() if len(xs) >= 10], reverse=True)
print("rows with >=10:", len(facade_ys))

col_sums = [0.0]*20
col_n = [0]*20
row_centers = []

for py in sorted(facade_ys, reverse=True)[:11]:
    xs = sorted(set(by_y2[py]))
    vy = to_vb(0, py)[1]
    row_centers.append(round(vy/VB_H*100, 2))
    print(f"y={py} n={len(xs)} x_path={xs}")
    for i, x in enumerate(xs[:11]):
        cx, _ = to_vb(x + 125, py)
        col_sums[i] += cx
        col_n[i] += 1

ncol = max(i for i,n in enumerate(col_n) if n>0) + 1
cols = [round(col_sums[i]/col_n[i]/VB_W*100, 2) for i in range(ncol) if col_n[i]]
print("\nncol", ncol)
print("cols", cols)
print("rows", list(reversed(row_centers)))
if len(cols)>1:
    print("icon%", round((cols[1]-cols[0])*0.72, 2))
