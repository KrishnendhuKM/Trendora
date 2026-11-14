
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext.jsx';
import './Category.css';

export const categoryProducts = {
  dresses: [
    {
      id: 1,
      name: 'Elegant Floral Midi Dress',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700',
      badge: 'NEW',
    },
    {
      id: 2,
      name: 'Classic Evening Dress',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=700',
      badge: 'BESTSELLER',
    },
    {
      id: 3,
      name: 'Summer Casual Dress',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=700',
    },
  ],

  tops: [
    {
      id: 4,
      name: 'Minimal Everyday Top',
      price: 999,
      image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?w=700',
      badge: 'NEW',
    },
    {
      id: 5,
      name: 'Classic White Blouse',
      price: 1299,
      image: 'https://images.unsplash.com/photo-1564257577-6a9c8f3c5b7a?w=700',
    },
    {
      id: 6,
      name: 'Elegant Casual Shirt',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=700',
    },
  ],

  handbags: [
    {
      id: 7,
      name: 'Classic Everyday Handbag',
      price: 2199,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700',
      badge: 'POPULAR',
    },
    {
      id: 8,
      name: 'Minimal Shoulder Bag',
      price: 1899,
      image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=700',
    },
    {
      id: 9,
      name: 'Elegant Mini Bag',
      price: 1599,
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700',
    },
  ],

  footwear: [
    {
      id: 10,
      name: 'Classic Heeled Sandals',
      price: 1799,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700',
      badge: 'NEW',
    },
    {
      id: 11,
      name: 'Everyday Casual Shoes',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700',
    },
    {
      id: 12,
      name: 'Elegant Women Flats',
      price: 1199,
      image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d4a7a6?w=700',
    },
  ],

  watches: [
    {
      id: 13,
      name: 'Minimal Classic Watch',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700',
      badge: 'BESTSELLER',
    },
    {
      id: 14,
      name: 'Elegant Gold Watch',
      price: 3499,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700',
    },
    {
      id: 15,
      name: 'Modern Everyday Watch',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=700',
    },
  ],

  accessories: [
    {
      id: 16,
      name: 'Elegant Jewellery Set',
      price: 899,
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700',
      badge: 'NEW',
    },
    {
      id: 17,
      name: 'Minimal Gold Necklace',
      price: 699,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700',
    },
    {
      id: 18,
      name: 'Classic Fashion Earrings',
      price: 599,
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700',
    },
  ],
};

function Category() {
  const { category } = useParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const products = categoryProducts[category] || [];

  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : 'Collection';

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'low-high') return a.price - b.price;
      if (sortOrder === 'high-low') return b.price - a.price;
      return 0;
    });

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

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
              to={`/product/${product.id}`}
              className="product-card"
              key={product.id}
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
                    isInWishlist(product.id) ? 'active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  aria-label={
                    isInWishlist(product.id)
                      ? 'Remove from wishlist'
                      : 'Add to wishlist'
                  }
                >
                  <Heart
                    size={19}
                    fill={isInWishlist(product.id) ? 'currentColor' : 'none'}
                  />
                </button>
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <p>₹{product.price.toLocaleString('en-IN')}</p>
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
