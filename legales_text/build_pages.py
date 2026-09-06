import os

base_dir = r'C:\Users\Edicion PC\.gemini\antigravity\scratch\stock-gallery'
text_dir = os.path.join(base_dir, 'legales_text')
out_dir = os.path.join(base_dir, 'src', 'app', '(public)')

files_map = {
    'LICENCIAS Y USO DE FOTOGRAFÍAS – LUMINA PHOTO STOCK.txt': ('licencias', 'Licencias y Uso de Fotografías'),
    'POLÍTICAS DE PRIVACIDAD – LUMINA PHOTO STOCK.txt': ('privacidad', 'Políticas de Privacidad'),
    'TÉRMINOS Y CONDICIONES DE USO – LUMINA PHOTO STOCK.txt': ('terminos', 'Términos y Condiciones de Uso')
}

template = """export const metadata = {{
  title: '{title} | Lumina Photo Stock',
}};

export default function LegalPage() {{
  return (
    <div style={{{{ padding: '6rem 2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}}}>
      <div style={{{{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#111', padding: '3rem', borderRadius: '8px', border: '1px solid #333' }}}}>
        <h1 style={{{{ color: 'var(--accent)', marginBottom: '2rem', textAlign: 'center', fontSize: '2.5rem' }}}}>{title}</h1>
        <div style={{{{ color: '#ccc', lineHeight: '1.8', fontSize: '1.1rem', textAlign: 'justify' }}}}>
{content}
        </div>
      </div>
    </div>
  );
}}
"""

for filename, (slug, title) in files_map.items():
    filepath = os.path.join(text_dir, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    paragraphs = []
    for line in text.split('\n'):
        line = line.strip()
        if not line:
            continue
        if len(line) < 80 and line.isupper() and not line.startswith('HTTP'):
             paragraphs.append(f'          <h3 style={{{{ color: "#fff", marginTop: "2rem", marginBottom: "1rem" }}}}>{line}</h3>')
        else:
             paragraphs.append(f'          <p style={{{{ marginBottom: "1.5rem" }}}}>{line}</p>')
             
    content_jsx = '\n'.join(paragraphs)
    
    page_dir = os.path.join(out_dir, slug)
    os.makedirs(page_dir, exist_ok=True)
    page_path = os.path.join(page_dir, 'page.js')
    
    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(template.format(title=title, content=content_jsx))
    
    print(f'Created {page_path}')
