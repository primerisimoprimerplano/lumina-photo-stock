import '../globals.css';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0a0a0a', color: 'white' }}>
      {/* Admin Sidebar */}
      <aside style={{ width: '250px', backgroundColor: '#111', borderRight: '1px solid #333', padding: '2rem 1rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: '3rem', paddingLeft: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', margin: 0, color: '#d4af37', letterSpacing: '1px' }}>LUMINA</h2>
          <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '2px' }}>Admin Panel</span>
        </div>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link href="/admin" style={{ padding: '0.8rem 1rem', borderRadius: '6px', color: 'white', textDecoration: 'none', transition: 'background 0.2s' }} className="admin-nav-link">
            📊 Dashboard
          </Link>
          <Link href="/admin/galerias" style={{ padding: '0.8rem 1rem', borderRadius: '6px', color: 'white', textDecoration: 'none', transition: 'background 0.2s' }} className="admin-nav-link">
            🖼️ Galerías
          </Link>
          <Link href="/admin/blog" style={{ padding: '0.8rem 1rem', borderRadius: '6px', color: 'white', textDecoration: 'none', transition: 'background 0.2s' }} className="admin-nav-link">
            📰 Noticias
          </Link>
        </nav>
        
        <div style={{ marginTop: 'auto', paddingLeft: '1rem' }}>
          <Link href="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Volver a la Tienda
          </Link>
        </div>
      </aside>

      {/* Admin Content */}
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        {children}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .admin-nav-link:hover {
          background-color: #222;
        }
      `}} />
    </div>
  );
}
