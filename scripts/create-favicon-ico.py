from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = Image.open(root / "public" / "icons" / "icon-512.png").convert("RGBA")
source.save(root / "public" / "favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
