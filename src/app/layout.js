import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import CartIcon from "../components/CartIcon";
import CartSidebar from "../components/CartSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lumina Photo Stock | Premium Photography",
  description: "Exclusiva colección de fotografías premium de stock para creadores y marcas.",
};

export default function RootLayout({ children }) {
  const galleries = [
    { id: 'arquitectura', title: 'Arquitectura' },
    { id: 'naturaleza', title: 'Naturaleza' },
    { id: 'abstracto', title: 'Abstracto' },
    { id: 'gastronomia', title: 'Gastronomía' },
    { id: 'retratos', title: 'Retratos' },
    { id: 'viajes', title: 'Viajes' },
    { id: 'tecnologia', title: 'Tecnología' },
    { id: 'deportes', title: 'Deportes' },
    { id: 'fauna', title: 'Fauna' }
  ];

  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <CartProvider>
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
              {galleries.map(g => (
                <Link key={g.id} href={`/tema/${g.id}`} className="nav-link">{g.title}</Link>
              ))}
            </div>
            <div className="nav-contact" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <CartIcon />
              <Link href="/contacto" className="btn-contact">Contacto</Link>
            </div>
          </nav>
          
          <CartSidebar />
          
          {children}

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
              <p>&copy; {new Date().getFullYear()} Lumina Photo Stock. Todos los derechos reservados.</p>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
