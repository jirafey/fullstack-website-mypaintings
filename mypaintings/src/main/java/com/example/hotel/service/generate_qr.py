import qrcode
import sys
import os

def generate_qr(link, image_id):
    # Upewnij się, że katalog "qr" istnieje
    output_dir = "qr"
    os.makedirs(output_dir, exist_ok=True)

    # Ścieżka do pliku
    file_path = os.path.join(output_dir, f"{image_id}.png")

    # Generowanie i zapis
    img = qrcode.make(link)
    img.save(file_path)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python generate_qr.py <link> <image_id>")
        sys.exit(1)

    link = sys.argv[1]
    image_id = sys.argv[2]
    generate_qr(link, image_id)
