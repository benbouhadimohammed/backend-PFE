import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSujet, ajouterCommentaire, supprimerCommentaire, fermerSujet, supprimerSujet } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { timeAgo } from '../utils/timeAgo';

export default function PostDetail({ sujetId, onBack, onDeleted }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [sujet, setSujet] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [contenu, setContenu] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getSujet(sujetId)
      .then(({ data }) => {
        setSujet(data.sujet ?? data);
        setCommentaires(data.commentaires ?? []);
      })
      .catch(() => setError('Impossible de charger ce sujet.'))
      .finally(() => setLoading(false));
  }, [sujetId]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!contenu.trim()) return;
    setSending(true);
    try {
      const { data } = await ajouterCommentaire(sujetId, contenu.trim());
      setCommentaires((prev) => [...prev, data]);
      setContenu('');
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'envoi.");
    } finally {
      setSending(false);
    }
  };

  const handleDeleteComment = async (commentaireId) => {
    try {
      await supprimerCommentaire(sujetId, commentaireId);
      setCommentaires((prev) =>
        prev.map((c) =>
          c.id_commentaire === commentaireId
            ? { ...c, contenu: '[commentaire supprimé]', est_supprime: true }
            : c
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur.');
    }
  };

  const handleFermer = async () => {
    try {
      const { data } = await fermerSujet(sujetId);
      setSujet(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur.');
    }
  };

  const handleSupprimer = async () => {
    if (!window.confirm('Supprimer ce sujet définitivement ?')) return;
    try {
      await supprimerSujet(sujetId);
      onDeleted(sujetId);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <motion.div
          className="w-10 h-10 rounded-full border-4 border-[#4648d4] border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (!sujet) return <p className="text-red-600 p-6">{error}</p>;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30 }}
      transition={{ duration: 0.25 }}
    >
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-[#464554] hover:text-[#4648d4] mb-6 transition-colors"
      >
        <span className="material-symbols-outlined">arrow_back</span>
        Retour aux sujets
      </button>

      {/* Post card */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#c7c4d7]/20 mb-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#e1e0ff] flex items-center justify-center text-[#4648d4] font-bold text-lg">
              {String(sujet.id_user ?? '?').slice(0, 1)}
            </div>
            <div>
              <p className="font-bold text-[#191c1e]">Utilisateur #{sujet.id_user}</p>
              <p className="text-xs text-[#4648d4] font-medium">{timeAgo(sujet.date_creation)}</p>
            </div>
          </div>
          {isAdmin && (
            <div className="flex gap-2">
              {!sujet.est_ferme && (
                <button
                  onClick={handleFermer}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-amber-700 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">lock</span>
                  Fermer
                </button>
              )}
              <button
                onClick={handleSupprimer}
                className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                Supprimer
              </button>
            </div>
          )}
        </div>

        {sujet.est_ferme && (
          <div className="mb-4 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 px-4 py-2 rounded-lg">
            <span className="material-symbols-outlined text-sm">lock</span>
            Ce sujet est fermé — les nouveaux commentaires sont désactivés.
          </div>
        )}

        <h1 className="text-2xl font-extrabold text-[#191c1e] mb-4 leading-tight">{sujet.titre}</h1>
        <p className="text-[#464554] leading-relaxed whitespace-pre-wrap">{sujet.contenu}</p>
      </div>

      {/* Comments */}
      <div className="space-y-4 mb-6">
        <h3 className="text-xs uppercase tracking-widest font-bold text-[#464554]">
          {commentaires.length} commentaire{commentaires.length !== 1 ? 's' : ''}
        </h3>

        <AnimatePresence>
          {commentaires.map((c) => (
            <motion.div
              key={c.id_commentaire}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex gap-4"
            >
              <div className="w-9 h-9 rounded-full bg-[#f2f4f6] flex items-center justify-center text-[#464554] font-bold text-sm flex-shrink-0 mt-1">
                {String(c.id_user ?? '?').slice(0, 1)}
              </div>
              <div className="flex-1 bg-[#f2f4f6] p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-[#191c1e]">Utilisateur #{c.id_user}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#464554]">{timeAgo(c.date_publication)}</span>
                    {!c.est_supprime && (isAdmin || user?.id === c.id_user) && (
                      <button
                        onClick={() => handleDeleteComment(c.id_commentaire)}
                        className="text-[#464554] hover:text-red-500 transition-colors"
                        title="Supprimer"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    )}
                  </div>
                </div>
                <p className={`text-sm ${c.est_supprime ? 'text-[#464554]/50 italic' : 'text-[#464554]'}`}>
                  {c.contenu}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Comment input */}
      {!sujet.est_ferme && (
        <form onSubmit={handleComment} className="flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-sm border border-[#c7c4d7]/20">
          <input
            value={contenu}
            onChange={(e) => setContenu(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-[#191c1e] placeholder:text-[#464554]/50"
          />
          <button
            type="submit"
            disabled={sending || !contenu.trim()}
            className="text-[#4648d4] hover:scale-110 transition-transform disabled:opacity-40"
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      )}

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
    </motion.div>
  );
}
