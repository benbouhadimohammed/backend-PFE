import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/Home';
import ForumPage from './pages/ForumPage';
import Ads from './pages/ads';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/admindashboard';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Pages avec Navbar + Footer */}
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/forum"    element={<ForumPage />} />
            <Route path="/listings" element={<Ads />} />
          </Route>

          {/* Pages auth (layout propre) */}
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Admin (sans navbar) */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
