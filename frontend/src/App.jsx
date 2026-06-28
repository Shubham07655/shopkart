import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Addresses from './pages/Addresses';
import SellerDashboard from './pages/seller/SellerDashboard';
import AddProduct from './pages/seller/AddProduct';
import EditProduct from './pages/seller/EditProduct';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageOrders from './pages/admin/ManageOrders';
import ManageCategories from './pages/admin/ManageCategories';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Layout>
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />

              {/* Authenticated Users */}
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />

              {/* Seller Only */}
              <Route path="/seller/dashboard" element={<ProtectedRoute roles={['ROLE_SELLER']}><SellerDashboard /></ProtectedRoute>} />
              <Route path="/seller/products/add" element={<ProtectedRoute roles={['ROLE_SELLER']}><AddProduct /></ProtectedRoute>} />
              <Route path="/seller/products/edit/:id" element={<ProtectedRoute roles={['ROLE_SELLER']}><EditProduct /></ProtectedRoute>} />

              {/* Admin Only */}
              <Route path="/admin/dashboard" element={<ProtectedRoute roles={['ROLE_ADMIN']}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/orders" element={<ProtectedRoute roles={['ROLE_ADMIN']}><ManageOrders /></ProtectedRoute>} />
              <Route path="/admin/categories" element={<ProtectedRoute roles={['ROLE_ADMIN']}><ManageCategories /></ProtectedRoute>} />
            </Routes>
          </Layout>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
