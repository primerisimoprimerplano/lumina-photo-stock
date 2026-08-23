import { supabase } from '../../../lib/supabase';
import Link from 'next/link';

export const revalidate = 0; // Disable caching for admin pages

export default async function AdminBlog() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', margin: 0, color: '#fff' }}>Noticias y Artículos</h1>
        <Link href="/admin/blog/nuevo" style={{ padding: '0.8rem 1.5rem', backgroundColor: '#d4af37', color: 'black', borderRadius: '6px', fontWeight: 'bold', textDecoration: 'none' }}>
          + Redactar Noticia
        </Link>
      </div>

      <div style={{ backgroundColor: '#1a1a1a', borderRadius: '12px', border: '1px solid #333', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#111', borderBottom: '1px solid #333' }}>
              <th style={{ padding: '1rem', color: '#888' }}>Título</th>
              <th style={{ padding: '1rem', color: '#888' }}>Fecha</th>
              <th style={{ padding: '1rem', color: '#888' }}>Estado</th>
              <th style={{ padding: '1rem', color: '#888', textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.length > 0 ? (
              posts.map(post => (
                <tr key={post.id} style={{ borderBottom: '1px solid #333' }}>
                  <td style={{ padding: '1rem', color: 'white' }}>{post.title}</td>
                  <td style={{ padding: '1rem', color: '#aaa' }}>{new Date(post.created_at).toLocaleDateString('es-ES')}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.3rem 0.6rem', 
                      borderRadius: '20px', 
                      fontSize: '0.8rem',
                      backgroundColor: post.published ? '#1b4a22' : '#4a3b1b',
                      color: post.published ? '#60e07e' : '#e0b860'
                    }}>
                      {post.published ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <Link href={`/admin/blog/editar/${post.id}`} style={{ color: '#d4af37', textDecoration: 'none' }}>
                      Editar
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#888' }}>
                  No tienes artículos de blog todavía.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
