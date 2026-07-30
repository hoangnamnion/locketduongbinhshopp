import pathlib
import sys

try:
    html = pathlib.Path('index.html').read_text(encoding='utf-8')

    pages = {
        'activate.html': ['hero', 'what-is-locket-gold', 'features', 'trust-reasons', 'testimonials', 'tin-tuc', 'faq'],
        'pricing.html': ['hero', 'what-is-locket-gold', 'congratsAmount', 'trust-reasons', 'testimonials', 'tin-tuc', 'faq'],
        'blog.html': ['hero', 'what-is-locket-gold', 'how-to-upgrade', 'pricing', 'features', 'trust-reasons', 'testimonials', 'faq'],
        'guide.html': ['hero', 'what-is-locket-gold', 'pricing', 'tin-tuc', 'testimonials', 'faq'],
        'contact.html': ['hero', 'what-is-locket-gold', 'how-to-upgrade', 'pricing', 'features', 'trust-reasons', 'testimonials', 'tin-tuc']
    }

    for page, remove_sections in pages.items():
        page_html = html
        
        for section_id in remove_sections:
            page_html = page_html.replace(f'id="{section_id}"', f'id="{section_id}" style="display:none;"')
        
        page_html = page_html.replace('href="#how-to-upgrade"', 'href="activate.html"')
        page_html = page_html.replace('href="#pricing"', 'href="pricing.html"')
        page_html = page_html.replace('href="#tin-tuc"', 'href="blog.html"')
        page_html = page_html.replace('href="#faq"', 'href="contact.html"')
        page_html = page_html.replace('href="#testimonials"', 'href="index.html#testimonials"')
        
        title_map = {
            'activate.html': 'Kích Hoạt Locket Gold',
            'pricing.html': 'Bảng Giá Nghiệp Vụ - Locket Gold',
            'blog.html': 'Bài Viết - Locket Gold',
            'guide.html': 'Hướng Dẫn Locket Gold',
            'contact.html': 'Hỗ Trợ - Locket Gold'
        }
        
        page_html = page_html.replace('<title>\n    Locket Gold Giá Rẻ Chỉ 20K | Nâng Cấp LocketGold Tự Động\n   </title>', f'<title>{title_map[page]}</title>')
        page_html = page_html.replace('<title>Locket Gold Giá Rẻ Chỉ 20K | Nâng Cấp LocketGold Tự Động</title>', f'<title>{title_map[page]}</title>')

        # also for mobile menu
        page_html = page_html.replace("href='/activate'", "href='activate.html'")
        page_html = page_html.replace('href="/activate"', 'href="activate.html"')
        page_html = page_html.replace('href="/pricing"', 'href="pricing.html"')
        page_html = page_html.replace('href="/blog"', 'href="blog.html"')
        page_html = page_html.replace('href="/guide"', 'href="guide.html"')
        page_html = page_html.replace('href="/contact"', 'href="contact.html"')

        pathlib.Path(page).write_text(page_html, encoding='utf-8')

    idx = html.replace('href="#how-to-upgrade"', 'href="activate.html"')
    idx = idx.replace('href="#pricing"', 'href="pricing.html"')
    idx = idx.replace('href="#tin-tuc"', 'href="blog.html"')
    idx = idx.replace('href="#faq"', 'href="contact.html"')
    idx = idx.replace('href="#testimonials"', 'href="index.html#testimonials"')
    pathlib.Path('index.html').write_text(idx, encoding='utf-8')

    try:
        prf = pathlib.Path('profile.html').read_text(encoding='utf-8')
        prf = prf.replace('href="index.html#how-to-upgrade"', 'href="activate.html"')
        prf = prf.replace('href="index.html#pricing"', 'href="pricing.html"')
        prf = prf.replace('href="index.html#tin-tuc"', 'href="blog.html"')
        prf = prf.replace('href="index.html#faq"', 'href="contact.html"')
        
        prf = prf.replace('href="#how-to-upgrade"', 'href="activate.html"')
        prf = prf.replace('href="#pricing"', 'href="pricing.html"')
        prf = prf.replace('href="#tin-tuc"', 'href="blog.html"')
        prf = prf.replace('href="#faq"', 'href="contact.html"')
        pathlib.Path('profile.html').write_text(prf, encoding='utf-8')
    except Exception as e:
        print("Issue profile", e)
        pass

    print('Done creating multi-pages.')
except Exception as e:
    print(f"Error: {e}")
