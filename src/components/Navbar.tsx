import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown, ChevronRight, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoBlack from "@/assets/logo-green-cropped.png";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchSuggestions } from "@/hooks/useProducts";
import { listProducts } from "@/services/productApi";
import type { ApiProduct } from "@/types/api";
import { resolveImageUrl } from "@/lib/productHelpers";
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
  {
    label: "SHOP ALL",
    path: "/",
    subcategories: [
      { label: "Laundry Detergent", path: "/" },
      { label: "Glass Cleaner", path: "/" },
      { label: "Fabric Whitener", path: "/" },
      { label: "Toilet Cleaner", path: "/" },
      { label: "Floor Cleaner", path: "/" },
    ],
  },
  {
    label: "PRODUCTS",
    path: "/",
    subcategories: [
      { label: "Laundry Detergent", path: "/" },
      { label: "Glass Cleaner", path: "/" },
      { label: "Fabric Whitener", path: "/" },
      { label: "Toilet Cleaner", path: "/" },
      { label: "Floor Cleaner", path: "/" },
    ],
  },
  { label: "ABOUT US", path: "/about" },
  { label: "BLOGS", path: "/blogs" },
  { label: "B2B ORDERS", path: "/contact" },
  { label: "WHY CHOOSE US", path: "/why-choose-us" },
  { label: "REVIEWS", path: "/testimonials" },
];

const ANNOUNCEMENT_SEGMENTS = [
  "🌿 Flat 20% Off on Bundles | Code: CLEAN20",
  "✦ Free Shipping ₹499+",
  "✦ Non-Toxic • Plant-Based • Family Safe",
];
const ANNOUNCEMENT_TEXT = ANNOUNCEMENT_SEGMENTS.join("          ");

const Navbar = () => {
  const navigate = useNavigate();
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

  // Debounced search
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const data = await listProducts({ search: searchQuery, size: 6 });
        setSearchResults(data.content);
      } catch {
        setSearchResults([]);
      }
      setSearching(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close search dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNav = (path: string) => {
    setSheetOpen(false);
    setActiveMenu(null);
    setSearchFocused(false);
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

  return (
    <>
      {/* Top announcement strip - lime green, 40px height, marquee */}
      <div
        className="w-full overflow-hidden"
        style={{
          height: "40px",
          background: "#CEF17B",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="flex animate-marquee-slow whitespace-nowrap">
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "14px",
              lineHeight: "20px",
              color: "#064734",
            }}
          >
            {ANNOUNCEMENT_TEXT}{ANNOUNCEMENT_TEXT}{ANNOUNCEMENT_TEXT}{ANNOUNCEMENT_TEXT}
          </span>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="h-16 flex items-center justify-between gap-4">
            {/* Left: Logo */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <button className="md:hidden text-foreground">
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
                className="h-[180px] md:h-[220px] w-auto cursor-pointer -my-[70px] md:-my-[85px]"
                onClick={() => handleNav("/")}
              />
            </div>

            {/* Center: nav links (desktop) */}
            <div className="hidden md:flex items-center gap-5 flex-shrink-0">
              {NAV_CATEGORIES.map((cat) => (
                <div
                  key={cat.label}
                  className="relative"
                  onMouseEnter={() => cat.subcategories && handleMouseEnter(cat.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => cat.path && handleNav(cat.path)}
                    className={`text-xs font-semibold uppercase tracking-[0.12em] py-2 transition-colors ${
                      activeMenu === cat.label ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.label}
                  </button>
                </div>
              ))}
            </div>

            {/* Right: Search bar + icons */}
            <div className="flex items-center gap-4">
              {/* Big capsule search bar */}
              <div ref={searchContainerRef} className="relative hidden md:block">
                <div className="flex items-center bg-muted/60 rounded-full border border-border px-4 py-2 w-[220px] lg:w-[280px] transition-all focus-within:border-primary/40 focus-within:bg-background focus-within:shadow-sm">
                  <Search size={16} className="text-muted-foreground flex-shrink-0 mr-2" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground text-foreground"
                  />
                </div>

                {/* Search dropdown */}
                {searchFocused && (searchQuery.length >= 2 || (suggestions && suggestions.length > 0)) && (
                  <div className="absolute right-0 top-12 w-80 md:w-96 bg-background border border-border rounded-lg shadow-xl z-50 overflow-hidden">
                    {suggestions && suggestions.length > 0 && searchResults.length === 0 && (
                      <div className="p-2">
                        <p className="px-2 py-1 text-[10px] font-semibold uppercase text-muted-foreground">Suggestions</p>
                        {suggestions.map((s, i) => (
                          <button
                            key={i}
                            onClick={() => setSearchQuery(String(s))}
                            className="block w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent rounded transition-colors"
                          >
                            {String(s)}
                          </button>
                        ))}
                      </div>
                    )}
                    {searching && (
                      <p className="text-center text-sm text-muted-foreground py-4">Searching...</p>
                    )}
                    {!searching && searchResults.length > 0 && (
                      <div className="max-h-80 overflow-y-auto">
                        {searchResults.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => {
                              setSearchFocused(false);
                              setSearchQuery("");
                              navigate(`/product/${p.slug || p.id}`);
                            }}
                            className="flex items-center gap-3 w-full px-3 py-3 hover:bg-accent transition-colors text-left border-b border-border last:border-0"
                          >
                            <img
                              src={resolveImageUrl(p.productImage) || "/placeholder.svg"}
                              alt={p.name}
                              className="w-12 h-12 rounded-md object-cover bg-muted flex-shrink-0"
                              onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                              <p className="text-xs text-muted-foreground">{p.brandName} · ₹{p.wholesalePrice ?? p.mrp}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                    {!searching && searchQuery.length >= 2 && searchResults.length === 0 && (
                      <p className="text-center text-sm text-muted-foreground py-4">No products found</p>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile search icon */}
              <button className="md:hidden" onClick={() => searchInputRef.current?.focus()}>
                <Search size={18} className="text-foreground" />
              </button>

              <Heart size={18} className="text-foreground cursor-pointer hover:text-muted-foreground transition-colors" />

              {/* User icon */}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="relative">
                    <User size={18} className="text-foreground cursor-pointer hover:text-muted-foreground transition-colors" />
                    {user && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full" />}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2" align="end">
                  {user ? (
                    <div className="space-y-1">
                      <p className="px-3 py-2 text-sm font-semibold text-foreground truncate">{user.username || user.email}</p>
                      <hr className="border-border" />
                      {isAdmin && (
                        <button onClick={() => handleNav("/admin/add-product")} className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent rounded transition-colors">
                          Add Product
                        </button>
                      )}
                      <button onClick={() => { logout(); }} className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent rounded transition-colors flex items-center gap-2">
                        <LogOut size={14} /> Log Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <button onClick={() => handleNav("/login")} className="w-full text-left px-3 py-2 text-sm font-semibold text-foreground hover:bg-accent rounded transition-colors">Log In</button>
                      <button onClick={() => handleNav("/signup")} className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-accent rounded transition-colors">Create Account</button>
                    </div>
                  )}
                </PopoverContent>
              </Popover>

              {/* Cart */}
              <div className="relative cursor-pointer" onClick={() => handleNav("/cart")}>
                <ShoppingBag size={18} className="text-foreground hover:text-muted-foreground transition-colors" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-in zoom-in-50 duration-200">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mega menu (desktop) */}
        {activeMenu && (
          <div
            className="hidden md:block absolute left-0 right-0 bg-background border-b border-border shadow-sm z-40"
            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
            onMouseLeave={handleMouseLeave}
          >
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
