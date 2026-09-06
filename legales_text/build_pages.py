import os
import re

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
    
    # Clean up PDF extraction weirdness (join all words into one block)
    # Remove newlines
    text = text.replace('\n', ' ')
    # Remove multiple spaces
    text = re.sub(r'\s+', ' ', text)
    
    # Now split into paragraphs manually based on numbers like "1. ", "2. ", or "a) "
    # We can split the string using a regex
    # We want to match things like "1. ", "a) ", "●"
    
    # First, let's insert a newline before them
    text = re.sub(r'(\s\d+\.\s)', r'\n\1', text)
    text = re.sub(r'(\s[a-z]\)\s)', r'\n\1', text)
    text = re.sub(r'(\s●\s)', r'\n\1', text)
    
    # Remove the title from the text body if it exists
    text = text.replace('TÉRMINOS Y CONDICIONES DE USO – LUMINA PHOTO STOCK', '')
    text = text.replace('LICENCIAS Y USO DE FOTOGRAFÍAS – LUMINA PHOTO STOCK', '')
    text = text.replace('POLÍTICAS DE PRIVACIDAD – LUMINA PHOTO STOCK', '')
    
    paragraphs = []
    for line in text.split('\n'):
        line = line.strip()
        if not line:
            continue
        paragraphs.append(f'          <p style={{{{ marginBottom: "1.5rem" }}}}>{line}</p>')
             
    content_jsx = '\n'.join(paragraphs)
    
    page_dir = os.path.join(out_dir, slug)
    os.makedirs(page_dir, exist_ok=True)
    page_path = os.path.join(page_dir, 'page.js')
    
    with open(page_path, 'w', encoding='utf-8') as f:
        f.write(template.format(title=title, content=content_jsx))
    
    print(f'Fixed {page_path}')
