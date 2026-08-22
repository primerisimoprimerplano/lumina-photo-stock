import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import GalleryClient from '../../../components/GalleryClient';

export const dynamic = 'force-dynamic'; // Prevent Next.js from caching the file system read

// Mapeo temporal de categorías a las carpetas en el disco V:
const categoryToFolder = {
  'arquitectura': 'GALERIA 1 ARQUITECTONICOS',
  'naturaleza': 'GALERIA 4\\LUMINA PHOTO STOCK', 
  // Podemos mapear las demás luego...
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
    const absolutePath = path.join('V:\\STOCK PHOTOS', folderName);
    console.log("Intentando leer:", absolutePath);
    try {
      const exists = fs.existsSync(absolutePath);
      console.log("¿Existe la ruta?", exists);
      if (exists) {
        const files = fs.readdirSync(absolutePath);
        console.log(`Encontrados ${files.length} archivos.`);
        // Filtrar solo JPGs
        images = files
          .filter(file => file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg'))
          .map(file => ({
            name: file,
            path: path.join(absolutePath, file)
          }));
      }
    } catch (e) {
      console.error("Error reading directory:", e);
    }
  }

  return (
    <main>
      <header className="header" style={{ padding: '2rem' }}>
        <h1>{title}</h1>
        <p>EXPLORA LA COLECCIÓN</p>
        <Link href="/" style={{ color: 'var(--accent)', marginTop: '1rem', display: 'inline-block', borderBottom: '1px solid' }}>
          &larr; Volver a Galerías
        </Link>
      </header>

      {images.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <p>No se encontraron fotografías en la ruta V:\STOCK PHOTOS\{folderName}</p>
        </div>
      ) : (
        <GalleryClient images={images} />
      )}
    </main>
  );
}
