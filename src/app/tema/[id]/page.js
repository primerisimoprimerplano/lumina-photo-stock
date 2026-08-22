import Link from 'next/link';
import GalleryClient from '@/components/GalleryClient';
import { v2 as cloudinary } from 'cloudinary';

export const dynamic = 'force-dynamic'; // We still want this to be dynamic to fetch latest images

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});

// Mapping for Cloudinary folders
const categoryToFolder = {
  'arquitectura': 'lumina/arquitectura',
  'naturaleza': 'lumina/naturaleza', 
  'abstracto': 'lumina/abstracto',
  'gastronomia': 'lumina/gastronomia',
  'retratos': 'lumina/retratos',
  'viajes': 'lumina/viajes',
  'tecnologia': 'lumina/tecnologia',
  'deportes': 'lumina/deportes',
  'fauna': 'lumina/fauna'
};

const categoryTitles = {
  'arquitectura': 'Arquitectura',
  'naturaleza': 'Naturaleza',
  'abstracto': 'Abstracto',
  'gastronomia': 'Gastronomía',
  'retratos': 'Retratos',
  'viajes': 'Viajes',
  'tecnologia': 'Tecnología',
  'deportes': 'Deportes',
  'fauna': 'Fauna'
};

export default async function GalleryPage({ params }) {
  const { id } = await params;
  const folderName = categoryToFolder[id];
  const title = categoryTitles[id] || id.toUpperCase();
  
  let images = [];

  if (folderName) {
    try {
      console.log("Consultando Cloudinary para la carpeta:", folderName);
      
      // Fetch resources from the specific folder in Cloudinary
      const { resources } = await cloudinary.api.resources({
        type: 'upload',
        prefix: folderName + '/',
        max_results: 500
      });
      
      console.log(`Encontrados ${resources.length} archivos en la nube.`);
      
      images = resources.map(res => ({
        name: res.public_id.split('/').pop() + '.' + res.format,
        path: res.secure_url
      }));

    } catch (e) {
      console.error("Error consultando Cloudinary:", e);
    }
  }

  return (
    <main>
      <header className="header" style={{ padding: '2rem' }}>
        <h1>{title}</h1>
        <p>EXPLORA LA COLECCIÓN EN LA NUBE</p>
        <Link href="/" style={{ color: 'var(--accent)', marginTop: '1rem', display: 'inline-block', borderBottom: '1px solid' }}>
          &larr; Volver a Galerías
        </Link>
      </header>

      {images.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <p>No se encontraron fotografías en la nube para {title}.</p>
        </div>
      ) : (
        <GalleryClient images={images} />
      )}
    </main>
  );
}
