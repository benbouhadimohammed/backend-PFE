import { motion } from 'framer-motion';

const CTA = () => {
  return (
    <div className="flex justify-center px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ scale: 1.02 }}
        className="bg-linear-to-br from-indigo-500 via-blue-500 to-gray-700 rounded-3xl px-10 py-10 flex items-center justify-between flex-wrap gap-8 max-w-5xl h-full w-full"
      >
        <div>
          <h2 className="text-3xl font-bold text-white leading-tight">
            Ready to architect your <br /> next success?
          </h2>
          <p className="text-white/85 mt-2 text-sm">
            Join the most trusted ecosystem for services in the region today.
          </p>
        </div>
        <div className="flex gap-4 flex-wrap">
          
          <motion.a
            href='/create'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors"
          >
            Post a Listing
          </motion.a>
          <motion.a
            href='/listings'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white/15 text-white border-2 border-white/40 font-semibold px-6 py-3 rounded-full hover:bg-white/25 transition-colors"
          >
            Browse
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default CTA;