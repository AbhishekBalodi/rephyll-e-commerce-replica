import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
  {
    label: "ABOUT US",
    path: "/about",
    subcategories: [
      { label: "Our Story", path: "/about" },
      { label: "We Are Eco-friendly", path: "/about" },
      { label: "We Care", path: "/about" },
    ],
  },
  {
    label: "KITS",
    path: "/",
    subcategories: [
      { label: "Starter Kit", path: "/" },
      { label: "Complete Home Kit", path: "/" },
      { label: "Office Kit", path: "/" },
    ],
  },
  {
    label: "BLOGS",
    path: "/",
  },
  {
    label: "B2B ORDERS",
    path: "/contact",
  },
  {
    label: "HELP",
    subcategories: [
      { label: "FAQs", path: "/faqs" },
      { label: "Contact Us", path: "/contact" },
      { label: "Terms of Service", path: "/terms" },
    ],
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNav = (path: string) => {
    setSheetOpen(false);
    setActiveMenu(null);
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
      {/* Top announcement bar */}
      <div className="w-full bg-primary text-primary-foreground text-center py-2 text-sm font-medium tracking-widest uppercase">
        5L CANS STARTING AT ₹799
      </div>

      {/* Main navbar */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Left: Logo */}
            <div className="flex items-center gap-8">
              {/* Mobile hamburger */}
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <button className="md:hidden text-foreground">
                    <Menu size={22} />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <SheetHeader className="p-6 pb-4 border-b border-border">
                    <SheetTitle className="font-display text-3xl font-light text-foreground tracking-wide">
                      rePhyl
                    </SheetTitle>
                  </SheetHeader>
                  <div className="py-4 overflow-y-auto max-h-[calc(100vh-80px)]">
                    {NAV_CATEGORIES.map((cat) => (
                      <div key={cat.label}>
                        {cat.subcategories ? (
                          <Collapsible
                            open={mobileExpanded === cat.label}
                            onOpenChange={() => toggleMobileExpand(cat.label)}
                          >
                            <CollapsibleTrigger className="flex items-center justify-between w-full px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-foreground hover:bg-accent/50 transition-colors">
                              <span>{cat.label}</span>
                              <ChevronRight
                                size={16}
                                className={`text-muted-foreground transition-transform ${mobileExpanded === cat.label ? "rotate-90" : ""}`}
                              />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="bg-accent/30">
                                {cat.subcategories.map((sub) => (
                                  <button
                                    key={sub.label}
                                    onClick={() => handleNav(sub.path)}
                                    className="block w-full text-left pl-10 pr-6 py-2.5 text-sm text-foreground hover:bg-accent/50 transition-colors"
                                  >
                                    {sub.label}
                                  </button>
                                ))}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        ) : (
                          <button
                            onClick={() => cat.path && handleNav(cat.path)}
                            className="flex items-center justify-between w-full px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-foreground hover:bg-accent/50 transition-colors"
                          >
                            <span>{cat.label}</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>

              <h1
                className="font-display text-3xl md:text-4xl font-light tracking-wide text-foreground cursor-pointer"
                onClick={() => handleNav("/")}
              >
                rePhyl
              </h1>
            </div>

            {/* Center: nav links (desktop) */}
            <div className="hidden md:flex items-center gap-6">
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
                      activeMenu === cat.label
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat.label}
                  </button>
                </div>
              ))}
            </div>

            {/* Right: icons */}
            <div className="flex items-center gap-5">
              <Search size={18} className="text-foreground cursor-pointer hover:text-muted-foreground transition-colors" />
              <Heart size={18} className="text-foreground cursor-pointer hover:text-muted-foreground transition-colors" />
              <User size={18} className="text-foreground cursor-pointer hover:text-muted-foreground transition-colors" />
              <div className="relative cursor-pointer">
                <ShoppingBag size={18} className="text-foreground hover:text-muted-foreground transition-colors" />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mega menu dropdown (desktop) */}
        {activeMenu && (
          <div
            className="hidden md:block absolute left-0 right-0 bg-background border-b border-border shadow-sm z-40"
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }}
            onMouseLeave={handleMouseLeave}
          >
            <div className="max-w-7xl mx-auto px-6 py-6">
              <div className="flex gap-12">
                {NAV_CATEGORIES.find((c) => c.label === activeMenu)?.subcategories?.map((sub) => (
                  <button
                    key={sub.label}
                    onClick={() => handleNav(sub.path)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap flex items-center gap-2"
                  >
                    {sub.label}
                    {sub.isNew && (
                      <span className="text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-sm">
                        NEW
                      </span>
                    )}
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
