"""Analyze skyscraper SVG window grid."""
from __future__ import annotations

import re
import xml.etree.ElementTree as ET
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SVG_PATHS = [
    ROOT / "public" / "skyscraper.svg",
    ROOT / "небоскреб.svg",
    ROOT / "cc02c1c2-633e-49e7-8fa6-ed07f692a57d (1).svg",
]

VB_W, VB_H = 1086.0, 1448.0


def path_to_viewbox(x: float, y: float, transform: str | None) -> tuple[float, float]:
    if transform and "scale(0.100000,-0.100000)" in transform.replace(" ", ""):
        # translate(0, 1448) scale(0.1, -0.1)
        return x * 0.1, VB_H - y * 0.1
    return x, y


def parse_path_coords(d: str) -> list[tuple[float, float]]:
    nums = [float(n) for n in re.findall(r"-?\d+\.?\d*", d)]
    pts: list[tuple[float, float]] = []
    i = 0
    cmd = "M"
    cx, cy = 0.0, 0.0
    while i < len(nums):
        if cmd in "Mm":
            cx, cy = nums[i], nums[i + 1]
            pts.append((cx, cy))
            i += 2
        elif cmd in "Ll":
            cx, cy = nums[i], nums[i + 1]
            pts.append((cx, cy))
            i += 2
        elif cmd in "Hh":
            cx = nums[i]
            pts.append((cx, cy))
            i += 1
        elif cmd in "Vv":
            cy = nums[i]
            pts.append((cx, cy))
            i += 1
        elif cmd in "Cc":
            i += 6
        elif cmd in "Ss":
            i += 4
        elif cmd in "Qq":
            i += 4
        elif cmd in "Tt":
            i += 2
        elif cmd in "Zz":
            pass
        else:
            i += 1
    return pts


def analyze_vector_svg(path: Path) -> None:
    print(f"\n=== {path.name} (vector paths) ===")
    text = path.read_text(encoding="utf-8", errors="ignore")
    if "imagetracer" in text[:500]:
        print("  imagetracer SVG — skip vector parse")
        return

    root = ET.fromstring(text)
    ns = {"svg": "http://www.w3.org/2000/svg"}
    g = root.find(".//svg:g", ns) or root.find(".//{http://www.w3.org/2000/svg}g")
    transform = g.get("transform") if g is not None else None

    rects: list[tuple[float, float, float, float]] = []
    for elem in root.iter():
        tag = elem.tag.split("}")[-1]
        if tag != "path":
            continue
        d = elem.get("d", "")
        pts = parse_path_coords(d)
        if len(pts) < 4:
            continue
        xs = [p[0] for p in pts]
        ys = [p[1] for p in pts]
        pw, ph = max(xs) - min(xs), max(ys) - min(ys)
        # window-sized in path units (~250 wide, ~200-400 tall)
        if 180 < pw < 320 and 80 < ph < 500:
            x0, y0 = min(xs), min(ys)
            vx0, vy0 = path_to_viewbox(x0, y0, transform)
            vx1, vy1 = path_to_viewbox(x0 + pw, y0 + ph, transform)
            rects.append((min(vx0, vx1), min(vy0, vy1), abs(vx1 - vx0), abs(vy1 - vy0)))

    print(f"  candidate window rects: {len(rects)}")
    if len(rects) < 50:
        return

    centers = [(r[0] + r[2] / 2, r[1] + r[3] / 2) for r in rects]
    row_buckets: dict[int, list[tuple[float, float]]] = defaultdict(list)
    for cx, cy in centers:
        key = round(cy / 8) * 8
        row_buckets[key].append((cx, cy))

    rows = sorted(row_buckets.items(), key=lambda kv: kv[0])
    facade_rows = [r for r in rows if len(r[1]) >= 8]
    print(f"  facade rows (>=8 windows): {len(facade_rows)}")

    col_sums = defaultdict(float)
    col_counts = defaultdict(int)
    row_centers_vb: list[float] = []

    for _, pts in facade_rows[:12]:
        pts.sort(key=lambda p: p[0])
        row_centers_vb.append(round(sum(p[1] for p in pts) / len(pts) / VB_H * 100, 2))
        for i, (cx, _) in enumerate(pts[:11]):
            col_sums[i] += cx
            col_counts[i] += 1

    ncol = max(col_counts.keys()) + 1 if col_counts else 0
    col_centers = [
        round(col_sums[i] / col_counts[i] / VB_W * 100, 2) for i in range(ncol)
    ]
    print(f"  cols ({ncol}):", col_centers)
    print(f"  rows ({len(row_centers_vb)}):", row_centers_vb)


