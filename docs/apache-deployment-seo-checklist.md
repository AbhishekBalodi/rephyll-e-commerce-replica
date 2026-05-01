# Apache Deployment SEO Checklist

Use this checklist when deploying `dist/` to Apache so crawling and favicon updates work reliably.

## 1) Upload build output

Run:

```bash
npm run build
```

Upload the full `dist/` folder contents to Apache web root (`public_html`, `htdocs`, or vhost `DocumentRoot`).

Important files expected at root after deploy:
- `/index.html`
- `/robots.txt`
- `/sitemap.xml`
- `/favicon.ico`
- `/clover-icon.png`
- `/apple-touch-icon.png`
- `/.htaccess`

## 2) Enable Apache modules

Ensure these modules are enabled:
- `mod_rewrite`
- `mod_headers`
- `mod_mime`

## 3) Allow .htaccess overrides

In your Apache vhost config, make sure web root has:

```apache
<Directory /var/www/html>
  AllowOverride All
  Require all granted
</Directory>
```

If `AllowOverride None`, your rewrite rules will be ignored.

## 4) Validate icon endpoints

These must return image content types, not HTML:
- `/favicon.ico` -> `image/x-icon`
- `/clover-icon.png` -> `image/png`
- `/apple-touch-icon.png` -> `image/png`

## 5) Validate crawl endpoints

- `/robots.txt` must include `Sitemap: https://www.rephyl.com/sitemap.xml`
- `/sitemap.xml` must open and list URLs

## 6) Ask Google to refresh

After deploy:
- Open Google Search Console
- URL Inspection for `https://www.rephyl.com/`
- Request indexing

Google favicon updates can still take a few days due to cache.
