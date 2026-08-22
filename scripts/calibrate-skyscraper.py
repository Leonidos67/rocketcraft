from PIL import Image
from collections import deque

im = Image.open("public/skyscraper.png").convert("RGB")
w, h = im.size

def is_window(r, g, b):
    return 180 <= r <= 195 and 210 <= g <= 225 and 240 <= b <= 255

visited = [[False]*w for _ in range(h)]
components = []

for y in range(h):
    for x in range(w):
        if visited[y][x] or not is_window(*im.getpixel((x,y))):
            continue
        q = deque([(x,y)])
        visited[y][x] = True
        pts = []
        while q:
            cx, cy = q.popleft()
            pts.append((cx,cy))
            for nx, ny in ((cx+1,cy),(cx-1,cy),(cx,cy+1),(cx,cy-1)):
                if 0<=nx<w and 0<=ny<h and not visited[ny][nx] and is_window(*im.getpixel((nx,ny))):
                    visited[ny][nx] = True
                    q.append((nx,ny))
        if len(pts) > 200:
            xs = [p[0] for p in pts]
            ys = [p[1] for p in pts]
            components.append((sum(xs)/len(xs), sum(ys)/len(ys)))

components.sort(key=lambda c: (c[1], c[0]))
rows = []
for c in components:
    if not rows or abs(c[1] - rows[-1][0][1]) > h*0.04:
        rows.append([c])
    else:
        rows[-1].append(c)

# rows 0-10 = 11 floors of facade windows
facade_rows = rows[:11]
col_sums = [0.0]*10
col_counts = [0]*10
row_centers = []

for row in facade_rows:
    row.sort(key=lambda c: c[0])
    row_centers.append(round(row[0][1]/h*100 + sum(c[1] for c in row)/len(row)/h*100)/2 if False else round(sum(c[1] for c in row)/len(row)/h*100, 2))
    for i, c in enumerate(row[:10]):
        col_sums[i] += c[0]
        col_counts[i] += 1

col_centers = [round(col_sums[i]/col_counts[i]/w*100, 2) for i in range(10)]
print('cols', col_centers)
print('rows', row_centers)
print('grid derived', round(min(col_centers)-3.5, 2), round(min(row_centers)-3.2, 2), round(max(col_centers)-min(col_centers)+7, 2), round(max(row_centers)-min(row_centers)+6.4, 2))

# cell size
cw = (col_centers[-1]-col_centers[0])/(10-1)
rh = (row_centers[-1]-row_centers[0])/(11-1)
print('cell', round(cw,2), round(rh,2))
print('icon width %', round(cw*0.72, 2))
