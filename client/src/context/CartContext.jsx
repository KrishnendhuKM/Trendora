
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('trendora-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Unable to load cart:', error);
      return [];
    }
  });

  // Save cart whenever items change
  useEffect(() => {
    localStorage.setItem(
      'trendora-cart',
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // Add product to cart
  const addToCart = (product, size, quantity) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item._id === product._id && item.size === size
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { ...product, size, quantity }];
    });
  };

  // Remove product from cart
  const removeFromCart = (productId, size) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => !(item._id === productId && item.size === size)
      )
    );
  };

  // Update product quantity
  const updateQuantity = (productId, size, quantity) => {
    if (quantity < 1) return;

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item._id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Calculate total cart items
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate total cart price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Clear cart after successful order
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
