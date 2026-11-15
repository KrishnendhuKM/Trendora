
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

import './Header.css';

function Header() {
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
    setCollectionsOpen(false);
  };

  const categories = [
    { name: 'Dresses', path: '/category/dresses' },
    { name: 'Tops', path: '/category/tops' },
    { name: 'Handbags', path: '/category/handbags' },
    { name: 'Footwear', path: '/category/footwear' },
    { name: 'Watches', path: '/category/watches' },
    { name: 'Accessories', path: '/category/accessories' },
  ];

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

        <Link to="/" className="brand-logo" onClick={closeMenu}>
          TRENDORA<span>.</span>
        </Link>

        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
          <div className="nav-dropdown">
            <div className="collections-nav">
              <NavLink to="/collections" onClick={closeMenu}>
                Collections
              </NavLink>

              <button
                className="nav-dropdown-toggle"
                onClick={() => setCollectionsOpen(!collectionsOpen)}
                aria-label="Toggle collections categories"
                aria-expanded={collectionsOpen}
              >
                <ChevronDown size={15} />
              </button>
            </div>

            <div
              className={`dropdown-menu ${
                collectionsOpen ? 'dropdown-open' : ''
              }`}
            >
              <NavLink to="/collections" onClick={closeMenu}>
                View All Collections
              </NavLink>

              {categories.map((category) => (
                <NavLink
                  key={category.path}
                  to={category.path}
                  onClick={closeMenu}
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          </div>

          <NavLink to="/new-arrivals" onClick={closeMenu}>
            New Arrivals
          </NavLink>

          <NavLink to="/best-sellers" onClick={closeMenu}>
            Best Sellers
          </NavLink>

          <NavLink to="/sale" onClick={closeMenu}>
            Sale
          </NavLink>
        </nav>

        <div className="header-actions">

          <button aria-label="Search">
            <Search size={20} />
          </button>

          <Link
            to="/wishlist"
            aria-label={`Wishlist, ${wishlistItems.length} items`}
            className="wishlist-link"
          >
            <Heart size={20} />

            {wishlistItems.length > 0 && (
              <span className="wishlist-count">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            aria-label={`Shopping bag, ${cartCount} items`}
            className="cart-link"
          >
            <ShoppingBag size={20} />

            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </Link>

          {user ? (
            <div className="header-user">
              <span>Hi, {user.name}</span>
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <div className="header-auth-links">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}

export default Header;
