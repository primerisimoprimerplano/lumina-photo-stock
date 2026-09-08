import { v2 as cloudinary } from 'cloudinary';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const publicId = resolvedParams.id.join('/'); // "lumina/naturaleza/filename"
  
  const cleanSmallUrl = cloudinary.url(publicId, {
    secure: true,
    transformation: [
      { width: 1200, crop: "limit" } // Reducida de tamaño sin marca de agua
    ]
  });

  return {
    title: `Fotografía Premium - Lumina Photo Stock`,
    description: `Descubre esta y otras fotografías premium libres de derechos en Lumina Photo Stock.`,
    openGraph: {
      title: `Fotografía Premium - Lumina Photo Stock`,
      description: `Descubre esta fotografía en Lumina Photo Stock.`,
      images: [
        {
          url: cleanSmallUrl,
          width: 1200,
          alt: 'Fotografía Premium'
        }
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Fotografía Premium - Lumina Photo Stock`,
      description: `Descubre esta fotografía en Lumina Photo Stock.`,
      images: [cleanSmallUrl],
    }
  };
}

export default async function PhotoLandingPage({ params }) {
  const resolvedParams = await params;
  const publicId = resolvedParams.id.join('/');
  const categoryId = resolvedParams.id[1]; // Since format is lumina/[category]/[filename]

  const cleanSmallUrl = cloudinary.url(publicId, {
    secure: true,
    transformation: [
      { width: 1200, crop: "limit" }
    ]
  });

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#0a0a0a' }}>
      <h1 style={{ color: 'var(--accent)', marginBottom: '2rem', textAlign: 'center' }}>Fotografía Premium</h1>
      
      <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        {/* Usamos img tag simple para que no dependa de config de Next Image en esta landing */}
        <img 
          src={cleanSmallUrl} 
          alt="Fotografía Premium" 
          style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', pointerEvents: 'none', userSelect: 'none' }} 
        />
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.2rem' }}>
          Adquiere esta fotografía y muchas más sin marca de agua en nuestra colección completa.
        </p>
        <Link 
          href={`/tema/${categoryId}`} 
          style={{ 
            display: 'inline-block',
            padding: '1rem 2.5rem', 
            background: 'var(--accent)', 
            color: 'black', 
            fontWeight: 'bold', 
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '1.2rem',
            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
            transition: 'transform 0.2s'
          }}
        >
          Ver en la Galería
        </Link>
      </div>
    </main>
  );
}
