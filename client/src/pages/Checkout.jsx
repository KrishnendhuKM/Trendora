
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import API from '../services/api';
import './Checkout.css';

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const orderItems = cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        size: item.size || '',
      }));

      const response = await API.post('/orders', {
        items: orderItems,
        shippingAddress: formData,
      });

      clearCart();

      navigate('/order-success', {
        state: { order: response.data.order },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Unable to place your order. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <Link to="/collections">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <section className="checkout-page container">
      <div className="checkout-heading">
        <span>YOUR SHOPPING BAG</span>
        <h1>Checkout</h1>
        <p>Complete your details to place your order.</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Delivery Information</h2>

          <label>Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Delivery Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <div className="checkout-form-row">
            <div>
              <label>City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>State</label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label>Postal Code</label>
          <input
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
          />

          <div className="checkout-payment">
            <h3>Payment Method</h3>
            <p>Cash on Delivery (COD)</p>
            <span>Pay when your order arrives.</span>
          </div>

          {error && <p className="checkout-error">{error}</p>}

          <button
            type="submit"
            className="place-order-button"
            disabled={loading}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div className="checkout-summary-item" key={item._id}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}

          <div className="checkout-total">
            <span>Total</span>
            <strong>
              ₹{cartTotal.toLocaleString('en-IN')}
            </strong>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
