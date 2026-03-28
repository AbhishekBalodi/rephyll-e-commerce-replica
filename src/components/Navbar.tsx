import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoBlack from "@/assets/logo-green-cropped.png";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchSuggestions } from "@/hooks/useProducts";
import { listProducts } from "@/services/productApi";
import type { ApiProduct } from "@/types/api";
import { resolveImageUrl, getProductImage, getDisplayPrice } from "@/lib/productHelpers";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";

interface NavCategory {
  label: string;
  path?: string;
  subcategories?: { label: string; path: string; isNew?: boolean }[];
}

const NAV_CATEGORIES: NavCategory[] = [
  { label: "Home", path: "/" },
  {
    label: "Shop All",
    path: "/shop",
    subcategories: [
      { label: "Laundry Detergent", path: "/category/laundry-detergent" },
      { label: "Glass Cleaner", path: "/category/glass-cleaner" },
      { label: "Fabric Whitener", path: "/category/fabric-whitener" },
      { label: "Toilet Cleaner", path: "/category/toilet-cleaner" },
      { label: "Floor Cleaner", path: "/category/floor-cleaner" },
    ],
  },
  { label: "About Us", path: "/about" },
  { label: "Our Story", path: "/our-story" },
  { label: "Homecare Kits", path: "/homecare-kits" },
  { label: "B2B Orders", path: "/b2b-orders" },
  { label: "Blogs", path: "/blogs" },
  { label: "Reviews", path: "/testimonials" },
];

