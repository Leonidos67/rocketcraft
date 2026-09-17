from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
from pathlib import Path

ROOT = Path("public/works/sadu-media")
ASSETS = ROOT / "assets"
SCREENS = ROOT / "screens"
SCREENS.mkdir(parents=True, exist_ok=True)

W, H = 1440, 900


def load(name: str) -> Image.Image:
    return Image.open(ASSETS / name).convert("RGB")


def cover(img: Image.Image, size: tuple[int, int]) -> Image.Image:
    tw, th = size
    iw, ih = img.size
    scale = max(tw / iw, th / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    img = img.resize((nw, nh), Image.Resampling.LANCZOS)
    left = (nw - tw) // 2
    top = (nh - th) // 2
    return img.crop((left, top, left + tw, top + th))


def try_font(size: int, bold: bool = False) -> ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/impact.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def draw_text_block(draw, lines, xy, font, fill, spacing=8):
    x, y = xy
    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        bbox = draw.textbbox((x, y), line, font=font)
        y = bbox[3] + spacing


def rounded_paste(base, img, box, radius=18):
    x0, y0, x1, y1 = box
    tw, th = x1 - x0, y1 - y0
    piece = cover(img, (tw, th))
    mask = Image.new("L", (tw, th), 0)
    md = ImageDraw.Draw(mask)
    md.rounded_rectangle((0, 0, tw - 1, th - 1), radius=radius, fill=255)
    base.paste(piece, (x0, y0), mask)


# 01 About hero
hero = Image.new("RGB", (W, H), (88, 88, 88))
d = ImageDraw.Draw(hero)
d.text((48, 40), "WE", font=try_font(220, True), fill=(120, 120, 120))
d.rectangle((W // 2 - 18, 28, W // 2 + 18, 34), fill=(10, 10, 10))
d.rectangle((W // 2 - 10, 40, W // 2 + 18, 46), fill=(10, 10, 10))
d.rectangle((W // 2 - 14, 52, W // 2 + 10, 58), fill=(10, 10, 10))
portrait = cover(load("portrait-a.jpeg"), (520, H))
hero.paste(ImageEnhance.Brightness(portrait).enhance(0.85), (W - 520, 0))
layer = hero.convert("RGBA")
for i in range(520):
    alpha = int(180 * (1 - i / 520))
    overlay = Image.new("RGBA", (1, H), (88, 88, 88, alpha))
    layer.paste(overlay, (W - 520 + i, 0), overlay)
hero = layer.convert("RGB")
d = ImageDraw.Draw(hero)
draw_text_block(
    d,
    ["We're here to impress.", "Rooted in Saudi."],
    (64, H - 220),
    try_font(64, True),
    (245, 245, 245),
    10,
)
hero.save(SCREENS / "01-about-hero.png")

# 02 Mission
mission = cover(load("portrait-b.jpeg"), (W, H))
mission = ImageEnhance.Brightness(mission).enhance(0.55)
left = ImageEnhance.Brightness(cover(load("cinema.jpeg"), (W // 2, H))).enhance(0.5)
mission.paste(left, (0, 0))
mission = Image.blend(mission, Image.new("RGB", (W, H), (0, 0, 0)), 0.35)
d = ImageDraw.Draw(mission)
draw_text_block(
    d,
    ["THE ONES WHO SHOW UP", "WHEN IT MATTERS MOST"],
    (64, 72),
    try_font(72, True),
    (255, 255, 255),
    6,
)
body_lines = [
    'Our clients call us "ahl al faza\'a"— an arabic expression that means',
    '"the ones who show up when it matters most". Because even under pressure,',
    "we are driven by precision, passion, and an obsession with doing things right.",
]
y = 260
for line in body_lines:
    d.text((64, y), line, font=try_font(22), fill=(235, 235, 235))
    y += 32
mission.save(SCREENS / "02-mission.png")

# 03 Clients
clients = Image.new("RGB", (W, H), (242, 242, 242))
clients.paste(cover(load("portrait-b.jpeg"), (W, 120)), (0, 0))
d = ImageDraw.Draw(clients)
f_c = try_font(78, True)
y = 280
for line in ["MCDONALD'S, FORMULA E,", "FLYADEAL, JETOUR,", "RED SEA AUTHORITY..."]:
    bbox = d.textbbox((0, 0), line, font=f_c)
    tw = bbox[2] - bbox[0]
    d.text(((W - tw) // 2, y), line, font=f_c, fill=(8, 8, 8))
    y += 95
clients.save(SCREENS / "03-clients.png")

# 04 Story
story = Image.new("RGB", (W, H), (245, 245, 245))
d = ImageDraw.Draw(story)
for name, x in [
    ("formula-e.jpg", 80),
    ("cinema.jpeg", 390),
    ("desert.jpeg", 700),
    ("flyadeal.jpeg", 1010),
]:
    rounded_paste(story, load(name), (x, 70, x + 280, 470), radius=22)
draw_text_block(
    d,
    ["WE'RE THE TEAM THAT", "GETS IT DONE"],
    (80, 540),
    try_font(70, True),
    (0, 0, 0),
    4,
)
story.save(SCREENS / "04-story.png")

# 05 CTA
cta = Image.new("RGB", (W, H), (0, 0, 0))
d = ImageDraw.Draw(cta)
f_nav = try_font(18, True)
d.text((48, 36), "WORKS.", font=f_nav, fill=(255, 255, 255))
d.text((160, 36), "SERVICES.", font=f_nav, fill=(255, 255, 255))
d.rectangle((W - 280, 28, W - 160, 58), fill=(0, 209, 193))
d.text((W - 268, 36), "ABOUT.", font=f_nav, fill=(255, 255, 255))
d.text((W - 130, 36), "CONTACT.", font=f_nav, fill=(255, 255, 255))
rounded_paste(cta, load("campfire.jpeg"), (470, 220, 970, 520), radius=16)
draw_text_block(d, ["YOU BRING", "THE BRIEF."], (72, 300), try_font(42, True), (255, 255, 255), 4)
draw_text_block(d, ["WE'LL BRING", "IT TO LIFE."], (1020, 300), try_font(42, True), (255, 255, 255), 4)
d.rounded_rectangle((620, 560, 820, 610), radius=4, fill=(0, 209, 193))
d.text((648, 574), "CONTACT US.", font=try_font(20, True), fill=(255, 255, 255))
cta.save(SCREENS / "05-cta.png")

# 00 Home hero
home = ImageEnhance.Brightness(cover(load("formula-e.jpg"), (W, H))).enhance(0.62)
d = ImageDraw.Draw(home)
draw_text_block(
    d,
    ["We craft culture", "through content."],
    (64, H // 2 - 40),
    try_font(68, True),
    (255, 255, 255),
    8,
)
d.text(
    (64, H // 2 + 140),
    "Production · Storytelling · Execution — Built For Impact.",
    font=try_font(22),
    fill=(230, 230, 230),
)
home.save(SCREENS / "00-home-hero.png")

# 06 Home works
works = Image.new("RGB", (W, H), (18, 18, 18))
d = ImageDraw.Draw(works)
d.text((64, 48), "Work That Speaks For Itself.", font=try_font(42, True), fill=(255, 255, 255))
for name, x, y in [
    ("mccrispy.jpg", 64, 140),
    ("formula-e.jpg", 500, 140),
    ("flyadeal.jpeg", 936, 140),
    ("desert.jpeg", 64, 500),
    ("cinema.jpeg", 500, 500),
    ("campfire.jpeg", 936, 500),
]:
    rounded_paste(works, load(name), (x, y, x + 400, y + 300), radius=14)
works.save(SCREENS / "06-home-works.png")

# Poster 4:5
poster = ImageEnhance.Brightness(cover(load("portrait-b.jpeg"), (800, 1000))).enhance(0.7)
grad = Image.new("RGBA", (800, 1000), (0, 0, 0, 0))
gd = ImageDraw.Draw(grad)
for i in range(420):
    a = int(210 * (i / 420))
    gd.line([(0, 580 + i), (800, 580 + i)], fill=(0, 0, 0, a))
poster = Image.alpha_composite(poster.convert("RGBA"), grad).convert("RGB")
d = ImageDraw.Draw(poster)
d.text((40, 780), "SADU MEDIA", font=try_font(36, True), fill=(255, 255, 255))
d.text((40, 830), "About · Saudi production house", font=try_font(22), fill=(200, 200, 200))
poster.save(ROOT / "poster.webp", "WEBP", quality=88)
poster.save(ASSETS / "poster.webp", "WEBP", quality=88)

# cleanup junk captures
for junk in SCREENS.glob("edge-*.png"):
    junk.unlink(missing_ok=True)

print("ok", sorted(p.name for p in SCREENS.glob("*.png")))
