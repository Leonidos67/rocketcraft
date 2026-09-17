import re
import urllib.request

UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/122.0.0.0 Safari/537.36"
)

for url in ("https://www.sadumedia.com/", "https://www.sadumedia.com/about/"):
    print("===", url)
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html"})
    try:
        html = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")
    except Exception as e:
        print("ERR", e)
        continue
    print("LEN", len(html))
    title = re.search(r"<title[^>]*>(.*?)</title>", html, re.I | re.S)
    print("TITLE", title.group(1).strip()[:100] if title else None)
    if "cannot be processed" in html.lower() or "blocked" in html.lower()[:2000]:
        print("LIKELY_BLOCKED")
        print(html[:500])
    for pat in (
        r'property=["\']og:image["\'][^>]*content=["\']([^"\']+)',
        r'content=["\']([^"\']+)["\'][^>]*property=["\']og:image["\']',
    ):
        for m in re.findall(pat, html, re.I):
            print("OG", m)
    urls = re.findall(r"https?://[^\s\"']+\.(?:jpg|jpeg|png|webp|avif)", html, re.I)
    print("media", len(urls))
    for u in urls[:25]:
        print(u[:160])
