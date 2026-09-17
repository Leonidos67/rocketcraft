"""Capture Sadu via headed Edge (bypass headless WAF)."""
from __future__ import annotations

import base64
import json
import os
import subprocess
import time
import urllib.request

import websocket

EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
OUT = os.path.join("public", "works", "sadu-media", "screens")
PORT = 9335
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
    os.makedirs(PROFILE, exist_ok=True)

    # Don't kill user's Edge — use dedicated profile + port
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
    time.sleep(3.5)

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
        browser.call(
            "Network.setUserAgentOverride",
            {
                "userAgent": (
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) "
                    "Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0"
                )
            },
            session_id=sid,
        )

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

        def goto(url: str):
            browser.call("Page.navigate", {"url": url}, session_id=sid)
            # wait for load event via polling title / readyState
            for _ in range(60):
                time.sleep(0.5)
                st = browser.call(
                    "Runtime.evaluate",
                    {
                        "expression": "document.readyState + '|' + (document.title||'') + '|' + document.body?.innerText?.slice(0,80)",
                        "returnByValue": True,
                    },
                    session_id=sid,
                )
                val = st.get("result", {}).get("value") or ""
                if "complete|" in val and "cannot be processed" not in val and "Sorry" not in val:
                    print("loaded:", val[:100])
                    time.sleep(3)
                    return
                if "cannot be processed" in val or "Sorry" in val:
                    print("BLOCKED:", val[:120])
                    time.sleep(1)
                    return
            print("timeout loading", url)

        goto("https://www.sadumedia.com/")
        shot("00-home-hero.png")

        goto("https://www.sadumedia.com/about/")
        shot("01-about-hero.png")

        for name, y in [
            ("02-mission.png", 900),
            ("03-clients.png", 1800),
            ("04-story.png", 2700),
            ("05-cta.png", 3600),
        ]:
            browser.call(
                "Runtime.evaluate",
                {"expression": f"window.scrollTo(0,{y})"},
                session_id=sid,
            )
            time.sleep(1.3)
            shot(name)

        browser.close()
    finally:
        proc.terminate()
        time.sleep(0.5)
        subprocess.run(
            ["taskkill", "/F", "/PID", str(proc.pid)],
            capture_output=True,
        )


if __name__ == "__main__":
    main()
