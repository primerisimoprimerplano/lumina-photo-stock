import { createPost } from '../actions';
import Link from 'next/link';
import ImageUploadField from '../ImageUploadField';

export default function NewPost() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/blog" style={{ color: '#888', textDecoration: 'none' }}>
          ← Volver
        </Link>
        <h1 style={{ fontSize: '2rem', margin: 0, color: '#fff' }}>Nuevo Artículo</h1>
      </div>

      <form action={createPost} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
        
        <ImageUploadField />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: '#aaa', fontWeight: 'bold' }}>Título</label>
          <input 
            type="text" 
            name="title" 
            required 
            placeholder="Ej. El arte de la fotografía de fauna"
            style={{ padding: '1rem', backgroundColor: '#1a1a1a', border: '1px solid #333', color: 'white', borderRadius: '6px', fontSize: '1.1rem' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: '#aaa', fontWeight: 'bold' }}>Subtítulo (Entradilla)</label>
          <textarea 
            name="subtitle" 
            rows={2}
            placeholder="Breve resumen o introducción de la noticia..."
            style={{ padding: '1rem', backgroundColor: '#1a1a1a', border: '1px solid #333', color: 'white', borderRadius: '6px', fontSize: '1.1rem', resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ color: '#aaa', fontWeight: 'bold' }}>Contenido (Markdown soportado)</label>
          <textarea 
            name="content" 
            required 
            rows={15}
            placeholder="Escribe tu artículo aquí..."
            style={{ padding: '1rem', backgroundColor: '#1a1a1a', border: '1px solid #333', color: 'white', borderRadius: '6px', fontSize: '1rem', fontFamily: 'monospace', resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" name="published" id="published" value="true" defaultChecked style={{ width: '1.2rem', height: '1.2rem' }} />
          <label htmlFor="published" style={{ color: '#ccc' }}>Publicar inmediatamente</label>
        </div>

        <button 
          type="submit" 
          style={{ alignSelf: 'flex-start', padding: '1rem 2rem', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}
        >
          Guardar Artículo
        </button>
      </form>
    </div>
  );
}
