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
    <div style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <div style={{ borderBottom: '2px solid #333', paddingBottom: '1rem', marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', margin: 0, color: '#fff', fontFamily: 'serif', letterSpacing: '2px' }}>NOTICIAS Y ARTÍCULOS</h1>
        <p style={{ color: '#888', marginTop: '1rem', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '4px' }}>La Actualidad de Lumina Photo Stock</p>
      </div>

      {posts && posts.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
          {/* Hero Article (Última Noticia) */}
          <article style={{ gridColumn: 'span 12', display: 'flex', flexDirection: 'column', gap: '1rem', borderBottom: '1px solid #333', paddingBottom: '3rem', marginBottom: '1rem' }}>
            {posts[0].image_url && (
              <div style={{ position: 'relative', width: '100%', height: '500px', backgroundColor: '#111' }}>
                <img src={posts[0].image_url} alt={posts[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
            <Link href={`/blog/${posts[0].slug}`} style={{ textDecoration: 'none' }}>
              <h2 style={{ fontSize: '3rem', color: '#fff', fontFamily: 'serif', marginTop: '1rem', transition: 'color 0.2s' }}>
                {posts[0].title}
              </h2>
            </Link>
            {posts[0].subtitle && <p style={{ color: '#aaa', fontSize: '1.4rem', fontFamily: 'sans-serif', margin: 0 }}>{posts[0].subtitle}</p>}
            <div style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>{new Date(posts[0].created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <Link href={`/blog/${posts[0].slug}`} style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold', textTransform: 'uppercase' }}>
                Leer Noticia →
              </Link>
            </div>
          </article>

          {/* Grid de Artículos Restantes */}
          {posts.slice(1).map(post => (
            <article key={post.id} style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {post.image_url && (
                <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: '#111' }}>
                  <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
                  {new Date(post.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
                <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', flexGrow: 1 }}>
                  <h2 style={{ fontSize: '1.5rem', color: '#fff', fontFamily: 'serif', marginBottom: '0.5rem', transition: 'color 0.2s' }}>
                    {post.title}
                  </h2>
                </Link>
                {post.subtitle ? (
                  <p style={{ color: '#aaa', fontSize: '1rem', marginBottom: '1rem' }}>{post.subtitle}</p>
                ) : (
                  <p style={{ color: '#aaa', fontSize: '1rem', marginBottom: '1rem' }}>{post.content.replace(/[#*]/g, '').substring(0, 100)}...</p>
                )}
                <Link href={`/blog/${post.slug}`} style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                  Leer Más
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', color: '#666', padding: '3rem' }}>No hay noticias publicadas todavía.</p>
      )}
    </div>
  );
}
