"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function GalleryClient({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState('full');
  const { addToCart } = useCart();
  
  const prices = {
    small: 1,
    medium: 3,
    full: 6
  };

  const handleAddToCart = () => {
    if (!selectedImage) return;
    
    addToCart({
      path: selectedImage.path,
      name: selectedImage.name,
      url: selectedImage.url,
      size: selectedSize,
      price: prices[selectedSize]
    });
    
    setSelectedImage(null); // Close the modal
  };

  return (
    <>
      <div className="masonry" style={{ columnCount: 'auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', padding: '0 2rem 4rem' }}>
        {images.map((img, index) => {
          const imageUrl = img.thumbnail_url || img.path; // Usa thumbnail_url si existe
          return (
            <div 
              key={index} 
              className="masonry-item"
              style={{ breakInside: 'avoid', marginBottom: 0 }}
              onClick={() => {
                setSelectedImage({ ...img, url: img.path });
                setSelectedSize('full');
              }}
            >
              <div 
                style={{ position: 'relative', width: '100%', aspectRatio: '3/2', cursor: 'pointer' }}
                onContextMenu={(e) => e.preventDefault()} // Bloquear clic derecho
                onDragStart={(e) => e.preventDefault()} // Evitar arrastrar imagen
              >
                <Image 
                  src={imageUrl} 
                  alt={img.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover', pointerEvents: 'none' }} // Evita interacción directa con img tag
                  unoptimized={true}
                  priority={index < 4}
                />
                <div className="masonry-overlay" style={{ pointerEvents: 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
                    <div>
                      <p style={{ color: 'white', fontWeight: 'bold' }}>{img.name}</p>
                    </div>
                    <p style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.2rem', margin: 0 }}>Desde $1</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div className="modal-backdrop" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedImage(null)}>✕</button>
            
            <div 
              className="modal-image-container"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            >
              <Image 
                src={selectedImage.path} // Muestra la versión con marca de agua (path) en vez de original (url)
                alt={selectedImage.name}
                fill
                style={{ objectFit: 'contain', pointerEvents: 'none' }}
                unoptimized={true}
              />
            </div>
            
            <div className="modal-details">
              <div>
                <h2>{selectedImage.name}</h2>
                
                <div style={{ margin: '2rem 0' }}>
                  <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', color: 'var(--text-secondary)' }}>Selecciona el tamaño:</h3>
                  
                  <label style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: `1px solid ${selectedSize === 'small' ? 'var(--accent)' : 'var(--border)'}`, borderRadius: '6px', marginBottom: '0.5rem', cursor: 'pointer', background: selectedSize === 'small' ? 'rgba(212, 175, 55, 0.1)' : 'transparent', transition: 'all 0.3s' }}>
                    <div>
                      <input type="radio" name="size" value="small" checked={selectedSize === 'small'} onChange={() => setSelectedSize('small')} style={{ marginRight: '10px' }}/>
                      Pequeña (Web / Redes)
                    </div>
                    <div style={{ fontWeight: 'bold', color: selectedSize === 'small' ? 'var(--accent)' : 'inherit' }}>${prices.small}.00</div>
                  </label>

                  <label style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: `1px solid ${selectedSize === 'medium' ? 'var(--accent)' : 'var(--border)'}`, borderRadius: '6px', marginBottom: '0.5rem', cursor: 'pointer', background: selectedSize === 'medium' ? 'rgba(212, 175, 55, 0.1)' : 'transparent', transition: 'all 0.3s' }}>
                    <div>
                      <input type="radio" name="size" value="medium" checked={selectedSize === 'medium'} onChange={() => setSelectedSize('medium')} style={{ marginRight: '10px' }}/>
                      Mediana (Impresión standard)
                    </div>
                    <div style={{ fontWeight: 'bold', color: selectedSize === 'medium' ? 'var(--accent)' : 'inherit' }}>${prices.medium}.00</div>
                  </label>

                  <label style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', border: `1px solid ${selectedSize === 'full' ? 'var(--accent)' : 'var(--border)'}`, borderRadius: '6px', marginBottom: '0.5rem', cursor: 'pointer', background: selectedSize === 'full' ? 'rgba(212, 175, 55, 0.1)' : 'transparent', transition: 'all 0.3s' }}>
                    <div>
                      <input type="radio" name="size" value="full" checked={selectedSize === 'full'} onChange={() => setSelectedSize('full')} style={{ marginRight: '10px' }}/>
                      Full Calidad (Original)
                    </div>
                    <div style={{ fontWeight: 'bold', color: selectedSize === 'full' ? 'var(--accent)' : 'inherit' }}>${prices.full}.00</div>
                  </label>
                </div>
              </div>
              
              <div className="modal-license">
                <h3>Licencia de Uso Extendida</h3>
                <p>Variedad de tipos de usos incluyendo: <br/><strong>Libros, Prensa, Editoriales, Ilustración y Diseño</strong>.</p>
                <p style={{ color: 'var(--accent)', marginTop: '0.5rem' }}>✓ Todos los derechos libres al pagar.</p>
                <p style={{ color: 'var(--accent)' }}>✓ Sin marca de agua.</p>
              </div>

              <button className="btn-cart-large" onClick={handleAddToCart} style={{ marginBottom: '1rem' }}>
                Añadir al Carrito - ${prices[selectedSize]}.00 USD
              </button>
              
              <a 
                href={`mailto:compras@luminaphotostock.com?subject=Solicitud Tamaño Especial - ${selectedImage.name}&body=Hola, estoy interesado en adquirir la fotografía "${selectedImage.name}" en un tamaño superior a Full Calidad. Por favor enviarme cotización.`}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.8rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'color 0.2s, border-color 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#888'; }}
                onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                Solicitar tamaño Extra Grande (Email)
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
