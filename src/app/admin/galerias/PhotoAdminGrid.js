"use client";

import { useState } from 'react';
import Image from 'next/image';
import { deletePhoto } from './actions';

export default function PhotoAdminGrid({ initialImages, category }) {
  const [images, setImages] = useState(initialImages);
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (publicId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta foto definitivamente?')) {
      return;
    }
    
    setDeleting(publicId);
    
    const result = await deletePhoto(publicId);
    
    if (result.success) {
      setImages(images.filter(img => img.public_id !== publicId));
    } else {
      alert('Error al eliminar: ' + result.error);
    }
    
    setDeleting(null);
  };

  if (images.length === 0) {
    return <p style={{ color: '#888' }}>No hay fotos en esta galería todavía.</p>;
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
      gap: '1.5rem' 
    }}>
      {images.map((img) => (
        <div key={img.id} style={{ 
          position: 'relative', 
          borderRadius: '8px', 
          overflow: 'hidden', 
          backgroundColor: '#222',
          border: '1px solid #333'
        }}>
          <div style={{ position: 'relative', aspectRatio: '1', width: '100%' }}>
            <Image
              src={img.url}
              alt="Foto de la galería"
              fill
              style={{ objectFit: 'cover' }}
              unoptimized={true}
            />
          </div>
          <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => handleDelete(img.public_id)}
              disabled={deleting === img.public_id}
              style={{
                backgroundColor: deleting === img.public_id ? '#555' : '#ff4a4a',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: deleting === img.public_id ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                width: '100%',
                transition: 'background-color 0.2s'
              }}
            >
              {deleting === img.public_id ? 'Eliminando...' : 'Eliminar Foto'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
