import { useEffect, useMemo, useState } from "react";
import { apiService } from "@/services/apiService";

export interface WebsiteSliderItem {
  id: number;
  imagePath: string;
  targetLink: string;
  displayOrder: number;
  sliderCategory?: string;
}

interface HomeTopBarData {
  label1: string;
  label2: string;
  label3: string;
  label4: string;
}

const WEBSITE_BASE_URL = import.meta.env.VITE_BASE_URL || "https://www.rephyl.com";

let topBarCache: string[] | null = null;
let topBarPromise: Promise<string[]> | null = null;
let sliderCache: WebsiteSliderItem[] | null = null;
let sliderPromise: Promise<WebsiteSliderItem[]> | null = null;

const normalizePath = (input: string) => {
  if (!input) return "/";

  let value = input.trim();

  try {
    if (/^https?:\/\//i.test(value)) {
      value = new URL(value).pathname || "/";
    }
  } catch {
    return "/";
  }

  value = value.split("?")[0].split("#")[0].trim().toLowerCase();

  if (!value || value === WEBSITE_BASE_URL.toLowerCase()) return "/";
  if (!value.startsWith("/")) value = `/${value}`;

  return value.length > 1 ? value.replace(/\/+$/, "") : value;
};

const getRouteAliases = (pathname: string) => {
  const normalized = normalizePath(pathname);
  const aliases = new Set<string>([normalized]);

  if (normalized === "/") {
    aliases.add("/home");
    aliases.add("/index");
  }

  if (normalized === "/about") aliases.add("/about-us");
  if (normalized === "/about-us") aliases.add("/about");
  if (normalized === "/contact") aliases.add("/contact-us");
  if (normalized === "/terms") aliases.add("/terms-of-service");
  if (normalized === "/terms-of-service") aliases.add("/terms");
  if (normalized === "/faq") aliases.add("/faqs");
  if (normalized === "/faqs") aliases.add("/faq");

  if (normalized === "/blogs") aliases.add("/blog");

  if (normalized.startsWith("/blog/")) {
    aliases.add("/blog");
    aliases.add("/blogs");
  }

  return Array.from(aliases);
};

const fetchHomeTopBar = async () => {
  if (topBarCache) return topBarCache;
  if (topBarPromise) return topBarPromise;

  topBarPromise = (async () => {
    try {
      const response = await apiService.getHomeTopBar();

      if (!response.success || !response.data) {
        topBarCache = [];
        return topBarCache;
      }

      const data = response.data as HomeTopBarData;
      topBarCache = [data.label1, data.label2, data.label3, data.label4].filter(
        (label): label is string => Boolean(label && label.trim())
      );

      return topBarCache;
    } catch (error) {
      console.error("[useWebsiteAssets] Failed to fetch home top bar:", error);
      topBarCache = [];
      return topBarCache;
    } finally {
      topBarPromise = null;
    }
  })();

  return topBarPromise;
};

const fetchSliderItems = async () => {
  if (sliderCache) return sliderCache;
  if (sliderPromise) return sliderPromise;

  sliderPromise = (async () => {
    try {
            const response = await apiService.getHomeSlider();

      if (!response.success || !Array.isArray(response.data)) {
        sliderCache = [];
        return sliderCache;
      }

      sliderCache = response.data
        .filter((item): item is WebsiteSliderItem => Boolean(item && item.imagePath))
        .sort((first, second) => first.displayOrder - second.displayOrder);

      return sliderCache;
    } catch (error) {
      console.error("[useWebsiteAssets] Failed to fetch home slider:", error);
      sliderCache = [];
      return sliderCache;
    } finally {
      sliderPromise = null;
    }
  })();

  return sliderPromise;
};

export const getWebsiteAssetUrl = (path: string) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${WEBSITE_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const extractTextFromHtml = (html: string, maxLength = 180) => {
  if (!html) return "";

  let text = "";

  if (typeof window !== "undefined") {
    const temp = window.document.createElement("div");
    temp.innerHTML = html;
    text = temp.textContent || temp.innerText || "";
  } else {
    text = html.replace(/<[^>]+>/g, " ");
  }

  const cleaned = text.replace(/\s+/g, " ").trim();

  if (cleaned.length <= maxLength) return cleaned;
  return `${cleaned.slice(0, maxLength).trim()}...`;
};

export const useHomeTopBar = () => {
  const [labels, setLabels] = useState<string[]>(topBarCache || []);
  const [loading, setLoading] = useState(topBarCache === null);

  useEffect(() => {
    if (topBarCache !== null) {
      setLabels(topBarCache);
      setLoading(false);
      return;
    }

    const load = async () => {
      const data = await fetchHomeTopBar();
      setLabels(data);
      setLoading(false);
    };

    load();
  }, []);

  return { labels, loading };
};

export const useSliderItems = () => {
  const [items, setItems] = useState<WebsiteSliderItem[]>(sliderCache || []);
  const [loading, setLoading] = useState(sliderCache === null);

  useEffect(() => {
    if (sliderCache !== null) {
      setItems(sliderCache);
      setLoading(false);
      return;
    }

    const load = async () => {
      const data = await fetchSliderItems();
      setItems(data);
      setLoading(false);
    };

    load();
  }, []);

  return { items, loading };
};

export const useRouteBanner = (pathname: string) => {
  const { items, loading } = useSliderItems();

  const banner = useMemo(() => {
    const aliases = getRouteAliases(pathname);

    return items.find((item) => {
      const targetPath = normalizePath(item.targetLink);
      return aliases.includes(targetPath);
    }) || null;
  }, [items, pathname]);

  return { banner, loading };
};

export const useHomepageSlider = () => {
  const { items, loading } = useSliderItems();

  const websiteSlides = useMemo(
    () =>
      items
        .filter((item) => (item.sliderCategory || "WEBSITE").toUpperCase() === "WEBSITE")
        .sort((first, second) => first.displayOrder - second.displayOrder),
    [items]
  );

  const mobileSlides = useMemo(
    () =>
      items
        .filter((item) => (item.sliderCategory || "WEBSITE").toUpperCase() === "MOBILE")
        .sort((first, second) => first.displayOrder - second.displayOrder),
    [items]
  );

  return {
    slides: websiteSlides,
    websiteSlides,
    mobileSlides,
    loading,
  };
};