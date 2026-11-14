
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header.jsx';

import Home from './pages/Home.jsx';
import Collections from './pages/Collections.jsx';
import Category from './pages/Category.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';

import CartProvider from './context/CartContext.jsx';
import WishlistProvider from './context/WishlistContext.jsx';
import Wishlist from './pages/Wishlist.jsx';

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </WishlistProvider>
  );
}

export default App;
