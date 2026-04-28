import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import {
  LayoutDashboard,
  ListOrdered,
  Users,
  BarChart3,
  LogOut,
  Search,
  Bell,
  Menu,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
  Plus,
} from "lucide-react";
import clsx from "clsx";

const SidebarItem = ({ icon: Icon, label, active, collapsed, onClick }) => (
  <motion.li
    onClick={onClick}
    whileHover={{ x: 5 }}
    className={clsx(
      "flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-colors duration-200",
      active
        ? "bg-indigo-500/10 text-indigo-400"
        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200",
    )}
  >
    <Icon
      size={22}
      className={clsx(
        "shrink-0",
        active ? "text-indigo-400" : "text-slate-400",
      )}
    />
    <AnimatePresence>
      {!collapsed && (
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "auto" }}
          exit={{ opacity: 0, width: 0 }}
          className="font-medium whitespace-nowrap overflow-hidden"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  </motion.li>
);

export default function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [ads, setAds] = useState([]);
  const [posts, setPosts] = useState([]);

  
  useEffect(() => {
    api
      .get("/admin/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to fetch stats:", err));
    api
      .get("/admin/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
    api
      .get("/admin/annonces")
      .then((res) => setAds(res.data))
      .catch((err) => console.error("Failed to fetch ads:", err));
    api
      .get("/admin/forum")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  
    const statscards = [
    { title: 'Total Annonces', value: stats.annonces, icon: ListOrdered, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { title: 'Forum Posts',    value: stats.posts,    icon: FileText,     color: 'text-amber-400',  bg: 'bg-amber-400/10'  },
    { title: 'Utilisateurs',   value: stats.users,    icon: Users,        color: 'text-emerald-400',bg: 'bg-emerald-400/10'},
  ];

  const handleDeleteAd = async (id) => {
    await api.delete(`/admin/annonces/${id}`);
    setAds(ads.filter((ad) => ad.id !== id));
  };

  

  const handleDeletePost = async (id) => {
    await api.delete(`/admin/forum/${id}`);
    setPosts(posts.filter((forum) => forum.id !== id));
  };

  const handleDeleteUser = async (id) => {
    await api.delete(`/admin/users/${id}`);
    setUsers(users.filter((u) => u.id !== id));
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  
  
 

 

  const renderContent = () => {
    if (activeTab === "Dashboard") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Overview
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Welcome back, monitor your platform metrics here.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statscards.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-slate-800/40 border border-slate-700/60 rounded-2xl p-6 shadow-xl shadow-black/10 backdrop-blur-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-bold text-white mt-2 tracking-tight">
                      {stat.value}
                    </h3>
                  </div>
                  <div
                    className={clsx(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      stat.bg,
                    )}
                  >
                    <stat.icon size={24} className={stat.color} />
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs font-medium">
                  <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                    +12%
                  </span>
                  <span className="text-slate-500">from last month</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm p-6">
            <h2 className="text-lg font-semibold text-white tracking-tight mb-4">
              Quick Stats Overview
            </h2>
            <div className="h-64 flex items-end gap-4">
              {/* Fake chart bars */}
              {[40, 70, 45, 90, 65, 85, 120].map((h, idx) => (
                <div
                  key={idx}
                  className="flex-1 bg-indigo-500/20 rounded-t-md relative group hover:bg-indigo-500/40 transition-colors"
                  style={{ height: `${h}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {h * 10}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }

   
        if (activeTab === 'Ads Management') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestion des Annonces</h1>
            <p className="text-slate-400 text-sm mt-1">Gérez et supprimez les annonces.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl overflow-hidden backdrop-blur-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Titre</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Wilaya</th>
                  <th className="px-6 py-4">Prix</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {ads.map((ad) => (
                  <tr key={ad.id_annonces} className="hover:bg-slate-800/60 transition-colors">
                    <td className="px-6 py-4 text-slate-200 font-medium">{ad.titre}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{ad.type_travail}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{ad.wilaya}</td>
                    <td className="px-6 py-4 text-indigo-300 font-medium">{ad.prix} DA</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {new Date(ad.date_publication).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteAd(ad.id_annonce)}
                        className="text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-rose-400/10"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {ads.length === 0 && (
                  <tr><td colSpan="6" className="px-6 py-8 text-center text-slate-400">Aucune annonce.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      );
    }
                 
       

    if (activeTab === 'Posts Management') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestion du Forum</h1>
            <p className="text-slate-400 text-sm mt-1">Modérez les discussions.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl overflow-hidden backdrop-blur-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Titre</th>
                  <th className="px-6 py-4">Contenu</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {posts.map((post) => (
                  <tr key={post.id_forum} className="hover:bg-slate-800/60 transition-colors">
                    <td className="px-6 py-4 text-slate-200 font-medium">{post.titre}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm max-w-xs truncate">{post.contenu}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {new Date(post.date_creation).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeletePost(post.id_forum)}
                        className="text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-rose-400/10"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr><td colSpan="4" className="px-6 py-8 text-center text-slate-400">Aucun post.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      );
    }

     if (activeTab === 'User Management') {
      return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestion des Utilisateurs</h1>
            <p className="text-slate-400 text-sm mt-1">Gérez les comptes utilisateurs.</p>
          </div>
          <div className="bg-slate-800/40 border border-slate-700/60 rounded-2xl overflow-hidden backdrop-blur-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4">Nom</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Rôle</th>
                  <th className="px-6 py-4">Date inscription</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {users.map((user) => (
                  <tr key={user.id_user} className="hover:bg-slate-800/60 transition-colors">
                    <td className="px-6 py-4 text-slate-200 font-medium">{user.nom}</td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={clsx(
                        "px-2.5 py-1 rounded-full text-xs font-medium",
                        user.role === 'admin'
                          ? "bg-indigo-500/10 text-indigo-400"
                          : "bg-slate-500/10 text-slate-400"
                      )}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">
                      {new Date(user.date_inscription).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(user.id_user)}
                        className="text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-lg hover:bg-rose-400/10"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-400">Aucun utilisateur.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      );
    }

     return (
      <div className="flex items-center justify-center h-64 text-slate-500">
        Section "{activeTab}" coming soon.
      </div>
    );
  };
  

  return (
    <div className="min-h-screen bg-slate-900 flex overflow-hidden font-sans text-slate-100 selection:bg-indigo-500/30">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className="h-screen bg-slate-900 border-r border-slate-800 flex flex-col relative z-20 shrink-0"
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/20">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-bold text-lg tracking-tight whitespace-nowrap"
                >
                  Admin<span className="text-indigo-400">Pro</span>
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex absolute -right-3 top-5 w-6 h-6 bg-slate-800 border border-slate-700 rounded-full items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight size={14} />
            ) : (
              <ChevronLeft size={14} />
            )}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 py-6 scrollbar-hide">
          <ul className="space-y-2">
            <SidebarItem
              icon={LayoutDashboard}
              label="Dashboard"
              active={activeTab === "Dashboard"}
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab("Dashboard")}
            />
            <SidebarItem
              icon={ListOrdered}
              label="Ads Management"
              active={activeTab === "Ads Management"}
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab("Ads Management")}
            />
            <SidebarItem
              icon={FileText}
              label="Posts Management"
              active={activeTab === "Posts Management"}
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab("Posts Management")}
            />
            <SidebarItem
              icon={Users}
              label="User Management"
              active={activeTab === "User Management"}
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab("User Management")}
            />
            <SidebarItem
              icon={BarChart3}
              label="Statistics"
              active={activeTab === "Statistics"}
              collapsed={sidebarCollapsed}
              onClick={() => setActiveTab("Statistics")}
            />
          </ul>
        </div>

        <div className="p-3 border-t border-slate-800">
          <SidebarItem
            icon={LogOut}
            label="Logout"
            collapsed={sidebarCollapsed}
            onClick={handleLogout}
          />
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-950">
        {/* Header */}
        <header className="h-16 shrink-0 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md flex items-center justify-between px-6 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-slate-400 hover:text-white"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu size={24} />
            </button>
            <div className="relative group hidden sm:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search anything..."
                className="bg-slate-800/50 border border-slate-700 text-sm rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-slate-800">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full animate-pulse border border-slate-900"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient from-indigo-500 to-purple-500 border-2 border-slate-700 shadow-sm shadow-indigo-500/20"></div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
