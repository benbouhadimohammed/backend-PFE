import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Wrench } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navLinks = [
  { name: 'Accueil',  path: '/' },
  { name: 'Annonces', path: '/listings' },
  { name: 'Forum',    path: '/forum' },
];

const HIDE_ON = ['/login', '/admin'];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, logoutUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (HIDE_ON.includes(location.pathname)) return null;

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'backdrop-blur-3xl bg-white/80 shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-primary to-blue-500">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${isScrolled ? 'text-foreground' : 'text-white'}`}>
              Trust<span className="text-blue-500">Serv</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-blue-500 font-bold'
                    : isScrolled ? 'text-gray-700 hover:text-blue-500' : 'text-white hover:text-blue-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isScrolled ? 'text-gray-700 hover:text-blue-500' : 'text-white hover:text-blue-200'
                }`}
              >
                Se déconnecter
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isScrolled ? 'text-gray-700 hover:text-blue-500' : 'text-white hover:text-blue-200'
                  }`}
                >
                  Se connecter
                </Link>
                <Link to="/register" className="bg-blue-600 text-white text-sm font-semibold py-2 px-5 rounded-full hover:bg-blue-700 transition-colors">
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-white">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white rounded-xl mt-2 shadow-lg"
            >
              <div className="py-4 px-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
                  {isLoggedIn ? (
                    <button onClick={handleLogout} className="py-2 px-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg text-left">
                      Se déconnecter
                    </button>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)} className="py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                        Se connecter
                      </Link>
                      <Link to="/register" onClick={() => setIsOpen(false)} className="py-2 px-3 text-sm font-semibold text-center bg-blue-600 text-white rounded-lg">
                        S'inscrire
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
