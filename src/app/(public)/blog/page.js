import { supabase } from '../../../lib/supabase';
import Link from 'next/link';

export const revalidate = 60;

export default async function BlogIndex() {
  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  return (
    <div style={{ padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#fff', textAlign: 'center' }}>Lumina Blog</h1>
      <p style={{ color: '#888', textAlign: 'center', marginBottom: '4rem', fontSize: '1.2rem' }}>Noticias, técnicas y novedades sobre fotografía.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {posts && posts.length > 0 ? (
          posts.map(post => (
            <article key={post.id} style={{ padding: '2rem', backgroundColor: '#111', borderRadius: '12px', border: '1px solid #222' }}>
              <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <h2 style={{ fontSize: '1.8rem', color: '#d4af37', marginBottom: '0.5rem', transition: 'color 0.2s' }}>
                  {post.title}
                </h2>
              </Link>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                {new Date(post.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              
              <p style={{ color: '#ccc', lineHeight: '1.6' }}>
                {/* Extract first 150 characters for preview */}
                {post.content.replace(/[#*]/g, '').substring(0, 150)}...
              </p>
              
              <div style={{ marginTop: '1.5rem' }}>
                <Link href={`/blog/${post.slug}`} style={{ color: '#fff', textDecoration: 'none', borderBottom: '1px solid #d4af37', paddingBottom: '2px' }}>
                  Leer más →
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#666', padding: '3rem' }}>No hay artículos publicados todavía.</p>
        )}
      </div>
    </div>
  );
}
