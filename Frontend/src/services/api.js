import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ──────────────────────────────────────────────────────
export const register = (nom, email, password, type_user) =>
  api.post('/auth/register', { nom, email, password, type_user });

export const login = (email, password) =>
  api.post('/auth/login', { email, password });

// ── Annonces ──────────────────────────────────────────────────
export const getAnnonces = (params) =>
  api.get('/annonces/listerAnnonces', { params });

// ── Forum ─────────────────────────────────────────────────────
export const getSujets = (ouvertsUniquement = false) =>
  api.get('/forum', { params: ouvertsUniquement ? { ouverts: 'true' } : {} });

export const rechercherSujets = (q) =>
  api.get('/forum/recherche', { params: { q } });

export const getSujet = (id) => api.get(`/forum/${id}`);

export const creerSujet = (titre, contenu) =>
  api.post('/forum', { titre, contenu });

export const fermerSujet = (id) => api.patch(`/forum/${id}/fermer`);

export const supprimerSujet = (id) => api.delete(`/forum/${id}`);

export const ajouterCommentaire = (sujetId, contenu) =>
  api.post(`/forum/${sujetId}/commentaires`, { contenu });

export const supprimerCommentaire = (sujetId, commentaireId) =>
  api.delete(`/forum/${sujetId}/commentaires/${commentaireId}`);

export default api;
