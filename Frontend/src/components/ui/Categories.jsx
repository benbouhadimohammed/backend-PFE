import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Droplets, Zap, Paintbrush, Wind, Hammer, Building2 } from 'lucide-react'

const categories = [
  {
    name: 'Plomberie',
    slug: 'plomberie',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    count: 1240,
  },
  {
    name: 'Électricité',
    slug: 'electricite',
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50',
    count: 980,
  },
  {
    name: 'Peinture',
    slug: 'peinture',
    icon: Paintbrush,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    count: 756,
  },
  {
    name: 'Climatisation',
    slug: 'climatisation',
    icon: Wind,
    color: 'from-cyan-500 to-teal-500',
    bgColor: 'bg-cyan-50',
    count: 654,
  },
  {
    name: 'Menuiserie',
    slug: 'menuiserie',
    icon: Hammer,
    color: 'from-amber-500 to-yellow-600',
    bgColor: 'bg-amber-50',
    count: 543,
  },
  {
    name: 'Rénovation',
    slug: 'renovation',
    icon: Building2,
    color: 'from-primary to-purple-500',
    bgColor: 'bg-primary-light',
    count: 892,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

function Categories() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-medium text-primary mb-3"
          >
            Nos Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance"
          >
            Explorez nos catégories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted max-w-2xl mx-auto"
          >
            Trouvez rapidement le prestataire dont vous avez besoin parmi nos différentes catégories de services.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.slug} variants={itemVariants}>
              <Link
                to={`/listings?type=${category.slug}`}
                className="group block p-6 bg-white rounded-2xl hover:bg-blue-700 border-2 border-border/50 shadow-soft hover:shadow-soft-lg hover:text-amber-50 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-16 h-14 rounded-2xl ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`bg-linear-to-br ${category.color} p-2.5 rounded-xl`}>
                    <category.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                  {category.name}
                </h3>
                <p className="text-sm text-muted">{category.count} annonces</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Categories
