import Link from 'next/link';
import CartIcon from "../../components/CartIcon";
import CartSidebar from "../../components/CartSidebar";
import SecretAdminTrigger from "../../components/SecretAdminTrigger";
import { supabase } from '../../lib/supabase';

import TrustBadges from "../../components/TrustBadges";

export const dynamic = 'force-dynamic';

export default async function PublicLayout({ children }) {
  const { data: galleries } = await supabase
    .from('categories')
    .select('*')
    .order('title');

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">
          <Link href="/">
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
              <div><span style={{ color: 'var(--accent)', fontWeight: '600' }}>LUMINA</span> <span style={{ color: '#fff', fontWeight: '200' }}>PHOTO STOCK</span></div>
              <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', letterSpacing: '2px', textTransform: 'uppercase' }}>Empowering your creative vision</span>
            </div>
          </Link>
        </div>
        <div className="nav-links">
          {galleries && galleries.map(g => (
            <Link key={g.id} href={`/tema/${g.id}`} className="nav-link">{g.title}</Link>
          ))}
          <Link href="/blog" className="nav-link" style={{ color: 'var(--accent)' }}>Blog</Link>
        </div>
        <div className="nav-contact" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <CartIcon />
          <Link href="/contacto" className="btn-contact">Contacto</Link>
        </div>
      </nav>
      
      <CartSidebar />
      
      {children}

      <TrustBadges />

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>LUMINA PHOTO STOCK</h3>
            <p>La colección definitiva de fotografías premium para profesionales creativos.</p>
          </div>
          <div className="footer-section">
            <h4>LEGALES</h4>
            <Link href="#">Licencias y Uso</Link>
            <Link href="#">Términos y Condiciones</Link>
            <Link href="#">Privacidad</Link>
          </div>
          <div className="footer-section">
            <h4>SOPORTE</h4>
            <p>Email: hola@luminastock.com</p>
            <p>República Dominicana</p>
          </div>
        </div>
        <div className="footer-bottom">
          <SecretAdminTrigger />
        </div>
      </footer>
    </>
  );
}
