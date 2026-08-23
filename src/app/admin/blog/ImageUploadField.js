"use client";

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';

export default function ImageUploadField({ defaultImageUrl = '' }) {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <label style={{ color: '#aaa', fontWeight: 'bold' }}>Fotografía de Portada</label>
      
      {imageUrl && (
        <div style={{ position: 'relative', width: '100%', height: '200px', borderRadius: '6px', overflow: 'hidden', marginBottom: '1rem' }}>
          <Image src={imageUrl} alt="Portada" fill style={{ objectFit: 'cover' }} unoptimized={true} />
          <button 
            type="button"
            onClick={() => setImageUrl('')}
            style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', zIndex: 10 }}
          >
            ✕
          </button>
        </div>
      )}

      <input type="hidden" name="image_url" value={imageUrl} />

      {!imageUrl && (
        <CldUploadWidget 
          uploadPreset="lumina_preset"
          options={{
            folder: `lumina/blog`,
            maxFiles: 1,
            clientAllowedFormats: ["jpg", "jpeg", "png", "webp", "heic", "heif"],
            maxImageWidth: 2000,
            maxImageHeight: 2000
          }}
          onSuccess={(result) => {
            setImageUrl(result.info.secure_url);
          }}
        >
          {({ open }) => (
            <button 
              type="button"
              onClick={() => open()}
              style={{
                alignSelf: 'flex-start',
                backgroundColor: '#333',
                color: 'white',
                border: '1px solid #555',
                padding: '0.8rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Subir Fotografía
            </button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
}
