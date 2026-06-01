import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DEFAULT_SEO_META, SEO_META_BY_PATH } from "@/data/seoMetaByPath";

const normalizePathname = (pathname: string) => {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
};

const upsertMetaByAttribute = (attribute: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const RouteSeoManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalizedPath = normalizePathname(pathname);
    const currentMeta = SEO_META_BY_PATH[normalizedPath] || DEFAULT_SEO_META;

    document.title = currentMeta.title;

    upsertMetaByAttribute("name", "description", currentMeta.description);
    upsertMetaByAttribute("property", "og:title", currentMeta.title);
    upsertMetaByAttribute("property", "og:description", currentMeta.description);
    upsertMetaByAttribute("name", "twitter:title", currentMeta.title);
    upsertMetaByAttribute("name", "twitter:description", currentMeta.description);
    upsertMetaByAttribute("property", "og:url", `${window.location.origin}${normalizedPath}`);
  }, [pathname]);

  return null;
};

export default RouteSeoManager;