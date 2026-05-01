import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Heart,
  Bookmark,
  Share2,
  Star,
} from "lucide-react";

import type {
  ApiProductAttribute,
  ApiProductDetail,
  ApiVariant,
} from "@/types/api";

import {
  getProductImages,
  getVariantDiscountPercent,
  getVariantMrp,
  getVariantUnitPrice,
  isPackAttribute,
  parseAttrsCombo,
} from "@/lib/productHelpers";

import { useCart } from "@/contexts/CartContext";

import ProductDetailAccordion from "./ProductDetailAccordion";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductDetailProps {
  product: ApiProductDetail;
  onBack: () => void;
}

type AttributeOption = {
  value: string;
  variants: ApiVariant[];
};

// fallback removed
const ProductDetail = ({
  product,
}: ProductDetailProps) => {
  const isMobile = useIsMobile();
  const [activeImg, setActiveImg] =
    useState(0);
  const [touchStartX, setTouchStartX] =
    useState<number | null>(null);
  const [touchEndX, setTouchEndX] =
    useState<number | null>(null);

  const [isDescriptionExpanded, setIsDescriptionExpanded] =
    useState(false);

  const [canExpandDescription, setCanExpandDescription] =
    useState(false);

  const [selectedVariant, setSelectedVariant] =
    useState<
      ApiVariant | undefined
    >(product.variants?.[0]);

  const descriptionRef =
    useRef<HTMLParagraphElement | null>(
      null
    );

  const thumbnailRefs =
    useRef<
      Array<HTMLButtonElement | null>
    >([]);

  const imageFrameRef =
    useRef<HTMLDivElement | null>(
      null
    );

  const [thumbnailRailHeight, setThumbnailRailHeight] =
    useState<number | null>(
      null
    );

  const {
    items,
    addToCart,
  } = useCart();

  const FEATURES =
    product.featureBadges ?? [];

  const DESCRIPTION =
    product.description ?? "";

  const orderedAttributes =
    useMemo(
      () =>
        [...(product.attrs ?? [])].sort(
          (
            left,
            right
          ) =>
            (left.displayOrder ??
              0) -
            (right.displayOrder ??
              0)
        ),
      [product.attrs]
    );

  const variantsByAttribute =
    useMemo(() => {
      if (
        !orderedAttributes.length
      )
        return null;

      const organized: Record<
        string,
        AttributeOption[]
      > = {};

      orderedAttributes.forEach(
        (
          attr: ApiProductAttribute
        ) => {
          organized[
            attr.attributeName
          ] =
            attr.values.map(
              (value) => ({
                value,
                variants:
                  product.variants?.filter(
                    (
                      variant
                    ) => {
                      const attrs =
                        parseAttrsCombo(
                          variant.attrsCombo
                        );

                      return (
                        attrs[
                          attr.attributeName
                        ] ===
                        value
                      );
                    }
                  ) ?? [],
              })
            );
        }
      );

      return organized;
    }, [
      orderedAttributes,
      product.variants,
    ]);

  const images =
    getProductImages(product);

  useEffect(() => {
    setIsDescriptionExpanded(false);
  }, [DESCRIPTION]);

  useEffect(() => {
    if (!DESCRIPTION.trim()) {
      setCanExpandDescription(
        false
      );
      return;
    }

    const updateClampState =
      () => {
        const element =
          descriptionRef.current;

        if (!element) return;

        setCanExpandDescription(
          isDescriptionExpanded ||
            element.scrollHeight >
              element.clientHeight +
                1
        );
      };

    updateClampState();
    window.addEventListener(
      "resize",
      updateClampState
    );

    return () =>
      window.removeEventListener(
        "resize",
        updateClampState
      );
  }, [DESCRIPTION, isDescriptionExpanded]);

  useEffect(() => {
    const activeThumbnail =
      thumbnailRefs.current[
        activeImg
      ];

    activeThumbnail?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  }, [activeImg]);

  useEffect(() => {
    const frame =
      imageFrameRef.current;

    if (!frame) return;

    const updateRailHeight =
      () => {
        const nextHeight =
          Math.round(
            frame.getBoundingClientRect()
              .height
          );

        setThumbnailRailHeight(
          (
            previousHeight
          ) =>
            previousHeight ===
            nextHeight
              ? previousHeight
              : nextHeight
        );
      };

    updateRailHeight();

    if (
      typeof ResizeObserver !==
      "undefined"
    ) {
      const observer =
        new ResizeObserver(
          updateRailHeight
        );

      observer.observe(frame);

      return () =>
        observer.disconnect();
    }

    window.addEventListener(
      "resize",
      updateRailHeight
    );

    return () =>
      window.removeEventListener(
        "resize",
        updateRailHeight
      );
  }, [images.length]);

  const selectedAttrs =
    useMemo(
      () =>
        parseAttrsCombo(
          selectedVariant?.attrsCombo ??
            ""
        ),
      [
        selectedVariant?.attrsCombo,
      ]
    );

  const activePrice =
    selectedVariant?.price ??
    product.basePrice;

  const activeMrp =
    selectedVariant
      ? getVariantMrp(
          product,
          selectedVariant
        )
      : product.basePrice;

  const activeDiscount =
    selectedVariant
      ? getVariantDiscountPercent(
          product,
          selectedVariant
        )
      : 0;

  const cartItem =
    items.find(
      (item) =>
        item.productId ===
          product.id &&
        item.variantId ===
          selectedVariant?.id
    );

  const cartQty =
    cartItem?.quantity ?? 0;
  const inventoryMax =
    selectedVariant
      ?.inventory
      ?.maxCartQuantity ??
    selectedVariant
      ?.inventory
      ?.totalStock ??
    null;
  const maxAllowedQty =
    selectedVariant
      ?.inventory
      ?.available === false
      ? 0
      : Math.min(
          10,
          inventoryMax ??
            Number.POSITIVE_INFINITY,
          cartItem
            ?.maxQuantity ??
            Number.POSITIVE_INFINITY
        );

  const prevImg = () =>
    setActiveImg((p) =>
      p > 0
        ? p - 1
        : images.length - 1
    );

  const nextImg = () =>
    setActiveImg((p) =>
      p < images.length - 1
        ? p + 1
        : 0
    );

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    setTouchEndX(null);
    setTouchStartX(
      event.targetTouches[0]?.clientX ??
        null
    );
  };

  const handleTouchMove = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    setTouchEndX(
      event.targetTouches[0]?.clientX ??
        null
    );
  };

  const handleTouchEnd = () => {
    if (
      touchStartX === null ||
      touchEndX === null
    ) {
      return;
    }

    const swipeDistance =
      touchStartX - touchEndX;

    if (Math.abs(swipeDistance) < 40) {
      return;
    }

    if (swipeDistance > 0) {
      nextImg();
      return;
    }

    prevImg();
  };

  const handleAddToCart =
    () => {
      if (
        !selectedVariant?.id
      ) {
        alert(
          "Please select a variant"
        );
        return;
      }

      if (
        cartQty >=
        maxAllowedQty
      ) {
        return;
      }

      const maxCartQuantity =
        selectedVariant
          .inventory
          ?.available
          ? selectedVariant
              .inventory
              .maxCartQuantity ??
            selectedVariant
              .inventory
              .totalStock ??
            null
          : 0;

      addToCart(
        {
          productId:
            product.id,
          name: product.name,
          price:
            selectedVariant.price,
          originalPrice:
            getVariantMrp(
              product,
              selectedVariant
            ),
          image: images[0],
          variantId:
            selectedVariant.id,
          maxQuantity:
            Math.min(
              10,
              maxCartQuantity ??
                Number.POSITIVE_INFINITY
            ),
        },
        1
      );
    };

  const handleAttributeSelect =
    (
      attributeName: string,
      value: string
    ) => {
      if (
        !product.variants
          ?.length
      )
        return;

      const nextSelection =
        {
          ...selectedAttrs,
          [attributeName]:
            value,
        };

      const exactMatch =
        product.variants.find(
          (variant) => {
            const attrs =
              parseAttrsCombo(
                variant.attrsCombo
              );

            return Object.entries(
              nextSelection
            ).every(
              ([
                key,
                selectedValue,
              ]) =>
                attrs[key] ===
                selectedValue
            );
          }
        );

      if (exactMatch) {
        setSelectedVariant(
          exactMatch
        );
        return;
      }

      const fallback =
        product.variants.find(
          (variant) => {
            const attrs =
              parseAttrsCombo(
                variant.attrsCombo
              );

            return (
              attrs[
                attributeName
              ] === value
            );
          }
        );

      if (fallback)
        setSelectedVariant(
          fallback
        );
    };

  const renderAttributeCard =
    (
      attributeName: string,
      value: string,
      variants: ApiVariant[]
    ) => {
      const matchingVariants =
        variants.filter(
          (variant) => {
            const attrs =
              parseAttrsCombo(
                variant.attrsCombo
              );

            return Object.entries(
              selectedAttrs
            ).every(
              ([
                key,
                selectedValue,
              ]) =>
                key ===
                  attributeName ||
                attrs[key] ===
                  selectedValue
            );
          }
        );

      const preferredVariant =
        matchingVariants.find(
          (
            variant
          ) =>
            variant
              .inventory
              ?.available
        ) ??
        matchingVariants[0] ??
        variants.find(
          (
            variant
          ) =>
            variant
              .inventory
              ?.available
        ) ??
        variants[0];

      const isSelected =
        selectedAttrs[
          attributeName
        ] === value;

      const isAvailable =
        variants.some(
          (
            variant
          ) =>
            variant
              .inventory
              ?.available
        );

      const packCard =
        isPackAttribute(
          attributeName
        );

      const displayMrp =
        preferredVariant
          ? getVariantMrp(
              product,
              preferredVariant
            )
          : product.basePrice;

      const displayDiscount =
        preferredVariant
          ? getVariantDiscountPercent(
              product,
              preferredVariant
            )
          : 0;

      const unitPrice =
        preferredVariant
          ? getVariantUnitPrice(
              preferredVariant
            ) ??
            preferredVariant.price
          : null;

      return (
        <button
          key={`${attributeName}-${value}`}
          type="button"
          onClick={() =>
            handleAttributeSelect(
              attributeName,
              value
            )
          }
          disabled={
            !preferredVariant
          }
          className={`border rounded-xl transition-all ${
            packCard
              ? "w-full p-3 text-left"
              : "w-auto min-w-fit px-4 py-2 text-center"
          } ${
            isSelected
              ? "border-[#064734] bg-[#F3FBF7]"
              : "border-gray-200 bg-white"
          } ${
            !isAvailable
              ? "opacity-60"
              : ""
          }`}
        >
          <div
            className={`gap-2 ${
              packCard
                ? "flex items-start justify-between"
                : "flex items-center justify-center"
            }`}
          >
            <div
              className={`text-sm font-semibold text-[#064734] ${
                packCard
                  ? ""
                  : "whitespace-nowrap"
              }`}
            >
              {value}
            </div>

            {packCard &&
            displayDiscount >
              0 ? (
              <div className="rounded-full bg-[#064734] px-2 py-0.5 text-[10px] font-semibold text-white whitespace-nowrap">
                Save{" "}
                {
                  displayDiscount
                }
                %
              </div>
            ) : null}
          </div>

          {packCard &&
          preferredVariant ? (
            <>
              <div className="flex items-baseline gap-2 mt-1.5">
                <span className="text-xl font-bold text-black">
                  ₹
                  {preferredVariant.price.toFixed(
                    2
                  )}
                </span>

                {displayMrp >
                preferredVariant.price ? (
                  <span className="text-xs text-gray-400 line-through">
                    ₹
                    {displayMrp.toFixed(
                      2
                    )}
                  </span>
                ) : null}
              </div>

              {unitPrice !==
              null ? (
                <div className="mt-0.5 text-xs text-[#6B7280]">
                  ₹
                  {unitPrice.toFixed(
                    2
                  )}{" "}
                  / pack
                </div>
              ) : null}
            </>
          ) : null}
        </button>
      );
    };

  return (
    <div className="max-w-[1240px] mx-auto px-3 sm:px-4 md:px-6 pt-[112px] md:pt-[140px] lg:pt-[155px] pb-8 md:pb-10">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] gap-5 md:gap-6 lg:gap-10 items-start">
        {/* LEFT */}
        <div className="flex flex-col md:flex-row gap-3 h-full lg:h-[500px] w-full max-w-[430px] md:max-w-[760px] lg:max-w-none mx-auto justify-center items-start">
          {!isMobile ? (
            <div
              className="flex overflow-y-auto overflow-x-hidden scrollbar-hide shrink-0 rounded-xl bg-white pr-1"
              style={
                thumbnailRailHeight
                  ? {
                      height: `${thumbnailRailHeight}px`,
                      maxHeight: `${thumbnailRailHeight}px`,
                    }
                  : undefined
              }
            >
              <div className="flex flex-col gap-2">
              {images.map(
                (
                  img,
                  index
                ) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    ref={(element) => {
                      thumbnailRefs.current[
                        index
                      ] = element;
                    }}
                    onClick={() =>
                      setActiveImg(
                        index
                      )
                    }
                    className={`rounded-lg border cursor-pointer flex-shrink-0 overflow-hidden ${
                      activeImg ===
                      index
                        ? "border-[#064734]"
                        : "border-gray-200"
                    }`}
                    aria-label={`Show ${product.name} image ${index + 1}`}
                  >
                    <img
                      src={img}
                      className="w-14 h-14 md:w-16 md:h-16 object-cover"
                      alt={`${product.name}-${index}`}
                    />
                  </button>
                )
              )}
              </div>
            </div>
          ) : null}

          <div
            ref={imageFrameRef}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchMove={isMobile ? handleTouchMove : undefined}
            onTouchEnd={isMobile ? handleTouchEnd : undefined}
            className="relative w-full flex-1 rounded-2xl bg-[#F6F6F6] overflow-hidden aspect-[5/4] md:aspect-[5/4] lg:aspect-[4/5] lg:h-[500px] touch-pan-y"
          >
            <img
              src={
                images[
                  activeImg
                ]
              }
              className="w-full h-full object-cover"
              alt={
                product.name
              }
            />

            <button
              type="button"
              onClick={
                prevImg
              }
              className={`absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md ${
                isMobile ? "hidden" : ""
              }`}
            >
              <ChevronLeft
                size={18}
              />
            </button>

            <button
              type="button"
              onClick={
                nextImg
              }
              className={`absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md ${
                isMobile ? "hidden" : ""
              }`}
            >
              <ChevronRight
                size={18}
              />
            </button>
          </div>

          {isMobile && images.length > 1 ? (
            <div className="flex w-full items-center justify-center gap-2 pt-1">
              {images.map((img, index) => (
                <button
                  key={`${img}-dot-${index}`}
                  type="button"
                  onClick={() => setActiveImg(index)}
                  aria-label={`Go to image ${index + 1}`}
                  className={`rounded-full transition-all ${
                    activeImg === index
                      ? "h-2.5 w-6 bg-[#064734]"
                      : "h-2.5 w-2.5 bg-[#C7D2D9]"
                  }`}
                />
              ))}
            </div>
          ) : null}
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-5 justify-start lg:min-h-[500px]">
          <div>
            {/* heading */}
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-[22px] md:text-[28px] font-semibold text-black leading-tight mb-0.5">
                  {
                    product.name
                  }
                </h1>

                {/* DESCRIPTION from backend only */}
                {DESCRIPTION.trim() !==
                  "" && (
                  <div className="max-w-full pr-1">
                    {isDescriptionExpanded ? (
                      <p
                        ref={descriptionRef}
                        className="text-[14px] font-medium leading-snug text-[#464646] md:text-[15px]"
                        style={{
                          display:
                            "block",
                          whiteSpace:
                            "normal",
                          wordBreak:
                            "break-word",
                          overflowWrap:
                            "anywhere",
                        }}
                      >
                        {
                          DESCRIPTION
                        }
                        {canExpandDescription ? (
                          <>
                            {" "}
                            <button
                              type="button"
                              onClick={() =>
                                setIsDescriptionExpanded(
                                  false
                                )
                              }
                              className="text-[14px] font-semibold text-[#064734] underline underline-offset-2 md:text-[15px]"
                            >
                              Show Less
                            </button>
                          </>
                        ) : null}
                      </p>
                    ) : (
                      <div className="relative">
                        <p
                          ref={descriptionRef}
                          className="text-[14px] font-medium leading-snug text-[#464646] md:text-[15px]"
                          style={{
                            display:
                              "-webkit-box",
                            WebkitLineClamp:
                              2,
                            WebkitBoxOrient:
                              "vertical",
                            overflow:
                              "hidden",
                            whiteSpace:
                              "normal",
                            wordBreak:
                              "break-word",
                            overflowWrap:
                              "anywhere",
                          }}
                        >
                          {
                            DESCRIPTION
                          }
                        </p>

                        {canExpandDescription ? (
                          <button
                            type="button"
                            onClick={() =>
                              setIsDescriptionExpanded(
                                true
                              )
                            }
                            className="absolute bottom-0 right-0 bg-[#F8F8F8] pl-2 text-[14px] font-semibold text-[#064734] underline underline-offset-2 md:text-[15px]"
                          >
                            Read More
                          </button>
                        ) : null}
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-1.5 md:mt-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[26px] md:text-[34px] font-bold text-[#064734] leading-none">
                      ₹
                      {activePrice.toFixed(
                        2
                      )}
                    </span>

                    {activeMrp >
                    activePrice ? (
                      <span className="line-through text-gray-400 text-sm">
                        ₹
                        {activeMrp.toFixed(
                          2
                        )}
                      </span>
                    ) : null}

                    {activeDiscount >
                    0 ? (
                      <span className="rounded-full bg-[#E2F3AF] px-3 py-1 text-xs font-semibold text-[#064734]">
                        Save{" "}
                        {
                          activeDiscount
                        }
                        %
                      </span>
                    ) : null}
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    93% of buyers
                    have
                    recommended
                    this.
                  </div>
                </div>
              </div>

              <div className="inline-flex flex-col items-end gap-2 shrink-0 ml-auto">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#E2F3AF] rounded-full text-xs">
                    <Heart
                      size={12}
                      className="text-[#064734]"
                    />
                    109
                  </div>

                  {/* <div className="w-[34px] h-[34px] rounded-full bg-[#0647341A] flex items-center justify-center">
                    <Bookmark
                      size={14}
                      className="text-[#064734]"
                    />
                  </div> */}

                  {/* <div className="w-[34px] h-[34px] rounded-full bg-[#0647341A] flex items-center justify-center">
                    <Share2
                      size={14}
                      className="text-[#064734]"
                    />
                  </div> */}
                </div>

                {/* <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-[#E2F3AF] rounded-full text-xs">
                    <Star
                      size={12}
                      fill="#064734"
                      className="text-[#064734]"
                    />
                    4.8
                  </div>

                  <div className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                    67 Reviews
                  </div>
                </div> */}
              </div>
            </div>

            {FEATURES.length >
              0 && (
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-4 mb-4">
                {FEATURES.map(
                  (
                    item
                  ) => (
                    <div
                      key={
                        item
                      }
                      className="flex items-center gap-2"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#CEF17B] flex items-center justify-center shrink-0">
                        <Check
                          size={
                            10
                          }
                          className="text-[#064734]"
                        />
                      </div>

                      <span className="text-xs text-[#064734] leading-none">
                        {
                          item
                        }
                      </span>
                    </div>
                  )
                )}
              </div>
            )}

            {/* variants */}
            {variantsByAttribute &&
            Object.keys(
              variantsByAttribute
            ).length >
              0 ? (
              <div className="space-y-4 mb-5">
                {orderedAttributes.map(
                  (
                    attr
                  ) => (
                    <div
                      key={
                        attr.attributeName
                      }
                    >
                      <p className="text-sm font-semibold text-[#064734] mb-2">
                        {
                          attr.attributeName
                        }
                      </p>

                      <div
                        className={`${
                          isPackAttribute(
                            attr.attributeName
                          )
                            ? "grid gap-3 w-full"
                            : "flex flex-wrap gap-2"
                        }`}
                        style={
                          isPackAttribute(
                            attr.attributeName
                          )
                            ? {
                                gridTemplateColumns:
                                  "repeat(auto-fit, minmax(170px, 1fr))",
                              }
                            : undefined
                        }
                      >
                        {(
                          variantsByAttribute[
                            attr
                              .attributeName
                          ] ?? []
                        ).map(
                          ({
                            value,
                            variants,
                          }) =>
                            renderAttributeCard(
                              attr.attributeName,
                              value,
                              variants
                            )
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : null}

            {/* cart */}
            <div className="flex gap-3 mb-5">
              <button
                type="button"
                onClick={
                  handleAddToCart
                }
                disabled={
                  !selectedVariant?.id ||
                  maxAllowedQty <=
                    0 ||
                  cartQty >=
                    maxAllowedQty
                }
                className="w-full bg-[#064734] text-white py-3 rounded-xl text-[15px] disabled:cursor-not-allowed disabled:opacity-70"
              >
                Add To Cart
              </button>
            </div>
          </div>

          <div className="text-[15px] font-semibold text-[#064734]">
            <ProductDetailAccordion
              product={
                product
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;