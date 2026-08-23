import { v2 as cloudinary } from 'cloudinary';
import PhotoAdminGrid from './PhotoAdminGrid';

export const revalidate = 0; // Disable caching

export default async function AdminGalerias({ searchParams }) {
  const selectedCategory = searchParams.category || 'naturaleza';
  
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

  let images = [];
  
  try {
    const result = await cloudinary.search
      .expression(`folder:lumina/${selectedCategory}`)
      .sort_by('public_id', 'desc')
      .max_results(50)
      .execute();
      
    images = result.resources.map(file => ({
      id: file.public_id,
      public_id: file.public_id,
      path: file.public_id,
      width: file.width,
      height: file.height,
      url: file.secure_url
    }));
  } catch (error) {
    console.error('Error fetching from Cloudinary in Admin:', error);
  }

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', margin: '0 0 2rem 0', color: '#fff' }}>Gestión de Galerías</h1>
      
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {galleries.map(g => (
          <a 
            key={g.id} 
            href={`/admin/galerias?category=${g.id}`}
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: selectedCategory === g.id ? '#d4af37' : '#1a1a1a', 
              color: selectedCategory === g.id ? 'black' : 'white',
              border: '1px solid #333',
              borderRadius: '20px',
              textDecoration: 'none',
              fontWeight: selectedCategory === g.id ? 'bold' : 'normal'
            }}
          >
            {g.title}
          </a>
        ))}
      </div>

      <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px', border: '1px solid #333' }}>
        <h2 style={{ marginTop: 0, color: '#d4af37' }}>Fotos en {galleries.find(g => g.id === selectedCategory)?.title}</h2>
        <p style={{ color: '#888', marginBottom: '2rem' }}>
          Aquí puedes eliminar las fotos que ya no desees mostrar. Para subir nuevas fotos, usa tu panel de Cloudinary.
        </p>
        
        <PhotoAdminGrid initialImages={images} category={selectedCategory} />
      </div>
    </div>
  );
}
