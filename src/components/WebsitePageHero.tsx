import { ArrowRight } from "lucide-react";
import type { WebsitePageData } from "@/hooks/useWebsitePage";

interface WebsitePageHeroProps {
  page: WebsitePageData | null;
  fallbackTitle: string;
  fallbackDescription?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const getImageUrl = (path?: string) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const baseUrl = import.meta.env.VITE_BASE_URL || "https://www.rephyl.com";
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

const WebsitePageHero = ({ page, fallbackTitle, fallbackDescription, buttonLabel, onButtonClick }: WebsitePageHeroProps) => {
  // If the page record is missing from backend, do not render a generic banner.
  if (!page) {
    return <div className="pt-[104px]" aria-hidden="true" />;
  }

  // Banner content should come from the website page API record.
  const title = page.title || page.metaTitle || fallbackTitle;
  const description = page.metaDescription || fallbackDescription || "";
  const image = page.metaImg ? getImageUrl(page.metaImg) : "";

  return (
    <section className="relative w-full overflow-hidden pt-[104px] text-white">
      <div className="relative h-[260px] sm:h-[320px] md:h-[460px] lg:h-[560px] w-full bg-[#064734]">
        {image && <img src={image} alt={title} className="absolute inset-0 h-full w-full object-cover" />}
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-4 sm:px-6 md:px-16">
          <div className="max-w-[640px]">
            <h1
              className="text-[28px] sm:text-[32px] font-semibold leading-[120%] md:text-[48px] lg:text-[56px]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {title}
            </h1>

            {description && (
              <p
                className="mt-3 sm:mt-5 max-w-[560px] border-l-2 border-[#CEF17B] pl-3 sm:pl-4 text-[14px] leading-[145%] text-white/85 md:text-[18px] lg:text-[20px]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {description}
              </p>
            )}

            {buttonLabel && onButtonClick && (
              <button
                onClick={onButtonClick}
                className="mt-5 sm:mt-7 inline-flex items-center justify-center gap-3 rounded-[43px] bg-[#CEF17B] px-6 sm:px-8 py-3 sm:py-4 text-[14px] sm:text-[16px] font-semibold leading-[120%] text-[#064734] transition-opacity hover:opacity-90"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {buttonLabel}
                <ArrowRight size={15} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsitePageHero;