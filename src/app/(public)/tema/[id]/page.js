import Link from 'next/link';
import GalleryClient from '@/components/GalleryClient';
import { v2 as cloudinary } from 'cloudinary';
import { supabase } from '../../../../lib/supabase';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

cloudinary.config({
  cloudinary_url: process.env.CLOUDINARY_URL
});

export default async function GalleryPage({ params }) {
  const { id } = await params;
  
  // 1. Fetch category from Supabase
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (!category) {
    notFound();
  }

  const folderName = `lumina/${id}`;
  const title = category.title;
  
  let images = [];

  try {
    // 2. Fetch images from Cloudinary
    const { resources } = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderName + '/',
      max_results: 500
    });
    
    // 3. Fetch sort order from Supabase
    const { data: orderData } = await supabase
      .from('gallery_order')
      .select('photo_id, sort_order')
      .eq('category', id);

    // Map order data to a dictionary for fast lookup
    const orderMap = {};
    if (orderData) {
      orderData.forEach(item => {
        orderMap[item.photo_id] = item.sort_order;
      });
    }

    // Process images
    images = resources.map(res => {
      const publicId = res.public_id;
      // Transform image to add Watermark (anti-piracy)
      // l_lumina_logo (assuming a logo named lumina_logo is in Cloudinary), o_50 (50% opacity), c_scale, w_0.8 (80% of width)
      // If we don't have a logo yet, we can use a text watermark: l_text:Arial_80:LUMINA PHOTO STOCK,co_white,o_50
      
      const watermarkedUrl = cloudinary.url(publicId, {
        secure: true,
        transformation: [
          { overlay: { font_family: "Arial", font_size: 80, font_weight: "bold", text: "LUMINA PHOTO STOCK" }, color: "white", opacity: 30, angle: -45 }
        ]
      });

      return {
        id: publicId,
        public_id: publicId,
        name: publicId.split('/').pop() + '.' + res.format,
        path: watermarkedUrl, // Show watermarked version
        original_url: res.secure_url,
        sort_order: orderMap[publicId] !== undefined ? orderMap[publicId] : 9999 // Default to end if not sorted
      };
    });

    // 4. Sort images based on Supabase order
    images.sort((a, b) => a.sort_order - b.sort_order);

  } catch (e) {
    console.error("Error consultando Cloudinary/Supabase:", e);
  }

  return (
    <main style={{ minHeight: '100vh', paddingBottom: '4rem' }}>
      <div 
        className="header" 
        style={{ 
          padding: '6rem 2rem 4rem',
          backgroundImage: category.cover_photo ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${category.cover_photo})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center'
        }}
      >
        <h1 style={{ fontSize: '4rem', color: '#d4af37', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '4px' }}>{title}</h1>
        <p style={{ color: '#fff', fontSize: '1.2rem', letterSpacing: '2px' }}>COLECCIÓN PREMIUM</p>
        <Link href="/" style={{ color: '#888', marginTop: '2rem', display: 'inline-block', textDecoration: 'none', borderBottom: '1px solid #888', paddingBottom: '2px' }}>
          &larr; Volver a Categorías
        </Link>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        {images.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 2rem', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '1.2rem' }}>No se encontraron fotografías en la nube para {title}.</p>
          </div>
        ) : (
          <GalleryClient images={images} categoryId={id} categoryTitle={title} />
        )}
      </div>
    </main>
  );
}
