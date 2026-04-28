import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const { data } = await login(email, password);
      loginUser(data.token, data.user);
      if (data.user?.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch {
      setError('Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl mx-auto px-6 md:px-12 items-center gap-12 relative z-10">

        {/* Left — image + titre */}
        <div className="hidden md:flex flex-col space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              Architectural integrity in <br />
              <span className="text-indigo-600">digital services.</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Experience a curated environment built for precision, clarity, and authoritative performance.
            </p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white/50">
            <img src="/bg-img.jpg" alt="TrustServ" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Right — formulaire */}
        <div className="flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative w-full max-w-md"
          >
            <div className="bg-white/80 backdrop-blur-md border border-white rounded-3xl shadow-xl shadow-indigo-100/50 p-8 md:p-10">

              <motion.div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-indigo-500 to-blue-500 mb-4 shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome Back To Trust<span className="text-blue-600">Serv</span>
                </h1>
                <p className="text-sm text-gray-500 mt-1">Connectez-vous à votre compte</p>
              </motion.div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="vous@exemple.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                    <a href="#" className="text-xs text-indigo-500 font-medium hover:underline">Mot de passe oublié ?</a>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-linear-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg mt-2 disabled:opacity-60"
                >
                  {loading ? 'Connexion...' : 'Se connecter'}
                </motion.button>
              </div>

              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">ou</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <p className="text-center text-sm text-gray-500">
                Pas encore de compte ?{' '}
                <Link to="/register" className="text-indigo-500 font-semibold hover:underline">S'inscrire</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
