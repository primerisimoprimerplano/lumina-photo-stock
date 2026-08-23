import { supabase } from '../../lib/supabase';

export default async function AdminDashboard() {
  // Fetch some basic stats
  const { count: blogCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true });
    
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: '#fff' }}>Dashboard General</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
        
        {/* Card Galerías */}
        <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px', border: '1px solid #333' }}>
          <h3 style={{ color: '#888', margin: '0 0 1rem 0', fontSize: '1rem', textTransform: 'uppercase' }}>Galerías</h3>
          <p style={{ fontSize: '3rem', margin: 0, fontWeight: 'bold', color: '#d4af37' }}>9</p>
          <p style={{ color: '#555', marginTop: '1rem', fontSize: '0.9rem' }}>Categorías activas</p>
        </div>

        {/* Card Blog */}
        <div style={{ backgroundColor: '#1a1a1a', padding: '2rem', borderRadius: '12px', border: '1px solid #333' }}>
          <h3 style={{ color: '#888', margin: '0 0 1rem 0', fontSize: '1rem', textTransform: 'uppercase' }}>Artículos de Blog</h3>
          <p style={{ fontSize: '3rem', margin: 0, fontWeight: 'bold', color: '#d4af37' }}>{blogCount || 0}</p>
          <p style={{ color: '#555', marginTop: '1rem', fontSize: '0.9rem' }}>Publicados</p>
        </div>

      </div>
    </div>
  );
}
