
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main container">

        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            TRENDORA<span>.</span>
          </Link>

          <p>
            Discover timeless styles and thoughtfully
            curated fashion pieces designed to make
            every moment feel special.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>

            <a
              href="https://www.pinterest.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Pinterest"
            >
              Pinterest
            </a>

            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h3>SHOP</h3>

          <Link to="/collections">All Collections</Link>
          <Link to="/category/dresses">Dresses</Link>
          <Link to="/category/handbags">Handbags</Link>
          <Link to="/category/footwear">Footwear</Link>
          <Link to="/category/accessories">Accessories</Link>
        </div>

        <div className="footer-column">
          <h3>YOUR ACCOUNT</h3>

          <Link to="/login">Login</Link>
          <Link to="/register">Create Account</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Shopping Bag</Link>
        </div>

        <div className="footer-column">
          <h3>NEED HELP?</h3>

          <p>We're here to help with your shopping experience.</p>
          <span>Customer Support</span>
          <span>Shipping Information</span>
          <span>Returns & Exchanges</span>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <p>
            © {new Date().getFullYear()} TRENDORA. All rights reserved.
          </p>

          <p>Designed with care for everyday elegance.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
