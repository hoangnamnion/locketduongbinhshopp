import pathlib
import sys

try:
    c = pathlib.Path('index.html').read_text(encoding='utf-8')

    # Remove display:none from any section that got it accidentally from hide_activation.py
    # Python script is not running in shell here, so raw string matching is safe
    c = c.replace('<section style="display:none;" class="py-16 lg:py-24 bg-secondary/30 dark:bg-gray-900 min-h-screen">', '<section class="py-16 lg:py-24 bg-secondary/30 dark:bg-gray-900 min-h-screen">')

    # Check if Kích Hoạt terminal part is still in index.html
    start_idx = c.find('<audio id="magicAudio"')
    if start_idx != -1:
        section_start = c.rfind('<section', 0, start_idx)
        if section_start != -1:
            c = c[:section_start] + '<section style="display:none;"' + c[section_start+8:]
            print('Successfully hidden specific terminal section.')

    # Fix navigation back to #how-to-upgrade instead of activate.html
    for spaces in ['\n       ', '\n      ', '\n        ']:
        c = c.replace(f'href="activate.html">{spaces}Hướng dẫn', f'href="#how-to-upgrade">{spaces}Hướng dẫn')

    pathlib.Path('index.html').write_text(c, encoding='utf-8')
    print('Khôi phục xong bảng giá và ẩn đúng terminal.')
except Exception as e:
    print(f"Error: {e}")
