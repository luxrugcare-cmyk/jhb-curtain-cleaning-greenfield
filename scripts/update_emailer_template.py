import pathlib

def update_templates():
    desktop_path = pathlib.Path(r"C:\Users\User\Desktop\jhb-curtain-cleaning-emailer.html")
    project_path = pathlib.Path(r"C:\Users\User\Downloads\JHB-Curtain-Cleaning-Website-Handoff\JHB-Curtain-Cleaning-Full-Handoff-2026-08-17\project\docs\email-templates\JHB-CURTAIN-CLEANING-10-PERCENT-OFFER.html")

    content = desktop_path.read_text(encoding="utf-8")

    # Specific surgical replacements
    content = content.replace(
        'href="https://curtaincleaning.space-z.ai/" class="nav-link" style="color: #5b6472; text-decoration: none; font-weight: 600; font-size: 13px; letter-spacing: 0.02em;">Services',
        'href="https://www.jhbcurtaincleaning.co.za/services" class="nav-link" style="color: #5b6472; text-decoration: none; font-weight: 600; font-size: 13px; letter-spacing: 0.02em;">Services'
    )

    content = content.replace(
        'href="https://curtaincleaning.space-z.ai/" class="nav-link" style="color: #5b6472; text-decoration: none; font-weight: 600; font-size: 13px; letter-spacing: 0.02em;">Process',
        'href="https://www.jhbcurtaincleaning.co.za/advice/how-on-site-curtain-cleaning-works" class="nav-link" style="color: #5b6472; text-decoration: none; font-weight: 600; font-size: 13px; letter-spacing: 0.02em;">Process'
    )

    content = content.replace(
        'href="https://curtaincleaning.space-z.ai/" class="nav-link" style="color: #5b6472; text-decoration: none; font-weight: 600; font-size: 13px; letter-spacing: 0.02em;">Areas',
        'href="https://www.jhbcurtaincleaning.co.za/areas" class="nav-link" style="color: #5b6472; text-decoration: none; font-weight: 600; font-size: 13px; letter-spacing: 0.02em;">Areas'
    )

    content = content.replace(
        'href="https://curtaincleaning.space-z.ai/" class="nav-link" style="color: #5b6472; text-decoration: none; font-weight: 600; font-size: 13px; letter-spacing: 0.02em;">Contact',
        'href="https://www.jhbcurtaincleaning.co.za/contact" class="nav-link" style="color: #5b6472; text-decoration: none; font-weight: 600; font-size: 13px; letter-spacing: 0.02em;">Contact'
    )

    # Replace Book Your Free Assessment buttons
    content = content.replace(
        'href="https://curtaincleaning.space-z.ai/" style="display:inline-block;background:#b8893c;color:#ffffff;font-family:Inter, Arial, sans-serif;font-size:16px;font-weight:700;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:14px 28px;mso-padding-alt:0px;border-radius:999px;" target="_blank">\n                Book Your Free Assessment',
        'href="https://www.jhbcurtaincleaning.co.za/quote" style="display:inline-block;background:#b8893c;color:#ffffff;font-family:Inter, Arial, sans-serif;font-size:16px;font-weight:700;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:14px 28px;mso-padding-alt:0px;border-radius:999px;" target="_blank">\n                Book Your Free Assessment'
    )

    # WhatsApp CTA with prefilled message
    content = content.replace(
        'href="https://wa.me/27750119200"',
        'href="https://wa.me/27750119200?text=Hi%20Stephen,%20I%27d%20like%20to%20claim%20my%2010%25%20off%20first%20clean%20quote."'
    )

    # Social Links
    content = content.replace(
        '<a href="https://curtaincleaning.space-z.ai/" style="color:#7a5a2b;text-decoration:none;">Facebook</a><span style="color:#c7b08b;"> • </span><a href="https://curtaincleaning.space-z.ai/" style="color:#7a5a2b;text-decoration:none;">Instagram</a><span style="color:#c7b08b;"> • </span><a href="https://curtaincleaning.space-z.ai/" style="color:#7a5a2b;text-decoration:none;">Google</a>',
        '<a href="https://www.facebook.com/profile.php?id=61583188967013" style="color:#7a5a2b;text-decoration:none;">Facebook</a><span style="color:#c7b08b;"> • </span><a href="https://www.instagram.com/curtaincleaningjhb" style="color:#7a5a2b;text-decoration:none;">Instagram</a><span style="color:#c7b08b;"> • </span><a href="https://g.page/r/CbZEjFiE3HjZEBM/review" style="color:#7a5a2b;text-decoration:none;">Google</a>'
    )

    # Get in touch website
    content = content.replace(
        '<a href="https://curtaincleaning.space-z.ai/" style="color:#7a5a2b;text-decoration:none;">curtaincleaning.space-z.ai</a>',
        '<a href="https://www.jhbcurtaincleaning.co.za" style="color:#7a5a2b;text-decoration:none;">www.jhbcurtaincleaning.co.za</a>'
    )

    # Footer link
    content = content.replace(
        '<a href="https://curtaincleaning.space-z.ai/" class="footer-link" style="color: #7a5a2b; text-decoration: none;">Visit Website</a>',
        '<a href="https://www.jhbcurtaincleaning.co.za" class="footer-link" style="color: #7a5a2b; text-decoration: none;">Visit Website</a>'
    )

    # Catch any remaining staging URLs
    content = content.replace("https://curtaincleaning.space-z.ai/", "https://www.jhbcurtaincleaning.co.za/")
    content = content.replace("https://curtaincleaning.space-z.ai", "https://www.jhbcurtaincleaning.co.za")

    # Save updated desktop file
    desktop_path.write_text(content, encoding="utf-8")
    print(f"✓ Desktop file updated: {desktop_path}")

    # Save to project templates
    project_path.parent.mkdir(parents=True, exist_ok=True)
    project_path.write_text(content, encoding="utf-8")
    print(f"✓ Project template imported: {project_path}")

if __name__ == "__main__":
    update_templates()
