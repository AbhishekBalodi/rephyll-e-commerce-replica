import { Search, User, ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  onNavigateHome: () => void;
}

const Navbar = ({ onNavigateHome }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <button
              className="md:hidden text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="hidden md:flex items-center gap-2 text-muted-foreground">
              <Search size={18} />
              <span className="text-sm">Search shop...</span>
            </div>
          </div>

          {/* Center: brand */}
          <h1
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-primary cursor-pointer uppercase"
            onClick={onNavigateHome}
          >
            REPHYLL
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

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-border px-4 py-4 space-y-3 bg-background">
            <a href="#" className="block text-sm font-medium text-foreground">Shop All</a>
            <a href="#" className="block text-sm font-medium text-foreground">Our Story</a>
            <a href="#" className="block text-sm font-medium text-foreground">Contact</a>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
