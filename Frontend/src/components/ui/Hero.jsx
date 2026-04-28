import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, ArrowRight, Sparkles } from 'lucide-react'

const wilayas = [
  'Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Djelfa', 'Sétif', 
  'Sidi Bel Abbès', 'Biskra', 'Tébessa', 'El Oued', 'Skikda', 'Tiaret', 'Béjaïa'
]

function Hero() {
  const navigate = useNavigate()
  const [service, setService] = useState('')
  const [wilaya, setWilaya] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (service) params.set('search', service)
    if (wilaya) params.set('wilaya', wilaya)
    navigate(`/listings?${params.toString()}`)
  }

  return (
    <section className="relative min-h-[90vh] h-full   flex items-center gradient-bg overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200px h-200px bg-linear-to-r from-primary/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-cover bg-center overflow-hidden">
        <img src="/bg-img.jpg"
        className="absolute inset-0 w-full h-full object-cover scale-110 blur-xs "
       ></img>
      </div>
       
        
      <div className="container pt-18 mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6  rounded-full border border-blue-500 bg-primary/10 text-primary text-sm font-medium"
          >
            <Sparkles className="h-4 w-4 text-primary text-blue-600" />
            <span className="text-sm text-white  font-medium text-primary">
              Plateforme de services N°1 en Algérie
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl text-white font-bold text-foreground leading-tight mb-6 text-balance"
          >
            Professional Services{' '}
            <span className="gradient-text">Architected</span>{' '}
            With <span className="gradient-text text-blue-600">Trust</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white text-muted mb-10 max-w-2xl mx-auto text-balance"
          >
           Qualified and verified service providers for all your home maintenance, renovation and repair needs.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-3 p-3 bg-white rounded-3xl shadow-soft-lg border border-border/50 max-w-3xl mx-auto"
          >
            <div className="flex-1 relative shadow-xl rounded-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
              <input
                type="text"
                placeholder="Quel service recherchez-vous?"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-background-secondary rounded-2xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div className="relative md:w-52">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted" />
              <select
                value={wilaya}
                onChange={(e) => setWilaya(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-background-secondary rounded-2xl text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
              >
                <option value="">Toutes les wilayas</option>
                {wilayas.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="btn-primary text-white bg-blue-700 p-2.5 cursor-pointer rounded-full flex items-center justify-center gap-2 md:w-auto"
            >
              <span>Rechercher</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.form>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <button
              onClick={() => navigate('/create')}
              className="btn-secondary bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full flex items-center gap-2"
            >
              Publier une annonce
            </button>
            <button
              onClick={() => navigate('/listings')}
              className="text-muted hover:text-primary text-white bg-indigo-600 hover:bg-indigo-700 p-4 rounded-full font-medium transition-colors duration-200"
            >
              Voir toutes les annonces
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-3 gap-6 mt-16 max-w-lg text-white mx-auto"
          >
            {[
              { value: '5000+', label: 'Prestataires' },
              { value: '12000+', label: 'Annonces' },
              { value: '48', label: 'Wilayas' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
