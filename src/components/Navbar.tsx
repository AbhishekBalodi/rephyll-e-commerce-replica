import { Search, User, ShoppingCart, Menu, X, ChevronRight } from "lucide-react";
import { useState } from "react";
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

const Navbar = () => {
  const navigate = useNavigate();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  const handleNav = (path: string) => {
    setSheetOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top announcement bar */}
      <div className="w-full bg-primary text-primary-foreground text-center py-2 text-sm font-medium tracking-wide">
        5L CANS STARTING AT ₹799
      </div>

      {/* Main navbar */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Left: hamburger + search */}
          <div className="flex items-center gap-4">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <button className="text-foreground">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetHeader className="p-6 pb-4 border-b border-border">
                  <SheetTitle className="text-2xl font-extrabold text-primary tracking-tight">
                    rePhyl
                  </SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  {/* Products */}
                  <button
                    onClick={() => handleNav("/")}
                    className="flex items-center justify-between w-full px-6 py-3 text-left text-base font-semibold text-foreground hover:bg-accent/50 transition-colors"
                  >
                    <span>Products</span>
                    <ChevronRight size={18} className="text-muted-foreground" />
                  </button>

                  {/* Our Company - collapsible */}
                  <Collapsible open={companyOpen} onOpenChange={setCompanyOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full px-6 py-3 text-left text-base font-semibold text-foreground hover:bg-accent/50 transition-colors">
                      <span>Our Company</span>
                      <ChevronRight
                        size={18}
                        className={`text-muted-foreground transition-transform ${companyOpen ? "rotate-90" : ""}`}
                      />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="bg-accent/10">
                        {[
                          { label: "About Us", path: "/about" },
                          { label: "FAQs", path: "/faqs" },
                          { label: "Contact Us", path: "/contact" },
                          { label: "Terms of Service", path: "/terms" },
                        ].map((item) => (
                          <button
                            key={item.path}
                            onClick={() => handleNav(item.path)}
                            className="block w-full text-left pl-10 pr-6 py-2.5 text-sm font-medium text-foreground hover:bg-accent/30 transition-colors"
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
              <Search size={18} />
              <span className="text-sm">Search shop...</span>
            </div>
          </div>

          {/* Center: brand */}
          <h1
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary cursor-pointer"
            onClick={() => handleNav("/")}
          >
            rePhyl
          </h1>

          {/* Right: icons */}
          <div className="flex items-center gap-4">
            <Search size={20} className="md:hidden text-foreground cursor-pointer" />
            <User size={20} className="text-foreground cursor-pointer" />
            <div className="relative cursor-pointer">
              <ShoppingCart size={20} className="text-foreground" />
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                0
              </span>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
