
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { categoryProducts } from './Category.jsx';
import './ProductDetails.css';
import { useCart } from '../context/CartContext.jsx';

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const allProducts = Object.values(categoryProducts).flat();

  const product = allProducts.find(
    (item) => item.id === Number(id)
  );

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="product-not-found container">
        <h2>Product Not Found</h2>
        <p>Sorry, we couldn't find this product.</p>
        <Link to="/collections">Explore Collections</Link>
      </main>
    );
  }

const handleAddToCart = () => {
  if (!selectedSize) {
    alert('Please select a size before adding to cart.');
    return;
  }

  addToCart(product, selectedSize, quantity);

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
            Discover effortless elegance with this beautiful
            addition to your wardrobe. Designed to bring
            comfort and style to your everyday moments.
          </p>

          <div className="details-option">
            <h3>Select Size</h3>

            <div className="size-options">
              {['S', 'M', 'L', 'XL'].map((size) => (
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
              >
                +
              </button>
            </div>
          </div>

          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
          >
            Add to Cart
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
