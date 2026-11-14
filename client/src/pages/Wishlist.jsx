
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext.jsx';
import { Heart, Trash2 } from 'lucide-react';

import './Wishlist.css';

function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();

  return (
    <main className="wishlist-page container">
      <div className="wishlist-heading">
        <h1>My Wishlist</h1>
        <p>Your favourite pieces, all in one place.</p>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <Heart size={42} strokeWidth={1.2} />

          <h2>Your wishlist is empty</h2>

          <p>
            Save the pieces you love and come back to them anytime.
          </p>

          <Link to="/collections" className="wishlist-shop-button">
            Explore Collections
          </Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map((product) => (
            <div className="wishlist-card" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <div className="wishlist-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </Link>

              <div className="wishlist-card-info">
                <div>
                  <h3>{product.name}</h3>

                  <p>
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                </div>

                <button
                  className="wishlist-remove"
                  onClick={() => removeFromWishlist(product.id)}
                  aria-label={`Remove ${product.name} from wishlist`}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Wishlist;
