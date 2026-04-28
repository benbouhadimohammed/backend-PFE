import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { creerSujet } from '../services/api';

export default function CreatePostModal({ open, onClose, onCreated }) {
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await creerSujet(titre, contenu);
      onCreated(data);
      setTitre('');
      setContenu('');
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-extrabold text-[#191c1e] tracking-tight">Nouveau sujet</h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[#464554] mb-1 block">Titre</label>
                <input
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="De quoi voulez-vous parler ?"
                  className="w-full border border-[#c7c4d7] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4648d4] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-[#464554] mb-1 block">Contenu</label>
                <textarea
                  value={contenu}
                  onChange={(e) => setContenu(e.target.value)}
                  placeholder="Expliquez votre sujet en détail..."
                  rows={5}
                  className="w-full border border-[#c7c4d7] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#4648d4] transition-colors resize-none"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>
              )}

              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-[#464554] bg-[#f2f4f6] hover:bg-[#e6e8ea] transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary-gradient px-6 py-3 rounded-xl text-sm font-semibold text-white hover:shadow-lg transition-all disabled:opacity-60"
                >
                  {loading ? 'Publication...' : 'Publier'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
