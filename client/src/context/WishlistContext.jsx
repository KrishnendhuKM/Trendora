
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

function WishlistProvider({ children }) {
  // Load saved wishlist
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem('trendora-wishlist');

      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error('Unable to load wishlist:', error);
      return [];
    }
  });

  // Save wishlist whenever it changes
  useEffect(() => {
    localStorage.setItem(
      'trendora-wishlist',
      JSON.stringify(wishlistItems)
    );
  }, [wishlistItems]);

  // Add product to wishlist
  const addToWishlist = (product) => {
    setWishlistItems((currentItems) => {
      const alreadyExists = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) return currentItems;

      return [...currentItems, product];
    });
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  // Check whether product is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
