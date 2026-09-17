"""Re-capture Sadu heroes with cookie accept + longer wait."""
from __future__ import annotations

import base64
import json
import os
import subprocess
import time
import urllib.request

import websocket
from PIL import Image

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUT = os.path.join("public", "works", "sadu-media", "screens")
ASSETS = os.path.join("public", "works", "sadu-media", "assets")
PORT = 9337
PROFILE = os.path.abspath(os.path.join("public", "works", "sadu-media", ".edge-profile"))


class Cdp:
    def __init__(self, url: str):
        self.ws = websocket.create_connection(url, timeout=90)
        self._id = 0

    def call(self, method: str, params: dict | None = None, session_id: str | None = None):
        self._id += 1
        msg = {"id": self._id, "method": method}
        if params:
            msg["params"] = params
        if session_id:
            msg["sessionId"] = session_id
        self.ws.send(json.dumps(msg))
        while True:
            data = json.loads(self.ws.recv())
            if data.get("id") == self._id:
                if "error" in data:
                    raise RuntimeError(data["error"])
                return data.get("result", {})

    def close(self):
        self.ws.close()


def main():
    os.makedirs(OUT, exist_ok=True)
    os.makedirs(ASSETS, exist_ok=True)
    os.makedirs(PROFILE, exist_ok=True)

    proc = subprocess.Popen(
        [
            EDGE,
            f"--remote-debugging-port={PORT}",
            "--remote-allow-origins=*",
            f"--user-data-dir={PROFILE}",
            "--no-first-run",
            "--no-default-browser-check",
            "--window-size=1440,900",
            "--disable-blink-features=AutomationControlled",
            "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    time.sleep(3)

    try:
        ver = json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version"))
        browser = Cdp(ver["webSocketDebuggerUrl"])
        target = browser.call("Target.createTarget", {"url": "about:blank"})
        attached = browser.call(
            "Target.attachToTarget",
            {"targetId": target["targetId"], "flatten": True},
        )
        sid = attached["sessionId"]
        browser.call("Page.enable", session_id=sid)
        browser.call(
            "Emulation.setDeviceMetricsOverride",
            {
                "width": 1440,
                "height": 900,
                "deviceScaleFactor": 1,
                "mobile": False,
            },
            session_id=sid,
        )

        def eval_js(expression: str):
            return browser.call(
                "Runtime.evaluate",
                {"expression": expression, "returnByValue": True, "awaitPromise": True},
                session_id=sid,
            ).get("result", {}).get("value")

        def shot(name: str):
            result = browser.call(
                "Page.captureScreenshot",
                {"format": "png", "fromSurface": True},
                session_id=sid,
            )
            data = base64.b64decode(result["data"])
            path = os.path.join(OUT, name)
            with open(path, "wb") as f:
                f.write(data)
            print(name, len(data))
            return path

        def goto(url: str):
            browser.call("Page.navigate", {"url": url}, session_id=sid)
            for _ in range(80):
                time.sleep(0.4)
                ready = eval_js("document.readyState")
                if ready == "complete":
                    break
            # dismiss cookies
            eval_js(
                """
(() => {
  const nodes = Array.from(document.querySelectorAll('button, a, [role="button"]'));
  const accept = nodes.find(n => /accept/i.test((n.textContent||'').trim()));
  if (accept) accept.click();
  return !!accept;
})()
"""
            )
            time.sleep(5)

        goto("https://www.sadumedia.com/")
        # wait for video / headline
        time.sleep(4)
        shot("00-home-hero.png")

        goto("https://www.sadumedia.com/about/")
        time.sleep(5)
        shot("01-about-hero.png")

        # scroll positions tuned for about page sections
        for name, y in [
            ("02-mission.png", 950),
            ("03-clients.png", 1900),
            ("04-story.png", 2800),
            ("05-cta.png", 3700),
        ]:
            eval_js(f"window.scrollTo(0,{y})")
            time.sleep(1.4)
            shot(name)

        browser.close()
    finally:
        proc.terminate()
        time.sleep(0.4)
        subprocess.run(["taskkill", "/F", "/PID", str(proc.pid)], capture_output=True)

    # Download OG image
    og = "https://www.sadumedia.com/wp-content/uploads/2025/06/og-image.jpg"
    og_path = os.path.join(ASSETS, "og-image.jpg")
    req = urllib.request.Request(
        og,
        headers={
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        },
    )
    with urllib.request.urlopen(req, timeout=60) as r, open(og_path, "wb") as f:
        f.write(r.read())
    print("og", os.path.getsize(og_path))

    # Poster from mission shot (best visual) — 4:5 crop
    mission = Image.open(os.path.join(OUT, "02-mission.png")).convert("RGB")
    w, h = mission.size
    target_ratio = 4 / 5
    cur = w / h
    if cur > target_ratio:
        nw = int(h * target_ratio)
        left = (w - nw) // 2
        mission = mission.crop((left, 0, left + nw, h))
    else:
        nh = int(w / target_ratio)
        top = (h - nh) // 2
        mission = mission.crop((0, top, w, top + nh))
    mission = mission.resize((800, 1000), Image.Resampling.LANCZOS)
    poster = os.path.join(ASSETS, "poster.webp")
    mission.save(poster, "WEBP", quality=82)
    print("poster", os.path.getsize(poster))

    # Compact webp gallery copies
    for name in [
        "00-home-hero.png",
        "01-about-hero.png",
        "02-mission.png",
        "03-clients.png",
        "04-story.png",
        "05-cta.png",
    ]:
        src = os.path.join(OUT, name)
        if not os.path.exists(src):
            continue
        im = Image.open(src).convert("RGB")
        # shrink slightly for gallery
        im.thumbnail((1280, 800), Image.Resampling.LANCZOS)
        out = os.path.join(ASSETS, name.replace(".png", ".webp"))
        im.save(out, "WEBP", quality=78)
        print("webp", os.path.basename(out), os.path.getsize(out))


if __name__ == "__main__":
    main()
