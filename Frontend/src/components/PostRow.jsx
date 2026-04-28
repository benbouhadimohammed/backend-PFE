import { motion } from 'framer-motion';
import { timeAgo } from '../utils/timeAgo';

export default function PostRow({ post, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.22 }}
      onClick={onClick}
      className="group bg-white p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col md:flex-row items-start md:items-center gap-6 border border-transparent hover:border-[#c7c4d7]/40"
    >
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#f2f4f6] text-[#464554]">
        <span className="material-symbols-outlined">forum</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          {post.est_ferme && (
            <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 bg-red-100 text-red-600 rounded-full">
              Fermé
            </span>
          )}
          <span className="text-xs text-[#464554]/60 font-medium">{timeAgo(post.date_creation)}</span>
        </div>
        <h2 className="text-lg font-bold text-[#191c1e] group-hover:text-[#4648d4] transition-colors truncate">
          {post.titre}
        </h2>
        <p className="text-[#464554] text-sm mt-1 line-clamp-1">{post.contenu}</p>
      </div>

      <div className="flex items-center gap-6 self-end md:self-auto border-t md:border-t-0 pt-4 md:pt-0 md:pl-6 border-[#c7c4d7]/20">
        <div className="text-center">
          <div className="text-sm font-bold text-[#191c1e]">#{post.id_forum}</div>
          <div className="text-[10px] uppercase text-[#464554] opacity-60">ID</div>
        </div>
        <div className="text-center">
          <span className="material-symbols-outlined text-[#4648d4] text-xl">chevron_right</span>
        </div>
      </div>
    </motion.div>
  );
}
