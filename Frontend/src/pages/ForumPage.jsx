import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getSujets, rechercherSujets } from '../services/api';
import PostRow from '../components/PostRow';
import PostDetail from '../components/PostDetail';
import CreatePostModal from '../components/CreatePostModal';
import { useAuth } from '../context/AuthContext';

const POSTS_PER_PAGE = 8;

export default function ForumPage() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [sujets, setSujets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filtre, setFiltre] = useState('tous');
  const [selectedId, setSelectedId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const chargerSujets = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = search.trim()
        ? await rechercherSujets(search.trim())
        : await getSujets(filtre === 'ouverts');
      setSujets(data);
      setPage(1);
    } catch {
      setError('Impossible de charger les sujets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { chargerSujets(); }, [filtre]);

  useEffect(() => {
    const timer = setTimeout(() => chargerSujets(), 350);
    return () => clearTimeout(timer);
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(sujets.length / POSTS_PER_PAGE));
  const paginated = sujets.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const handleCreated = (nouveau) => setSujets((prev) => [nouveau, ...prev]);

  const handleDeleted = (id) => {
    setSujets((prev) => prev.filter((s) => s.id_forum !== id));
    setSelectedId(null);
  };

  return (
    <>
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          {selectedId ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PostDetail
                sujetId={selectedId}
                onBack={() => setSelectedId(null)}
                onDeleted={handleDeleted}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Header */}
              <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div className="max-w-2xl">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-6xl font-extrabold tracking-tighter text-[#191c1e] mb-4"
                  >
                    Forum
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="text-[#464554] text-lg max-w-md leading-relaxed"
                  >
                    Échangez avec la communauté, posez vos questions et partagez vos expériences.
                  </motion.p>
                </div>
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => isLoggedIn ? setModalOpen(true) : navigate('/login')}
                  className={`px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 self-start md:self-auto transition-all ${
                    isLoggedIn
                      ? 'btn-primary-gradient text-white shadow-md hover:shadow-lg'
                      : 'border-2 border-[#c7c4d7] text-[#767586] bg-transparent hover:border-[#767586]'
                  }`}
                >
                  <span className="material-symbols-outlined">add_comment</span>
                  Créer un sujet
                </motion.button>
              </header>

              {/* Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Sidebar */}
                <aside className="lg:col-span-3 space-y-6 hidden lg:block">
                  <section className="bg-white p-6 rounded-2xl border border-[#c7c4d7]/20">
                    <h3 className="text-xs uppercase tracking-widest text-[#464554] font-bold mb-4">Filtres</h3>
                    <nav className="flex flex-col gap-1">
                      {[
                        { key: 'tous',    label: 'Tous les sujets', icon: 'all_inclusive' },
                        { key: 'ouverts', label: 'Sujets ouverts',  icon: 'lock_open' },
                      ].map(({ key, label, icon }) => (
                        <button
                          key={key}
                          onClick={() => { setFiltre(key); setSearch(''); }}
                          className={`flex items-center gap-3 p-3 rounded-xl text-sm font-semibold transition-colors text-left ${
                            filtre === key
                              ? 'bg-[#f2f4f6] text-[#4648d4] shadow-sm'
                              : 'text-[#464554] hover:bg-[#f2f4f6]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-xl">{icon}</span>
                          {label}
                          <span className="ml-auto text-xs font-medium text-[#464554]/60">{sujets.length}</span>
                        </button>
                      ))}
                    </nav>
                  </section>

                  <section className="bg-[#e1e0ff]/40 p-6 rounded-2xl">
                    <h3 className="text-sm font-bold text-[#4648d4] mb-2">Règles du forum</h3>
                    <p className="text-xs text-[#464554] leading-relaxed">
                      Restez respectueux et constructif. Tout contenu inapproprié sera supprimé par les administrateurs.
                    </p>
                  </section>
                </aside>

                {/* Main */}
                <div className="lg:col-span-9 space-y-4">
                  {/* Search */}
                  <div className="flex items-center bg-white rounded-2xl p-2 border border-[#c7c4d7]/20 mb-2">
                    <div className="flex-1 flex items-center px-4 gap-3">
                      <span className="material-symbols-outlined text-[#767586]">search</span>
                      <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher un sujet..."
                        className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#767586]/60"
                      />
                      {search && (
                        <button onClick={() => setSearch('')} className="text-[#767586] hover:text-[#191c1e]">
                          <span className="material-symbols-outlined text-base">close</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Posts */}
                  {loading ? (
                    <div className="flex items-center justify-center py-24">
                      <motion.div
                        className="w-10 h-10 rounded-full border-4 border-[#4648d4] border-t-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                    </div>
                  ) : error ? (
                    <p className="text-red-600 text-center py-12">{error}</p>
                  ) : paginated.length === 0 ? (
                    <div className="text-center py-24 text-[#464554]">
                      <span className="material-symbols-outlined text-5xl text-[#c7c4d7] mb-4 block">forum</span>
                      <p className="font-semibold">Aucun sujet trouvé</p>
                      <button
                        onClick={() => isLoggedIn ? setModalOpen(true) : navigate('/login')}
                        className="mt-4 text-sm text-[#4648d4] font-semibold hover:underline"
                      >
                        Soyez le premier à créer un sujet
                      </button>
                    </div>
                  ) : (
                    <AnimatePresence>
                      {paginated.map((post) => (
                        <PostRow
                          key={post.id_forum}
                          post={post}
                          onClick={() => setSelectedId(post.id_forum)}
                        />
                      ))}
                    </AnimatePresence>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav className="flex items-center justify-center gap-3 mt-10">
                      <button
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="w-10 h-10 rounded-full bg-[#f2f4f6] flex items-center justify-center text-[#464554] hover:bg-[#4648d4] hover:text-white transition-all disabled:opacity-40"
                      >
                        <span className="material-symbols-outlined">chevron_left</span>
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <button
                          key={n}
                          onClick={() => setPage(n)}
                          className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                            n === page
                              ? 'bg-[#4648d4] text-white shadow-md'
                              : 'bg-[#f2f4f6] text-[#464554] hover:bg-[#e6e8ea]'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                      <button
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="w-10 h-10 rounded-full bg-[#f2f4f6] flex items-center justify-center text-[#464554] hover:bg-[#4648d4] hover:text-white transition-all disabled:opacity-40"
                      >
                        <span className="material-symbols-outlined">chevron_right</span>
                      </button>
                    </nav>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <CreatePostModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreated={handleCreated}
      />
    </>
  );
}
