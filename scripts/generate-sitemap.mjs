import { writeFile } from "node:fs/promises";
import path from "node:path";

const SITE_URL = (process.env.SITEMAP_SITE_URL || "https://www.rephyl.com").replace(/\/$/, "");
const API_BASE_URL = (process.env.SITEMAP_API_BASE_URL || `${SITE_URL}/api`).replace(/\/$/, "");
const OUTPUT_PATH = path.join(process.cwd(), "public", "sitemap.xml");

const STATIC_ROUTES = [
  "/",
  "/shop",
  "/about",
  "/our-story",
  "/homecare-kits",
  "/b2b-orders",
  "/why-choose-us",
  "/faqs",
  "/contact",
  "/terms",
  "/privacy-policy",
  "/refund-policy",
  "/blogs",
];

const slugify = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const fetchJson = async (url) => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed request ${response.status} for ${url}`);
  }

  return response.json();
};

const getRouteFromCategory = (name) => {
  const normalized = String(name || "").trim().toLowerCase();
  const kitsOrBundlesRegex = /\bkit(s)?\b|\bbundle(s)?\b|\bhomecare\b/;

  if (normalized === "byob" || normalized.includes("byob") || kitsOrBundlesRegex.test(normalized)) {
    return "/homecare-kits";
  }

  const slug = slugify(name);
  return slug ? `/category/${slug}` : null;
};

const fetchAllProducts = async () => {
  const routes = new Set();
  const size = 100;
  let page = 0;
  let totalPages = 1;

  while (page < totalPages) {
    const url = `${API_BASE_URL}/customer/products?page=${page}&size=${size}`;
    const payload = await fetchJson(url);
    const pageData = payload?.data;

    if (!pageData || !Array.isArray(pageData.content)) {
      break;
    }

    for (const item of pageData.content) {
      const productSlug = item?.slug || item?.urlHandle || item?.id;
      const categorySlug = slugify(item?.categoryName || "products");
      if (!productSlug) continue;
      routes.add(`/${encodeURIComponent(String(categorySlug || "products"))}/${encodeURIComponent(String(productSlug))}`);
    }

    totalPages = Number.isFinite(pageData.totalPages) ? pageData.totalPages : 1;
    page += 1;
  }

  return routes;
};

const fetchCategoryRoutes = async () => {
  const routes = new Set();
  const url = `${API_BASE_URL}/customer/categories`;
  const payload = await fetchJson(url);
  const categories = payload?.data;

  if (!Array.isArray(categories)) return routes;

  for (const category of categories) {
    const route = getRouteFromCategory(category?.name);
    if (route) routes.add(route);
  }

  return routes;
};

const fetchAllBlogs = async () => {
  const routes = new Set();
  const size = 100;
  let page = 0;
  let totalPages = 1;

  while (page < totalPages) {
    const url = `${API_BASE_URL}/customer/blogs?page=${page}&size=${size}&sortBy=id&direction=DESC`;
    const payload = await fetchJson(url);
    const pageData = payload?.data;

    if (!pageData || !Array.isArray(pageData.content)) {
      break;
    }

    for (const blog of pageData.content) {
      if (!blog?.slug) continue;
      routes.add(`/blog/${encodeURIComponent(String(blog.slug))}`);
    }

    totalPages = Number.isFinite(pageData.totalPages) ? pageData.totalPages : 1;
    page += 1;
  }

  return routes;
};

const buildXml = (routes) => {
  const today = new Date().toISOString().split("T")[0];
  const staticRouteSet = new Set(STATIC_ROUTES);
  const entries = Array.from(routes)
    .sort((a, b) => a.localeCompare(b))
    .map((route) => {
      const isBlogDetail = route.startsWith("/blog/");
      const isCategoryPage = route.startsWith("/category/");
      const pathSegments = route.split("/").filter(Boolean);
      const isProductDetail = !isCategoryPage && !isBlogDetail && pathSegments.length === 2 && !staticRouteSet.has(route);

      const priority = route === "/" ? "1.0" : isProductDetail ? "0.8" : "0.7";
      const changefreq = isProductDetail || isBlogDetail ? "weekly" : "monthly";

      return [
        "  <url>",
        `    <loc>${escapeXml(`${SITE_URL}${route}`)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${changefreq}</changefreq>`,
        `    <priority>${priority}</priority>`,
        "  </url>",
      ].join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    "</urlset>",
    "",
  ].join("\n");
};

const main = async () => {
  const routes = new Set(STATIC_ROUTES);

  try {
    const [productRoutes, categoryRoutes, blogRoutes] = await Promise.all([
      fetchAllProducts(),
      fetchCategoryRoutes(),
      fetchAllBlogs(),
    ]);

    for (const route of productRoutes) routes.add(route);
    for (const route of categoryRoutes) routes.add(route);
    for (const route of blogRoutes) routes.add(route);
  } catch (error) {
    console.warn("[sitemap] Dynamic route fetch failed, using static routes only:", error.message);
  }

  const xml = buildXml(routes);
  await writeFile(OUTPUT_PATH, xml, "utf8");
  console.log(`[sitemap] Generated ${routes.size} URLs at ${OUTPUT_PATH}`);
};

main().catch((error) => {
  console.error("[sitemap] Failed to generate sitemap:", error);
  process.exitCode = 1;
});
