import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f9fb]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
