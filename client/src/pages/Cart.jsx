
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import './Cart.css';

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <main className="cart-page container">
        <div className="empty-cart">
          <h1>Your Shopping Bag</h1>
          <p>Your bag is currently empty.</p>
          <Link to="/collections" className="continue-shopping">
            Explore Collections
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page container">
      <h1 className="cart-title">Your Shopping Bag</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div
              className="cart-item"
              key={`${item._id}-${item.size}`}
            >
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>
                <p>Size: {item.size}</p>

                <p className="cart-item-price">
                  ₹{item.price.toLocaleString('en-IN')}
                </p>

                <div className="cart-quantity">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.size,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity === 1}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item._id,
                        item.size,
                        item.quantity + 1
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <button
                  className="remove-item"
                  onClick={() =>
                    removeFromCart(item._id, item.size)
                  }
                >
                  Remove
                </button>
              </div>

              <p className="cart-item-subtotal">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </p>
            </div>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>
              {cartTotal >= 1999 ? 'FREE' : 'Calculated at checkout'}
            </span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>

          <button
            className="checkout-button"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>

          <Link to="/collections" className="continue-link">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
