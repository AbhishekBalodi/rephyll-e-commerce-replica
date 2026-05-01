import { useMemo } from "react";
import { useRouteBanner, getWebsiteAssetUrl } from "@/hooks/useWebsiteAssets";

interface RouteHeroBannerProps {
  pathname: string;
  title: string;
  description?: string;
  fallbackImage?: string;
}

const RouteHeroBanner = ({ pathname, title, description, fallbackImage }: RouteHeroBannerProps) => {
  const { banner } = useRouteBanner(pathname);

  const imageSrc = useMemo(() => {
    if (banner?.imagePath) return getWebsiteAssetUrl(banner.imagePath);
    return fallbackImage || "";
  }, [banner, fallbackImage]);

  return (
    <section className="relative w-full overflow-hidden pt-[104px] text-white">
      <div className="relative h-[320px] md:h-[560px] w-full bg-[#064734]">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-[1440px] items-center px-6 md:px-16">
          <div className="max-w-[640px]">
            <h1
              className="text-[32px] font-semibold leading-[120%] md:text-[56px]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {title}
            </h1>

            {description && (
              <p
                className="mt-5 max-w-[560px] border-l-2 border-[#CEF17B] pl-4 text-[15px] leading-[150%] text-white/85 md:text-[20px]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RouteHeroBanner;