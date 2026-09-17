"""Capture Sadu Media screenshots via Edge CDP (no Puppeteer)."""
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
PORT = 9333


class Cdp:
    def __init__(self, url: str):
        self.ws = websocket.create_connection(url, timeout=60)
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
            raw = self.ws.recv()
            data = json.loads(raw)
            if data.get("id") == self._id:
                if "error" in data:
                    raise RuntimeError(data["error"])
                return data.get("result", {})

    def close(self):
        self.ws.close()


def wait_ready(session: Cdp, sid: str, timeout: float = 45):
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            state = session.call(
                "Runtime.evaluate",
                {
                    "expression": "document.readyState",
                    "returnByValue": True,
                },
                session_id=sid,
            )
            if state.get("result", {}).get("value") == "complete":
                # also wait for fonts / images a bit
                time.sleep(3.5)
                return
        except Exception:
            pass
        time.sleep(0.4)
    time.sleep(2)


def screenshot(session: Cdp, sid: str, path: str):
    result = session.call(
        "Page.captureScreenshot",
        {"format": "png", "fromSurface": True},
        session_id=sid,
    )
    data = base64.b64decode(result["data"])
    with open(path, "wb") as f:
        f.write(data)
    print(os.path.basename(path), len(data))


def main():
    os.makedirs(OUT, exist_ok=True)
    subprocess.run(["taskkill", "/F", "/IM", "msedge.exe"], capture_output=True)
    time.sleep(1.2)

    proc = subprocess.Popen(
        [
            EDGE,
            f"--remote-debugging-port={PORT}",
            "--remote-allow-origins=*",
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--window-size=1440,900",
            "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    time.sleep(2.5)

    try:
        ver = json.load(urllib.request.urlopen(f"http://127.0.0.1:{PORT}/json/version"))
        browser = Cdp(ver["webSocketDebuggerUrl"])

        # create a page target
        target = browser.call(
            "Target.createTarget",
            {"url": "about:blank"},
        )
        target_id = target["targetId"]
        attached = browser.call(
            "Target.attachToTarget",
            {"targetId": target_id, "flatten": True},
        )
        sid = attached["sessionId"]

        browser.call("Page.enable", session_id=sid)
        browser.call("Network.enable", session_id=sid)
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

        shots = [
            ("00-home-hero.png", "https://www.sadumedia.com/", None),
            ("01-about-hero.png", "https://www.sadumedia.com/about/", None),
            ("02-mission.png", None, 900),
            ("03-clients.png", None, 1800),
            ("04-story.png", None, 2700),
            ("05-cta.png", None, 3600),
        ]

        for name, url, scroll_y in shots:
            if url:
                browser.call("Page.navigate", {"url": url}, session_id=sid)
                wait_ready(browser, sid)
                # scroll top
                browser.call(
                    "Runtime.evaluate",
                    {"expression": "window.scrollTo(0,0)"},
                    session_id=sid,
                )
                time.sleep(0.6)
            if scroll_y is not None:
                browser.call(
                    "Runtime.evaluate",
                    {"expression": f"window.scrollTo(0,{scroll_y})"},
                    session_id=sid,
                )
                time.sleep(1.2)
            screenshot(browser, sid, os.path.join(OUT, name))

        browser.close()
    finally:
        proc.terminate()
        subprocess.run(["taskkill", "/F", "/IM", "msedge.exe"], capture_output=True)


if __name__ == "__main__":
    main()
