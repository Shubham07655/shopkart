import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import API from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) { setCart(null); setCartCount(0); return; }
    try {
      const res = await API.get('/api/carts/user/cart');
      setCart(res.data);
      setCartCount(res.data?.products?.length || 0);
    } catch {
      setCart(null);
      setCartCount(0);
    }
  }, [isAuthenticated]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addToCart = async (productId, quantity = 1) => {
    const res = await API.post(`/api/carts/products/${productId}/quantity/${quantity}`);
    setCart(res.data);
    setCartCount(res.data?.products?.length || 0);
    return res.data;
  };

  const updateQuantity = async (productId, operation) => {
    const res = await API.put(`/api/cart/products/${productId}/quantity/${operation}`);
    setCart(res.data);
    setCartCount(res.data?.products?.length || 0);
    return res.data;
  };

  const removeFromCart = async (cartId, productId) => {
    await API.delete(`/api/carts/${cartId}/product/${productId}`);
    await fetchCart();
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, fetchCart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
