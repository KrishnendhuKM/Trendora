
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';

import Home from './pages/Home.jsx';
import Collections from './pages/Collections.jsx';
import Category from './pages/Category.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Checkout from './pages/Checkout.jsx';

import CartProvider from './context/CartContext.jsx';
import WishlistProvider from './context/WishlistContext.jsx';
import ProductProvider from './context/ProductContext.jsx';
import AuthProvider from './context/AuthContext.jsx';

function App() {
  return (
    <ProductProvider>
      <WishlistProvider>
        <AuthProvider>
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
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>

              <Footer />
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </WishlistProvider>
    </ProductProvider>
  );
}

export default App;
