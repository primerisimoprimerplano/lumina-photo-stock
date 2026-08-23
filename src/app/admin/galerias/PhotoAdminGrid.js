"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { deletePhoto, savePhotoOrder } from './actions';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';

export default function PhotoAdminGrid({ initialImages, category }) {
  const [images, setImages] = useState(initialImages);
  const [deleting, setDeleting] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

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

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setImages(items);
    
    // Guardar en base de datos
    setIsSavingOrder(true);
    const orderedIds = items.map(img => img.public_id);
    await savePhotoOrder(category, orderedIds);
    setIsSavingOrder(false);
  };

  return (
    <>
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <CldUploadWidget 
          uploadPreset="lumina_preset" // Puedes configurar un unsigned preset en Cloudinary o usar signature
          options={{
            folder: `lumina/${category}`,
            tags: [category],
            maxFiles: 10
          }}
          onSuccess={(result) => {
            router.refresh(); // Refrescar la página para ver las nuevas fotos
          }}
        >
          {({ open }) => {
            return (
              <button 
                onClick={() => open()}
                style={{
                  backgroundColor: '#d4af37',
                  color: 'black',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Subir Nuevas Fotos
              </button>
            );
          }}
        </CldUploadWidget>

        {isSavingOrder && <span style={{ color: '#d4af37' }}>Guardando nuevo orden...</span>}
      </div>

      {images.length === 0 ? (
        <p style={{ color: '#888' }}>No hay fotos en esta galería todavía.</p>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="gallery-photos" direction="horizontal">
            {(provided) => (
              <div 
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap',
                  gap: '1.5rem' 
                }}
              >
                {images.map((img, index) => (
                  <Draggable key={img.id} draggableId={img.id} index={index}>
                    {(provided, snapshot) => (
                      <div 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ 
                          position: 'relative', 
                          borderRadius: '8px', 
                          overflow: 'hidden', 
                          backgroundColor: snapshot.isDragging ? '#333' : '#222',
                          border: snapshot.isDragging ? '2px solid #d4af37' : '1px solid #333',
                          width: '200px',
                          boxShadow: snapshot.isDragging ? '0 10px 20px rgba(0,0,0,0.5)' : 'none',
                          ...provided.draggableProps.style
                        }}
                      >
                        <div style={{ position: 'relative', aspectRatio: '1', width: '100%' }}>
                          <Image
                            src={img.url}
                            alt="Foto de la galería"
                            fill
                            style={{ objectFit: 'cover' }}
                            unoptimized={true}
                          />
                          <div style={{
                            position: 'absolute',
                            top: '5px',
                            left: '5px',
                            backgroundColor: 'rgba(0,0,0,0.7)',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontSize: '12px'
                          }}>
                            {index + 1}
                          </div>
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </>
  );
}