const ANNOUNCEMENT_SEGMENTS = [
  "🌿 Flat 20% Off on Bundles | Code: CLEAN20",
  "Free Shipping ₹499+",
  "Non-Toxic • Plant-Based • Family Safe",
];
const SEPARATOR = "          ✦          ";
const ANNOUNCEMENT_TEXT = ANNOUNCEMENT_SEGMENTS.join(SEPARATOR);

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ApiProduct[]>([]);
  const [searching, setSearching] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const { data: suggestions } = useSearchSuggestions(searchQuery);

  useEffect(() => {
    if (searchQuery.length < 2) { setSearchResults([]); return; }
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const data = await listProducts({ search: searchQuery, size: 6 });
        setSearchResults(data.content);
      } catch { setSearchResults([]); }
      setSearching(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) setSearchFocused(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNav = (path: string) => {
    setSheetOpen(false); setActiveMenu(null); setSearchFocused(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };
  const toggleMobileExpand = (label: string) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  // const isActive = (cat: NavCategory) => {
  //   if (cat.path === "/" && location.pathname === "/") return true;
  //   if (cat.path && cat.path !== "/" && location.pathname.startsWith(cat.path)) return true;
  //   return false;
  // };

  const isActive = (cat: NavCategory) => {
    if (!cat.path) return false;

    // Exact match ONLY
    return location.pathname === cat.path;
  };

  return (
    <>
      {/* Top announcement strip */}
      <div
        className="w-full overflow-hidden"
        style={{ height: "40px", background: "#CEF17B", display: "flex", alignItems: "center" }}
      >
        <div className="flex animate-marquee-slow whitespace-nowrap">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "20px",
                color: "#064734",
                paddingRight: "80px",
              }}
            >
              {ANNOUNCEMENT_TEXT}
            </span>
          ))}
        </div>
      </div>

      {/* Main navbar */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="w-full max-w-[1440px] mx-auto px-[40px] relative">
          <div className="h-[64px] flex items-center justify-between">
            {/* Left: Logo */}
            <div className=" flex items-center">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <button className="md:hidden text-foreground mr-3">
                    <Menu size={22} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SheetHeader className="p-6 pb-4 border-b border-border">
                    <SheetTitle>
                      <img src={logoBlack} alt="rePhyl" className="h-[180px] w-auto -my-[65px]" />
                    </SheetTitle>
                  </SheetHeader>
                  <div className="py-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                    {NAV_CATEGORIES.map((cat) => (
                      <div key={cat.label}>
                        {cat.subcategories ? (
                          <Collapsible open={mobileExpanded === cat.label} onOpenChange={() => toggleMobileExpand(cat.label)}>
                            <CollapsibleTrigger className="flex items-center justify-between w-full px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-foreground hover:bg-accent/50 transition-colors">
                              <span>{cat.label}</span>
                              <ChevronRight size={16} className={`text-muted-foreground transition-transform ${mobileExpanded === cat.label ? "rotate-90" : ""}`} />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="bg-accent/30">
                                {cat.subcategories.map((sub) => (
                                  <button key={sub.label} onClick={() => handleNav(sub.path)} className="block w-full text-left pl-10 pr-6 py-2.5 text-sm text-foreground hover:bg-accent/50 transition-colors">
                                    {sub.label}
                                  </button>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <button onClick={() => cat.path && handleNav(cat.path)} className="flex items-center justify-between w-full px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-foreground hover:bg-accent/50 transition-colors">
                            <span>{cat.label}</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>

              <img
                src={logoBlack}
                alt="rePhyl"
                className="h-[48px] md:h-[56px] w-auto cursor-pointer"
                onClick={() => handleNav("/")}
              />
            </div>

            {/* Center: nav links (desktop) - Poppins 500 14px */}
            <div className="hidden md:flex items-center gap-[20px] ml-[20px]">
              {NAV_CATEGORIES.map((cat) => (
                <div
                  key={cat.label}
                  className="relative"
                  onMouseEnter={() => cat.subcategories && handleMouseEnter(cat.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => cat.path && handleNav(cat.path)}
                    className="relative pb-1"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "150%",
                      letterSpacing: "0%",
                      color: isActive(cat) ? "#064734" : "#6B7280",
                      transition: "color 0.2s",
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#064734")}
                    onMouseOut={(e) => { if (!isActive(cat)) e.currentTarget.style.color = "#6B7280"; }}
                  >
                    {cat.label}
                    {/* Active underline */}
                    {isActive(cat) && (
                      <span
                        className="absolute left-0 right-0 bottom-[-4px]"
                        style={{ height: "2px", background: "#064734", borderRadius: "1px" }}
                      />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Right: Search bar + icons in capsule */}
            {/* RIGHT */}
            <div className=" flex items-center">

              {/* ✅ DESKTOP (md and above) */}
              <div
                ref={searchContainerRef}
                className="hidden md:flex items-center relative"
                style={{
                  height: "50px",
                  borderRadius: "30px",
                  background: "rgba(206, 241, 123, 0.2)",
                  padding: "0 16px",
                  gap: "12px",
                }}
              >
                {/* 🔍 Search */}
                <div className="flex items-center">
                  <Search size={16} className="text-[#6B7280] mr-2" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    className="bg-transparent outline-none text-sm"
                    style={{
                      width: "180px",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "14px",
                      color: "#064734",
                    }}
                  />
                </div>

                {/* Divider */}
                <div style={{ width: "1px", height: "20px", background: "#D1D5DB" }} />

                {/* 🛒 */}
                <div className="relative cursor-pointer" onClick={() => handleNav("/cart")}>
                  <ShoppingBag size={20} className="text-[#064734]" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#064734] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {totalItems > 99 ? "99+" : totalItems}
                    </span>
                  )}
                </div>

                {/* ❤️ */}
                <Heart size={20} className="text-[#064734]" />

                {/* 👤 */}
                <User size={20} className="text-[#064734]" />

                {/* 🔽 SEARCH DROPDOWN */}
                {searchFocused && searchQuery.length >= 2 && (
                  <div className="absolute left-0 right-0 top-[56px] bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden" style={{ width: '100%' }}>
                    {searching ? (
                      <div className="px-4 py-6 text-center text-sm text-gray-400">Searching...</div>
                    ) : searchResults.length > 0 ? (
                      <div className="max-h-[360px] overflow-y-auto">
                        {searchResults.map((product) => (
                          <button
                            key={product.id}
                            onClick={() => {
                              setSearchQuery("");
                              setSearchFocused(false);
                              navigate(`/product/${product.slug || product.id}`);
                            }}
                            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-0"
                          >
                            <img
                              src={resolveImageUrl(
                                product.displayImage ||
                                product.images?.[0]?.url ||
                                product.variants?.[0]?.images?.[0]?.url || ""
                              )}
                              alt={product.name}
                              className="w-10 h-10 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-800 truncate" style={{ fontFamily: "'Poppins', sans-serif" }}>{product.name}</p>
                              <p className="text-xs text-[#064734] font-semibold">
                                ₹{product.salePrice ?? product.price}
                                {product.salePrice && product.price > product.salePrice && (
                                  <span className="ml-1 text-gray-400 line-through font-normal">₹{product.price}</span>
                                )}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="px-4 py-6 text-center text-sm text-gray-400">No products found</div>
                    )}
                  </div>
                )}
              </div>

              {/* ✅ MOBILE (below md) */}
              <div className="flex md:hidden items-center gap-3">
                <button onClick={() => searchInputRef.current?.focus()}>
                  <Search size={18} />
                </button>

                <div className="relative cursor-pointer" onClick={() => handleNav("/cart")}>
                  <ShoppingBag size={18} />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {totalItems > 99 ? "99+" : totalItems}
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Mega menu (desktop) */}
        {activeMenu && (
          <div className="hidden md:block absolute left-0 right-0 bg-background border-b border-border shadow-sm z-40" onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }} onMouseLeave={handleMouseLeave}>
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex gap-12">
                {NAV_CATEGORIES.find((c) => c.label === activeMenu)?.subcategories?.map((sub) => (
                  <button key={sub.label} onClick={() => handleNav(sub.path)} className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap flex items-center gap-2">
                    {sub.label}
                    {sub.isNew && <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-sm">NEW</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
