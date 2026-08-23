import { supabase } from '../../../../../lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ImageUploadField from '../../ImageUploadField';
import { editPost, deletePost } from '../../actions';

export default async function EditPost({ params }) {
  const { id } = await params;
  
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Link href="/admin/blog" style={{ color: '#888', textDecoration: 'none' }}>
          ← Volver
        </Link>
        <h1 style={{ fontSize: '2rem', margin: 0, color: '#fff' }}>Editar Noticia</h1>
      </div>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <form action={editPost} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, maxWidth: '800px' }}>
          
          <input type="hidden" name="id" value={post.id} />

          <ImageUploadField defaultImageUrl={post.image_url} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: '#aaa', fontWeight: 'bold' }}>Título</label>
            <input 
              type="text" 
              name="title" 
              defaultValue={post.title}
              required 
              style={{ padding: '1rem', backgroundColor: '#1a1a1a', border: '1px solid #333', color: 'white', borderRadius: '6px', fontSize: '1.1rem' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: '#aaa', fontWeight: 'bold' }}>Subtítulo (Entradilla)</label>
            <textarea 
              name="subtitle" 
              defaultValue={post.subtitle || ''}
              rows={2}
              style={{ padding: '1rem', backgroundColor: '#1a1a1a', border: '1px solid #333', color: 'white', borderRadius: '6px', fontSize: '1.1rem', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ color: '#aaa', fontWeight: 'bold' }}>Contenido (Markdown soportado)</label>
            <textarea 
              name="content" 
              defaultValue={post.content}
              required 
              rows={15}
              style={{ padding: '1rem', backgroundColor: '#1a1a1a', border: '1px solid #333', color: 'white', borderRadius: '6px', fontSize: '1rem', fontFamily: 'monospace', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" name="published" id="published" value="true" defaultChecked={post.published} style={{ width: '1.2rem', height: '1.2rem' }} />
            <label htmlFor="published" style={{ color: '#ccc' }}>Publicar Inmediatamente</label>
          </div>

          <button 
            type="submit" 
            style={{ alignSelf: 'flex-start', padding: '1rem 2rem', backgroundColor: '#d4af37', color: 'black', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer' }}
          >
            Guardar Cambios
          </button>
        </form>

        <form action={deletePost.bind(null, post.id)}>
          <button 
            type="submit"
            style={{ padding: '1rem 2rem', backgroundColor: '#8b0000', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
            onClick={(e) => {
              if (!window.confirm('¿Estás seguro de que quieres eliminar esta noticia de forma permanente?')) {
                e.preventDefault();
              }
            }}
          >
            Eliminar Noticia
          </button>
        </form>
      </div>
    </div>
  );
}
