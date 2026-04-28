import { useState, useEffect } from 'react'

import {getAnnonces}  from '../services/api'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, SlidersHorizontal, ArrowRight, Calendar, Tag } from 'lucide-react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const wilayas = [
  'Alger', 'Oran', 'Constantine', 'Annaba', 'Blida', 'Batna', 'Djelfa', 'Sétif',
  'Sidi Bel Abbès', 'Biskra', 'Tébessa', 'El Oued', 'Skikda', 'Tiaret', 'Béjaïa',
  'Tlemcen', 'Tizi Ouzou', 'Médéa', 'Boumerdès',
]

const typesOptions = [
  'Plomberie', 'Électricité', 'Peinture', 'Maçonnerie', 'Menuiserie', 'Climatisation',
]

const formatPrix = (p) => p >= 1000 ? `${Math.round(p / 1000)}k DZD` : `${p} DZD`

const typeColors = {
  'Plomberie':     'bg-blue-100 text-blue-700',
  'Électricité':   'bg-yellow-100 text-yellow-700',
  'Peinture':      'bg-pink-100 text-pink-700',
  'Maçonnerie':    'bg-purple-100 text-purple-700',
  'Menuiserie':    'bg-green-100 text-green-700',
  'Climatisation': 'bg-cyan-100 text-cyan-700',
}

// ─── Card ─────────────────────────────────────────────────────────────────────

function AnnonceCard({ annonce, index }) {
  const navigate = useNavigate()
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onClick={() => navigate(`/annonces/${annonce.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer group hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={annonce.img} alt={annonce.titre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold tracking-widest text-gray-800 uppercase">
          {annonce.type_travail}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2">{annonce.titre}</h3>
          <span className="text-blue-600 font-bold text-sm whitespace-nowrap">{formatPrix(annonce.prix)}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />{annonce.wilaya}, DZ
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />{annonce.date}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[annonce.type_travail] || 'bg-gray-100 text-gray-600'}`}>
            {annonce.type_travail}
          </span>
          <span className="text-xs font-bold text-blue-600 tracking-wide flex items-center gap-1 group-hover:gap-2 transition-all">
            DÉTAILS <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ selectedWilaya, setSelectedWilaya, selectedTypes, toggleType, priceRange, setPriceRange, onApply }) {
  return (
    <aside className="w-64 shrink-0 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit sticky top-20">
      <div className="flex items-center gap-2 mb-5">
        <SlidersHorizontal className="h-4 w-4 text-blue-600" />
        <span className="font-bold text-gray-900">Filters</span>
      </div>

      {/* Wilaya */}
      <div className="mb-5">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Wilaya</p>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={selectedWilaya}
            onChange={e => setSelectedWilaya(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-800 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
          >
            <option value="">Toutes les wilayas</option>
            {wilayas.map(w => <option key={w}>{w}</option>)}
          </select>
        </div>
      </div>

      {/* Type travail */}
      <div className="mb-5">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Type de travail</p>
        <div className="flex flex-col gap-2">
          {typesOptions.map(type => (
            <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
              <div
                onClick={() => toggleType(type)}
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-150 cursor-pointer
                  ${selectedTypes.includes(type) ? 'bg-blue-600 border-0' : 'bg-gray-100 border-2 border-gray-300'}`}
              >
                {selectedTypes.includes(type) && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Prix */}
      <div className="mb-6">
        <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Prix max</p>
        <input
          type="range" min="0" max="100" value={priceRange}
          onChange={e => setPriceRange(Number(e.target.value))}
          className="w-full accent-blue-600 cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>0 DZD</span>
          <span className="text-blue-600 font-semibold">{priceRange === 100 ? '100k+ DZD' : `${priceRange}k DZD`}</span>
        </div>
      </div>

      <button
        onClick={onApply}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-bold transition-colors duration-200 flex items-center justify-center gap-2"
      >
        Appliquer les filtres
        <ArrowRight className="h-4 w-4" />
      </button>

      <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs text-blue-700 leading-relaxed">
        Besoin d'aide ? Contactez notre équipe support.
      </div>
    </aside>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Annonces() {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Lire les query params venant du Hero search
  const params = new URLSearchParams(location.search)
  const initSearch = params.get('search') || ''
  const initWilaya = params.get('wilaya') || ''

  const [search, setSearch] = useState(initSearch)
  const [selectedWilaya, setSelectedWilaya] = useState(initWilaya)
  const [selectedTypes, setSelectedTypes] = useState([])
  const [priceRange, setPriceRange] = useState(100)
  const [sortBy, setSortBy] = useState('newest')
  const [applied, setApplied] = useState({ wilaya: initWilaya, types: [], price: 100 })

  const toggleType = (t) => setSelectedTypes(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t])
  const applyFilters = () => setApplied({ wilaya: selectedWilaya, types: selectedTypes, price: priceRange })
  const [annonces, setAnnonces] = useState([]); 
  const [loading, setLoading] = useState(true);
  

 useEffect(() => {
  const params = {}

  if (applied.wilaya)       params.wilaya       = applied.wilaya
  if (applied.types.length) params.type_travail = applied.types[0]
  if (applied.price < 100)  params.prix_max     = applied.price * 1000

  getAnnonces(params)
    .then(res => setAnnonces(res.data))
    .catch(err => console.error(err))
    .finally(() => setLoading(false))

}, [applied])


  // Remplace 'filtered' par 'annonces' dans ton return (Map, count, etc.)


 

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Page header — même style que Hero */}
      

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-8 flex gap-6">
        <Sidebar
          selectedWilaya={selectedWilaya} setSelectedWilaya={setSelectedWilaya}
          selectedTypes={selectedTypes} toggleType={toggleType}
          priceRange={priceRange} setPriceRange={setPriceRange}
          onApply={applyFilters}
        />

        <main className="flex-1">
          {/* Top bar */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500">
              <span className="font-bold text-gray-900">{annonces.length}</span> annonce{annonces.length !== 1 ? 's' : ''} trouvée{annonces.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Trier par :</span>
              <select
                value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              >
                <option value="newest">Plus récents</option>
                <option value="price_asc">Prix croissant</option>
                <option value="price_desc">Prix décroissant</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {annonces.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p className="text-lg">Aucune annonce trouvée avec ces filtres.</p>
              <button onClick={() => { setApplied({ wilaya: '', types: [], price: 100 }); setSearch('') }}
                className="mt-4 text-blue-600 text-sm font-medium hover:underline">
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {annonces.map((a, i) => <AnnonceCard key={a.id} annonce={a} index={i} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
