import { useEffect, useState } from "react";
import { apiService } from "@/services/apiService";

export interface WebsitePageData {
  id: number;
  title: string;
  link: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  metaImg: string;
}

interface UseWebsitePageResult {
  data: WebsitePageData | null;
  loading: boolean;
  error: Error | null;
}

const normalizeLink = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/\s+/g, "-");

export const getWebsitePageLinkCandidates = (pathname: string): string[] => {
  const cleaned = normalizeLink(pathname.split("?")[0].split("#")[0] || "");
  const base = cleaned || "home";

  const candidates = new Set<string>([base]);

  if (base === "") candidates.add("home");
  if (base === "about") candidates.add("about-us");
  if (base === "about-us") candidates.add("about");
  if (base === "contact") candidates.add("contact-us");
  if (base === "contact-us") candidates.add("contact");
  if (base === "terms") candidates.add("terms-of-service");
  if (base === "terms-of-service") candidates.add("terms");
  if (base === "faq") candidates.add("faqs");
  if (base === "faqs") candidates.add("faq");

  if (base.startsWith("blog/")) {
    candidates.add("blogs");
    candidates.add("blog");
  }

  return Array.from(candidates).filter(Boolean);
};

/**
 * Custom hook to fetch website page data by link.
 * @param link - The page link (e.g., 'about-us', 'privacy-policy')
 */
export const useWebsitePage = (link: string): UseWebsitePageResult => {
  const [data, setData] = useState<WebsitePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!link) {
      setLoading(false);
      return;
    }

    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getWebsitePage(link);

        if (response.success && response.data) {
          setData(response.data as WebsitePageData);
        } else {
          setError(
            new Error(response.message || "Failed to fetch page data")
          );
          setData(null);
        }
      } catch (err) {
        console.error(`[useWebsitePage] Error fetching page "${link}":`, err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [link]);

  return { data, loading, error };
};

/**
 * Route-aware website page resolver.
 * Tries multiple link candidates and returns the first page found.
 */
export const useWebsitePageByPath = (pathname: string): UseWebsitePageResult => {
  const [data, setData] = useState<WebsitePageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const candidates = getWebsitePageLinkCandidates(pathname);

    if (candidates.length === 0) {
      setLoading(false);
      return;
    }

    const fetchPage = async () => {
      try {
        setLoading(true);
        setError(null);

        for (const link of candidates) {
          const response = await apiService.getWebsitePage(link);
          if (response.success && response.data) {
            setData(response.data as WebsitePageData);
            setLoading(false);
            return;
          }
        }

        setData(null);
        setError(new Error("Website page not found"));
      } catch (err) {
        console.error(`[useWebsitePageByPath] Error fetching path "${pathname}":`, err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [pathname]);

  return { data, loading, error };
};
