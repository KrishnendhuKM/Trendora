
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();

  const { products, loading, error } = useProducts();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (item) => item._id === id
  );

  if (loading) {
    return <p className="container">Loading product...</p>;
  }

  if (error) {
    return <p className="container">{error}</p>;
  }

  if (!product) {
    return (
      <main className="product-not-found container">
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find this product.</p>
        <Link to="/collections">Explore Collections</Link>
      </main>
    );
  }

  const sizes = product.sizes || [];

  const handleAddToCart = () => {
    if (sizes.length > 0 && !selectedSize) {
      alert('Please select a size before adding to cart.');
      return;
    }

    addToCart(product, selectedSize || 'One Size', quantity);

    alert(`${product.name} added to cart!`);
  };

  return (
    <main className="product-details-page container">

      <div className="product-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/collections">Collections</Link>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <div className="product-details-layout">

        <div className="product-details-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-details-info">

          {product.badge && (
            <span className="details-badge">
              {product.badge}
            </span>
          )}

          <h1>{product.name}</h1>

          <p className="details-price">
            ₹{product.price.toLocaleString('en-IN')}
          </p>

          <p className="details-description">
            {product.description ||
              'Discover effortless elegance with this beautiful addition to your wardrobe. Designed to bring comfort and style to your everyday moments.'}
          </p>

          {sizes.length > 0 && (
            <div className="details-option">
              <h3>Select Size</h3>

              <div className="size-options">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={
                      selectedSize === size ? 'size-selected' : ''
                    }
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="details-option">
            <h3>Quantity</h3>

            <div className="quantity-selector">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity === 1}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>

          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
            disabled={product.stock < 1}
          >
            {product.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
          </button>

          <p className="details-shipping">
            Free shipping on orders above ₹1,999
          </p>

        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
