
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import API from '../services/api';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data.products);
      } catch (error) {
        setError('Unable to load products.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, loading, error }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
