import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import Footer from '../components/Footer';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [typeUser, setTypeUser] = useState('client');
  const [form, setForm] = useState({ nom: '', email: '', password: '', confirm: '' });
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) return setError('Les mots de passe ne correspondent pas.');
    if (!terms) return setError("Vous devez accepter les conditions d'utilisation.");
    setLoading(true);
    try {
      await register(form.nom, form.email, form.password, typeUser);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 1800);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création du compte.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb]">
      {/* Header */}
      <header className="bg-[#f7f9fb]/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#c7c4d7]/20">
        <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
          <a href="/" className="text-xl font-extrabold tracking-tighter text-[#4648d4]">TrustServ</a>
          <nav className="hidden md:flex gap-8 items-center">
            {['Support', 'Sécurité', 'Confidentialité'].map((l) => (
              <a key={l} href="#" className="text-slate-500 font-medium hover:text-[#4648d4] transition-colors text-sm">{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-sm font-semibold text-[#4648d4] hover:opacity-80 transition-all">Se connecter</a>
            <button className="btn-primary-gradient text-white px-6 py-2.5 rounded-2xl text-sm font-bold transition-all">
              Commencer
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-xl"
        >
          <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[#c7c4d7]/20 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#e1e0ff] opacity-30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="mb-10">
                <h1 className="text-4xl font-extrabold tracking-tight text-[#191c1e] mb-3">Créer un compte</h1>
                <p className="text-[#464554] text-sm leading-relaxed max-w-md">
                  Rejoignez l'écosystème TrustServ pour accéder aux services ou proposer vos compétences.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Account type */}
                <div className="space-y-3">
                  <label className="text-[#464554] text-xs font-bold tracking-widest uppercase ml-1 block">Type de compte</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { key: 'client',      label: 'Utilisateur',  sub: 'Accéder aux services',  icon: 'person' },
                      { key: 'prestataire', label: 'Prestataire',  sub: 'Proposer des services', icon: 'handyman' },
                    ].map(({ key, label, sub, icon }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setTypeUser(key)}
                        className={`flex flex-col items-start p-4 rounded-2xl text-left transition-all border-2 ${
                          typeUser === key
                            ? 'border-[#4648d4] bg-white ring-2 ring-[#4648d4]/10'
                            : 'border-[#c7c4d7]/30 bg-[#f2f4f6] hover:bg-[#e6e8ea]'
                        }`}
                      >
                        <span className={`material-symbols-outlined mb-2 ${typeUser === key ? 'text-[#4648d4]' : 'text-[#767586]'}`}>
                          {icon}
                        </span>
                        <span className="text-sm font-bold text-[#191c1e]">{label}</span>
                        <span className="text-[10px] text-[#464554]">{sub}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#464554] text-xs font-bold tracking-widest uppercase ml-1 block">Nom complet</label>
                    <input name="nom" value={form.nom} onChange={handleChange} placeholder="Jean Dupont" required
                      className="w-full bg-[#f2f4f6] border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#4648d4]/40 focus:bg-white transition-all placeholder:text-[#767586] outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#464554] text-xs font-bold tracking-widest uppercase ml-1 block">Adresse email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="nom@exemple.com" required
                      className="w-full bg-[#f2f4f6] border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#4648d4]/40 focus:bg-white transition-all placeholder:text-[#767586] outline-none" />
                  </div>
                </div>

                {/* Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#464554] text-xs font-bold tracking-widest uppercase ml-1 block">Mot de passe</label>
                    <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" required
                      className="w-full bg-[#f2f4f6] border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#4648d4]/40 focus:bg-white transition-all placeholder:text-[#767586] outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#464554] text-xs font-bold tracking-widest uppercase ml-1 block">Confirmer</label>
                    <input name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="••••••••" required
                      className="w-full bg-[#f2f4f6] border-0 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-[#4648d4]/40 focus:bg-white transition-all placeholder:text-[#767586] outline-none" />
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 py-2">
                  <input type="checkbox" id="terms" checked={terms} onChange={(e) => setTerms(e.target.checked)}
                    className="mt-1 rounded text-[#4648d4] h-4 w-4 bg-[#f2f4f6] border-0 cursor-pointer" />
                  <label htmlFor="terms" className="text-xs text-[#464554] leading-relaxed cursor-pointer">
                    J'accepte les{' '}
                    <a href="#" className="text-[#4648d4] font-semibold hover:underline">Conditions d'utilisation</a>
                    {' '}et la{' '}
                    <a href="#" className="text-[#4648d4] font-semibold hover:underline">Politique de confidentialité</a>.
                  </label>
                </div>

                {error && (
                  <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                    {error}
                  </motion.p>
                )}
                {success && (
                  <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-green-700 bg-green-50 px-4 py-3 rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    Compte créé avec succès ! Redirection vers la connexion...
                  </motion.p>
                )}

                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  type="submit" disabled={loading || success}
                  className="w-full btn-primary-gradient text-white py-4 rounded-2xl font-bold text-sm tracking-wide shadow-lg shadow-indigo-200 transition-all disabled:opacity-60">
                  {loading ? 'Création en cours...' : 'Créer mon compte'}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-[#464554]">
                  Vous avez déjà un compte ?{' '}
                  <a href="/login" className="text-[#4648d4] font-bold hover:underline ml-1">Se connecter</a>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-10 mt-10 opacity-40">
            {[
              { icon: 'verified_user', label: 'CHIFFREMENT SÉCURISÉ' },
              { icon: 'shield',        label: 'PROTECTION FRAUDE' },
              { icon: 'architecture',  label: 'ARCHITECTURE PRÉCISE' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4648d4]">{icon}</span>
                <span className="text-[10px] font-bold text-[#464554] tracking-tighter">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
