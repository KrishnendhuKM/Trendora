
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext.jsx';
import { useProducts } from '../context/ProductContext.jsx';
import './Category.css';

function Category() {
  const { category } = useParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  const { products, loading, error } = useProducts();

  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useWishlist();

  const categoryProducts = products.filter(
    (product) => product.category === category
  );

  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'Collection';

  const filteredProducts = categoryProducts
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'low-high') return a.price - b.price;
      if (sortOrder === 'high-low') return b.price - a.price;
      return 0;
    });

  const toggleWishlist = (product) => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  if (loading) {
    return <p className="empty-category">Loading products...</p>;
  }

  if (error) {
    return <p className="empty-category">{error}</p>;
  }

  return (
    <main className="category-page container">
      <div className="category-heading">
        <p className="eyebrow">EXPLORE TRENDORA</p>
        <h1>{categoryName}</h1>
        <p>Discover pieces that express your personal style.</p>
      </div>

      <div className="category-toolbar">
        <span>{filteredProducts.length} Products</span>

        <div className="category-controls">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Default sorting</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Link
              to={`/product/${product._id}`}
              className="product-card"
              key={product._id}
            >
              <div className="product-image">
                <img src={product.image} alt={product.name} />

                {product.badge && (
                  <span className="product-badge">
                    {product.badge}
                  </span>
                )}

                <button
                  type="button"
                  className={`wishlist-button ${
                    isInWishlist(product._id) ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  aria-label="Toggle wishlist"
                >
                  <Heart
                    size={19}
                    fill={
                      isInWishlist(product._id)
                        ? 'currentColor'
                        : 'none'
                    }
                  />
                </button>
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <p>
                  ₹{product.price.toLocaleString('en-IN')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="empty-category">
          No products found. Try another search.
        </p>
      )}
    </main>
  );
}

export default Category;
