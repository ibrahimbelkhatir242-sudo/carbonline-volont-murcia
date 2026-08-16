"""
Generates branded placeholder images so the site renders correctly before
real product photography is dropped in. Replace files in /public/images
with real photos using the same filenames — no code changes needed.
"""
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops

OUT = "public/images"
VOID = (10, 10, 11)
CARBON = (24, 24, 26)
STEEL = (51, 51, 53)
BONE = (242, 241, 238)
SIGNAL = (196, 30, 46)


def font(size, bold=True):
    paths = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for p in paths:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()


def carbon_weave_layer(w, h, seed):
    rnd = random.Random(seed)
    layer = Image.new("RGB", (w, h), CARBON)
    d = ImageDraw.Draw(layer)
    step = 14
    for y in range(0, h, step):
        for x in range(0, w, step):
            shade = 22 + rnd.randint(-4, 6)
            c = (shade, shade, shade + 2)
            if (x // step + y // step) % 2 == 0:
                d.rectangle([x, y, x + step - 2, y + step - 2], fill=c)
            else:
                d.rectangle([x, y, x + step - 2, y + step - 2], fill=(shade - 6, shade - 6, shade - 4))
    return layer


def vignette(img):
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse([-w * 0.3, -h * 0.3, w * 1.3, h * 1.3], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(120))
    dark = Image.new("RGB", (w, h), (0, 0, 0))
    return Image.composite(img, dark, mask)


def base_scene(w, h, seed):
    weave = carbon_weave_layer(w, h, seed)
    weave = weave.filter(ImageFilter.GaussianBlur(0.4))
    grad = Image.new("L", (1, h), 0)
    for y in range(h):
        grad.putpixel((0, y), int(255 * (0.15 + 0.55 * (y / h))))
    grad = grad.resize((w, h))
    black = Image.new("RGB", (w, h), VOID)
    scene = Image.composite(black, weave, grad)
    return vignette(scene)


def red_glow(img, cx, cy, radius, strength=90):
    # Additive "screen" glow: black stays black, only the lit area brightens toward red.
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(mask)
    d.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=strength)
    mask = mask.filter(ImageFilter.GaussianBlur(radius // 2))
    glow_rgb = Image.merge("RGB", [mask.point(lambda p, c=c: p * c // 255) for c in SIGNAL])
    return ImageChops.screen(img, glow_rgb)


def add_corner_marks(img):
    d = ImageDraw.Draw(img)
    w, h = img.size
    m, s = 28, 22
    for x, y, dx, dy in [(m, m, 1, 1), (w - m, m, -1, 1), (m, h - m, 1, -1), (w - m, h - m, -1, -1)]:
        d.line([x, y, x + dx * s, y], fill=(74, 75, 77), width=2)
        d.line([x, y, x, y + dy * s], fill=(74, 75, 77), width=2)
    return img


def label(img, kicker, title, ref):
    d = ImageDraw.Draw(img)
    w, h = img.size
    d.text((44, h - 96), kicker.upper(), font=font(14), fill=(138, 139, 141))
    d.text((44, h - 74), title.upper(), font=font(34), fill=BONE)
    ref_font = font(13)
    tw = d.textlength(f"REF. {ref}", font=ref_font)
    d.text((w - 44 - tw, 44), f"REF. {ref}", font=ref_font, fill=(138, 139, 141))
    d.line([44, h - 44, 44 + 48, h - 44], fill=SIGNAL, width=2)
    return img


def make_product_shot(name, kicker, title, ref, seed, w=1400, h=1400):
    img = base_scene(w, h, seed)
    img = red_glow(img, w * 0.7, h * 0.3, int(w * 0.22), strength=90)
    img = red_glow(img, w * 0.5, h * 0.9, int(w * 0.22), strength=40)
    d = ImageDraw.Draw(img, "RGBA")
    cx, cy, r = w * 0.5, h * 0.48, min(w, h) * 0.3
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(200, 200, 200, 160), width=6)
    d.ellipse([cx - r * 0.32, cy - r * 0.32, cx + r * 0.32, cy + r * 0.32], outline=(196, 30, 46, 200), width=4)
    d.line([cx - r, cy, cx + r, cy], fill=(200, 200, 200, 40), width=2)
    img = add_corner_marks(img)
    img = label(img, kicker, title, ref)
    img.convert("RGB").save(f"{OUT}/{name}.webp", "WEBP", quality=82)


def make_interior_shot(name, brand, ref, seed, w=1600, h=1200):
    img = base_scene(w, h, seed)
    img = red_glow(img, w * 0.2, h * 0.8, int(w * 0.2), strength=55)
    d = ImageDraw.Draw(img, "RGBA")
    cx, cy, r = w * 0.62, h * 0.55, min(w, h) * 0.38
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(190, 190, 190, 130), width=8)
    img = add_corner_marks(img)
    img = label(img, f"Installed — {brand}", "In The Car", ref)
    img.convert("RGB").save(f"{OUT}/{name}.webp", "WEBP", quality=82)


def make_hero(w=2400, h=1500):
    img = base_scene(w, h, seed=99)
    img = red_glow(img, w * 0.72, h * 0.4, int(w * 0.22), strength=100)
    img = red_glow(img, w * 0.18, h * 0.92, int(w * 0.18), strength=35)
    d = ImageDraw.Draw(img, "RGBA")
    cx, cy, r = w * 0.68, h * 0.5, min(w, h) * 0.36
    for rr, op in [(r, 150), (r * 0.66, 110), (r * 0.22, 200)]:
        d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], outline=(210, 210, 210, op), width=5)
    d.ellipse([cx - r * 0.22, cy - r * 0.22, cx + r * 0.22, cy + r * 0.22], outline=SIGNAL + (220,), width=4)
    img = add_corner_marks(img)
    img.convert("RGB").save(f"{OUT}/hero-wheel.webp", "WEBP", quality=85)


def make_macro(w=1800, h=1800):
    img = carbon_weave_layer(w, h, seed=7)
    img = img.filter(ImageFilter.GaussianBlur(0.3))
    img = red_glow(img, w * 0.68, h * 0.25, int(w * 0.28), strength=60)
    d = ImageDraw.Draw(img, "RGBA")
    for i in range(0, w, 90):
        d.line([i, 0, i, h], fill=(255, 255, 255, 6), width=1)
    img = vignette(img)
    img = add_corner_marks(img)
    img = label(img, "Material", "Carbon Weave Macro", "02")
    img.convert("RGB").save(f"{OUT}/carbon-fiber.webp", "WEBP", quality=85)


if __name__ == "__main__":
    import os
    os.makedirs(OUT, exist_ok=True)
    make_hero()
    make_macro()
    make_product_shot("audi-wheel", "Audi RS / S", "Carbon Fiber Wheel", "A1", seed=11)
    make_product_shot("bmw-wheel", "BMW M / Performance", "Carbon Fiber Wheel", "B1", seed=22)
    make_product_shot("mercedes-wheel", "Mercedes AMG / Sport", "Carbon Fiber Wheel", "M1", seed=33)
    make_product_shot("porsche-wheel", "Porsche GT / Sport", "Carbon Fiber Wheel", "P1", seed=44)
    make_interior_shot("audi-interior", "Audi", "A2", seed=55)
    make_interior_shot("bmw-interior", "BMW", "B2", seed=66)
    make_interior_shot("mercedes-interior", "Mercedes-Benz", "M2", seed=77)
    make_interior_shot("porsche-interior", "Porsche", "P2", seed=88)
    print("done")
