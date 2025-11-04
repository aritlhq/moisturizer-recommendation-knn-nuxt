import sys
import os
import csv
import requests
from bs4 import BeautifulSoup
import json
import time

# Fix encoding untuk Windows console
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

def get_image_url(product_url):
    """
    Mengunjungi URL produk dan mengambil URL gambar utama.
    """
    if not product_url or not product_url.startswith('http'):
        return None

    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(product_url, headers=headers, timeout=10)
        response.raise_for_status() # Akan error jika status code bukan 200

        soup = BeautifulSoup(response.text, 'html.parser')

        # Mencari div dengan class yang spesifik seperti pola yang Anda berikan
        image_wrapper = soup.find('div', class_='image-wrapper')

        if image_wrapper:
            img_tag = image_wrapper.find('img')
            if img_tag and 'src' in img_tag.attrs:
                image_src = img_tag['src']
                # Memastikan URL memiliki protokol https
                if image_src.startswith('//'):
                    return 'https:' + image_src
                return image_src
        return None
    except requests.exceptions.RequestException as e:
        print(f" Gagal mengambil {product_url}: {e}", file=sys.stderr)
        return None

def main():
    """
    Membaca products.json, mengambil setiap URL gambar, dan menyimpan hasilnya.
    """
    script_dir = os.path.dirname(os.path.abspath(__file__))
    products_json_path = os.path.join(script_dir, 'products.json')
    output_json_path = os.path.join(script_dir, 'products_with_images.json')

    if not os.path.exists(products_json_path):
        print(f" Error: File 'products.json' tidak ditemukan. Jalankan 'npm run import-data' terlebih dahulu.", file=sys.stderr)
        sys.exit(1)

    with open(products_json_path, 'r', encoding='utf-8') as f:
        products = json.load(f)

    # products = products[:5]

    print(f"Memulai scraping untuk {len(products)} produk...")

    products_with_images = []
    for i, product in enumerate(products):
        print(f"({i+1}/{len(products)}) Scraping: {product['name'][:50]}...", flush=True)
        image_url = get_image_url(product['product_url'])
        if image_url:
            print(f"  -> Sukses: Gambar ditemukan.", flush=True)
        else:
            print(f"  -> Gagal: Gambar tidak ditemukan.", flush=True)

        product['image_url'] = image_url
        products_with_images.append(product)

        # Beri jeda sedikit antar request agar tidak membebani server target
        time.sleep(0.5)

    print(f"\nScraping selesai. Menyimpan hasil ke {output_json_path}")

    with open(output_json_path, 'w', encoding='utf-8') as f:
        json.dump(products_with_images, f, indent=2, ensure_ascii=False)

    print(" Selesai!")

if __name__ == '__main__':
    main()