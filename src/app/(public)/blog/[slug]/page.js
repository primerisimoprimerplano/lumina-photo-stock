import { supabase } from '../../../../lib/supabase';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import './blog-post.css';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const { data: post } = await supabase
    .from('posts')
    .select('title, content, image_url')
    .eq('slug', slug)
    .single();

  if (!post) return { title: 'No encontrado' };

  const description = post.content.replace(/[#*]/g, '').substring(0, 160) + '...';

  // Optimizar imagen para WhatsApp (forzar 1200x630 y reducir peso)
  let ogImageUrl = post.image_url;
  if (ogImageUrl && ogImageUrl.includes('res.cloudinary.com')) {
    ogImageUrl = ogImageUrl.replace('/image/upload/', '/image/upload/c_fill,w_1200,h_630,q_auto:low,f_jpg/');
  }

  return {
    title: `${post.title} | Lumina Blog`,
    description: description,
    openGraph: {
      title: post.title,
      description: description,
      url: `https://lumina-photo-stock.vercel.app/blog/${slug}`,
      siteName: 'Lumina Photo Stock',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/jpeg',
        },
      ],
      locale: 'es_ES',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: description,
      images: [ogImageUrl],
    },
  };
}

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!post) {
    notFound();
  }

  // Obtener otras noticias (que no sean esta)
  const { data: otherPosts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .neq('id', post.id)
    .order('created_at', { ascending: false })
    .limit(6);

  return (
    <div style={{ padding: '0', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      
      {/* Portada de la Noticia Principal */}
      {post.image_url ? (
        <div style={{ position: 'relative', width: '100%', height: '60vh', minHeight: '400px', backgroundColor: '#111' }}>
          <img src={post.image_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, #0a0a0a)', height: '50%' }}></div>
        </div>
      ) : (
        <div style={{ height: '100px' }}></div>
      )}

      {/* Contenido de la Noticia Principal */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem', marginTop: post.image_url ? '-100px' : '0', position: 'relative', zIndex: 10 }}>
        
        <article style={{ marginBottom: '6rem' }}>
          <header style={{ marginBottom: '4rem', textAlign: 'left' }}>
            <h1 style={{ fontSize: '4rem', color: '#fff', marginBottom: '1.5rem', lineHeight: '1.1', fontFamily: 'serif' }}>{post.title}</h1>
            
            {post.subtitle && (
              <p style={{ color: '#aaa', fontSize: '1.6rem', fontFamily: 'sans-serif', margin: '0 0 2rem 0', fontWeight: '300', lineHeight: '1.4' }}>
                {post.subtitle}
              </p>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #333', borderBottom: '1px solid #333', padding: '1rem 0' }}>
              <time style={{ color: '#888', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {new Date(post.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              
              {/* Botones de Compartir */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: '#666', fontSize: '0.9rem', alignSelf: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>Compartir:</span>
                
                {/* WhatsApp */}
                <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}%20https://lumina-photo-stock.vercel.app/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', textDecoration: 'none', padding: '0.5rem', backgroundColor: '#111', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #222' }} title="Compartir en WhatsApp">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </a>
                
                {/* Facebook */}
                <a href={`https://www.facebook.com/sharer/sharer.php?u=https://lumina-photo-stock.vercel.app/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" style={{ color: '#1877F2', textDecoration: 'none', padding: '0.5rem', backgroundColor: '#111', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #222' }} title="Compartir en Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>

                {/* X (Twitter) */}
                <a href={`https://twitter.com/intent/tweet?url=https://lumina-photo-stock.vercel.app/blog/${post.slug}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', padding: '0.5rem', backgroundColor: '#111', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #222' }} title="Compartir en X">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 4.127H5.053z"/></svg>
                </a>
              </div>
            </div>
          </header>

          <div className="blog-content">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>

        {/* Mosaico de Noticias Anteriores */}
        {otherPosts && otherPosts.length > 0 && (
          <div style={{ marginTop: '4rem', borderTop: '2px solid #222', paddingTop: '4rem' }}>
            <h3 style={{ fontSize: '2rem', color: '#fff', fontFamily: 'serif', marginBottom: '2rem', textAlign: 'center' }}>Noticias Anteriores</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '2rem' }}>
              {otherPosts.map(otherPost => (
                <article key={otherPost.id} style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#111', padding: '1rem', borderRadius: '8px', border: '1px solid #222' }}>
                  {otherPost.image_url && (
                    <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: '#000', borderRadius: '4px', overflow: 'hidden' }}>
                      <Link href={`/blog/${otherPost.slug}`}>
                        <img src={otherPost.image_url} alt={otherPost.title} className="blog-grid-img" />
                      </Link>
                    </div>
                  )}
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                      {new Date(otherPost.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </p>
                    <Link href={`/blog/${otherPost.slug}`} style={{ textDecoration: 'none', flexGrow: 1 }}>
                      <h2 style={{ fontSize: '1.4rem', color: '#fff', fontFamily: 'serif', marginBottom: '0.5rem', lineHeight: '1.2' }}>
                        {otherPost.title}
                      </h2>
                    </Link>
                    {otherPost.subtitle ? (
                      <p style={{ color: '#aaa', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>{otherPost.subtitle.substring(0, 100)}...</p>
                    ) : (
                      <p style={{ color: '#aaa', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.4' }}>{otherPost.content.replace(/[#*]/g, '').substring(0, 100)}...</p>
                    )}
                    <Link href={`/blog/${otherPost.slug}`} style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', marginTop: 'auto' }}>
                      Leer Más →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