def analyze_imagetracer_png(path: Path) -> None:
    from PIL import Image
    from collections import deque

    png = ROOT / "public" / "skyscraper.png"
    if not png.exists():
        print(f"\n=== {path.name}: no PNG fallback ===")
        return

    print(f"\n=== PNG analysis (from {png.name}) ===")
    im = Image.open(png).convert("RGB")
    w, h = im.size

    def is_window(r, g, b):
        return 180 <= r <= 195 and 210 <= g <= 225 and 240 <= b <= 255

    visited = [[False] * w for _ in range(h)]
    components = []

    for y in range(h):
        for x in range(w):
            if visited[y][x] or not is_window(*im.getpixel((x, y))):
                continue
            q = deque([(x, y)])
            visited[y][x] = True
            pts = []
            while q:
                cx, cy = q.popleft()
                pts.append((cx, cy))
                for nx, ny in ((cx + 1, cy), (cx - 1, cy), (cx, cy + 1), (cx, cy - 1)):
                    if 0 <= nx < w and 0 <= ny < h and not visited[ny][nx]:
                        if is_window(*im.getpixel((nx, ny))):
                            visited[ny][nx] = True
                            q.append((nx, ny))
            if len(pts) > 200:
                xs = [p[0] for p in pts]
                ys = [p[1] for p in pts]
                components.append((sum(xs) / len(xs), sum(ys) / len(ys)))

    components.sort(key=lambda c: (c[1], c[0]))
    rows: list[list[tuple[float, float]]] = []
    for c in components:
        if not rows or abs(c[1] - rows[-1][0][1]) > h * 0.04:
            rows.append([c])
        else:
            rows[-1].append(c)

    print(f"  components: {len(components)}, rows: {len(rows)}")
    for i, row in enumerate(rows):
        print(f"    row {i}: {len(row)} windows, y%={round(sum(c[1] for c in row)/len(row)/h*100,2)}")

    # use rows with exactly 11 windows (facade)
    facade = [r for r in rows if len(r) >= 10]
    # pick rows that have 11 windows
    rows11 = [r for r in rows if len(r) == 11]
    print(f"  rows with exactly 11 windows: {len(rows11)}")

    target_rows = rows11 if rows11 else [r for r in facade if len(r) >= 11][:11]
    if not target_rows:
        target_rows = facade[:10]

    col_sums = [0.0] * 11
    col_counts = [0] * 11
    row_centers = []

    for row in target_rows:
        row.sort(key=lambda c: c[0])
        row_centers.append(round(sum(c[1] for c in row[:11]) / min(11, len(row)) / h * 100, 2))
        for i, c in enumerate(row[:11]):
            col_sums[i] += c[0]
            col_counts[i] += 1

    col_centers = [round(col_sums[i] / col_counts[i] / w * 100, 2) for i in range(11)]
    print(f"  cols (11): {col_centers}")
    print(f"  rows ({len(row_centers)}): {row_centers}")
    cw = col_centers[1] - col_centers[0] if len(col_centers) > 1 else 5.5
    print(f"  icon size %: {round(cw * 0.72, 2)}")


for p in SVG_PATHS:
    if p.exists():
        analyze_vector_svg(p)
        if "imagetracer" in p.read_text(encoding="utf-8", errors="ignore")[:500]:
            analyze_imagetracer_png(p)
