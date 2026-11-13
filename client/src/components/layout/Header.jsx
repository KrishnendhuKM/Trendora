
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="announcement-bar">
        Free shipping on orders above ₹1,999
      </div>

      <div className="header-main container">
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <Link to="/" className="brand-logo">
          TRENDORA<span>.</span>
        </Link>

        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#collections" onClick={closeMenu}>Collections</a>
          <a href="#new-arrivals" onClick={closeMenu}>New Arrivals</a>
          <a href="#best-sellers" onClick={closeMenu}>Best Sellers</a>
          <a href="#sale" onClick={closeMenu}>Sale</a>
        </nav>

        <div className="header-actions">
          <button aria-label="Search">
            <Search size={20} />
          </button>
          <button aria-label="Wishlist">
            <Heart size={20} />
          </button>
          <button aria-label="Shopping bag">
            <ShoppingBag size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
