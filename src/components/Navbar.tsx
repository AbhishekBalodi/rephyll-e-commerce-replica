import { Search, User, ShoppingCart, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
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
    label: "PRODUCTS",
    path: "/",
    subcategories: [
      { label: "Laundry Detergent", path: "/" },
      { label: "Glass Cleaner", path: "/" },
      { label: "Fabric Whitener", path: "/" },
      { label: "Toilet Cleaner", path: "/" },
      { label: "Floor Cleaner", path: "/" },
      { label: "Shop All", path: "/" },
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
  const [companyOpen, setCompanyOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
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

  return (
    <>
      {/* Top announcement bar */}
      <div className="w-full bg-primary text-primary-foreground text-center py-2 text-sm font-medium tracking-widest uppercase">
        5L CANS STARTING AT ₹799
      </div>

      {/* Main navbar */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Top row: logo centered, search + icons on sides */}
          <div className="h-16 flex items-center justify-between">
            {/* Left: hamburger (mobile) + search */}
            <div className="flex items-center gap-4">
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
                  <div className="py-4">
                    <button
                      onClick={() => handleNav("/")}
                      className="flex items-center justify-between w-full px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-foreground hover:bg-accent/50 transition-colors"
                    >
                      <span>Products</span>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </button>

                    <Collapsible open={companyOpen} onOpenChange={setCompanyOpen}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-foreground hover:bg-accent/50 transition-colors">
                        <span>About Us</span>
                        <ChevronRight
                          size={16}
                          className={`text-muted-foreground transition-transform ${companyOpen ? "rotate-90" : ""}`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="bg-accent/30">
                          {[
                            { label: "Our Story", path: "/about" },
                            { label: "We Are Eco-friendly", path: "/about" },
                          ].map((item) => (
                            <button
                              key={item.label}
                              onClick={() => handleNav(item.path)}
                              className="block w-full text-left pl-10 pr-6 py-2.5 text-sm text-foreground hover:bg-accent/50 transition-colors"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible open={helpOpen} onOpenChange={setHelpOpen}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider text-foreground hover:bg-accent/50 transition-colors">
                        <span>Help</span>
                        <ChevronRight
                          size={16}
                          className={`text-muted-foreground transition-transform ${helpOpen ? "rotate-90" : ""}`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="bg-accent/30">
                          {[
                            { label: "FAQs", path: "/faqs" },
                            { label: "Contact Us", path: "/contact" },
                            { label: "Terms of Service", path: "/terms" },
                          ].map((item) => (
                            <button
                              key={item.label}
                              onClick={() => handleNav(item.path)}
                              className="block w-full text-left pl-10 pr-6 py-2.5 text-sm text-foreground hover:bg-accent/50 transition-colors"
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </SheetContent>
              </Sheet>

              <div className="hidden md:flex items-center gap-2 text-muted-foreground">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="text-sm bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground w-32 focus:w-48 transition-all"
                />
              </div>
            </div>

            {/* Center: brand name */}
            <h1
              className="font-display text-3xl md:text-4xl font-light tracking-wide text-foreground cursor-pointer"
              onClick={() => handleNav("/")}
            >
              rePhyl
            </h1>

            {/* Right: icons */}
            <div className="flex items-center gap-5">
              <Search size={18} className="md:hidden text-foreground cursor-pointer" />
              <User size={18} className="text-foreground cursor-pointer" />
              <div className="relative cursor-pointer">
                <ShoppingCart size={18} className="text-foreground" />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </div>
            </div>
          </div>

          {/* Bottom row: horizontal nav links (desktop only) */}
          <div className="hidden md:flex items-center justify-center gap-8 pb-3 -mt-1">
            {NAV_CATEGORIES.map((cat) => (
              <div
                key={cat.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(cat.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => cat.path && handleNav(cat.path)}
                  className={`text-xs font-semibold uppercase tracking-[0.15em] py-2 border-b-2 transition-colors ${
                    activeMenu === cat.label
                      ? "text-foreground border-foreground"
                      : "text-muted-foreground border-transparent hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              </div>
            ))}
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
