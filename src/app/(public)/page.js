"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const galleries = [
    { id: 'arquitectura', title: 'Arquitectura', subtitle: 'Modern & Urban', image: '/photos/cover_arquitectura_1787324674979.jpg' },
    { id: 'naturaleza', title: 'Naturaleza', subtitle: 'Landscapes & Elements', image: '/photos/cover_naturaleza_1787324686614.jpg' },
    { id: 'abstracto', title: 'Abstracto', subtitle: 'Shapes & Colors', image: '/photos/cover_abstracto_1787324697227.jpg' },
    { id: 'gastronomia', title: 'Gastronomía', subtitle: 'Culinary Arts', image: '/photos/cover_gastronomia_1787324707825.jpg' },
    { id: 'retratos', title: 'Retratos', subtitle: 'Faces & Emotions', image: '/photos/cover_retratos_1787324718689.jpg' },
    { id: 'viajes', title: 'Viajes', subtitle: 'World Destinations', image: '/photos/cover_viajes_1787324731308.jpg' },
    { id: 'tecnologia', title: 'Tecnología', subtitle: 'Future & Innovation', image: '/photos/cover_tecnologia_1787324742039.jpg' },
    { id: 'deportes', title: 'Deportes', subtitle: 'Action & Energy', image: '/photos/cover_deportes_1787324753036.jpg' },
    { id: 'fauna', title: 'Fauna', subtitle: 'Wildlife & Nature', image: '/photos/cover_fauna_ciguapalmera_1787325182854.jpg' },
  ];

  return (
    <main>
      <header className="header">
        <h1>LUMINA PHOTO STOCK</h1>
        <p>EMPOWERING YOUR CREATIVE VISION</p>
      </header>

      <div className="masonry">
        {galleries.map((gallery) => (
          <Link href={`/tema/${gallery.id}`} key={gallery.id}>
            <div 
              className="masonry-item" 
              onContextMenu={(e) => e.preventDefault()} /* Prevents right click */
            >
              <Image 
                src={gallery.image} 
                alt={gallery.title}
                width={800}
                height={600}
                style={{ objectFit: 'cover' }}
                priority={true}
              />
              <div className="masonry-overlay">
                <h2 className="masonry-title">{gallery.title}</h2>
                <p className="masonry-subtitle">{gallery.subtitle}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
