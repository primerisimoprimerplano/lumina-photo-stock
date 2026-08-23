import { supabase } from '../../../../lib/supabase';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import './blog-post.css';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { data: post } = await supabase
    .from('posts')
    .select('title, content')
    .eq('slug', params.slug)
    .single();

  if (!post) return { title: 'No encontrado' };

  return {
    title: `${post.title} | Lumina Blog`,
    description: post.content.replace(/[#*]/g, '').substring(0, 160),
  };
}

export default async function BlogPost({ params }) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!post) {
    notFound();
  }

  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
      <Link href="/blog" style={{ color: '#888', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
        ← Volver al Blog
      </Link>
      
      <article>
        <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', color: '#d4af37', marginBottom: '1rem', lineHeight: '1.2' }}>{post.title}</h1>
          <time style={{ color: '#888', fontSize: '1.1rem' }}>
            {new Date(post.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </time>
        </header>

        <div className="blog-content">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
