import Link from 'next/link';

export const metadata = {
  title: 'Licencias y Uso de Fotografías | Lumina Photo Stock',
  description: 'Términos de licencias y uso de las fotografías de Lumina Photo Stock.',
};

export default function LicenciasPage() {
  return (
    <div style={{ padding: '6rem 2rem', backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#e0e0e0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <Link href="/" style={{ color: '#d4af37', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
          ← Volver a la tienda
        </Link>
        
        <h1 style={{ fontSize: '3rem', color: '#fff', fontFamily: 'serif', marginBottom: '3rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
          Licencias y Uso de Fotografías
        </h1>

        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section>
            <h2 style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '1rem' }}>1. Propiedad Intelectual Internacional</h2>
            <p>
              Todas las fotografías disponibles en Lumina Photo Stock son obras originales y propiedad intelectual exclusiva de Lumina Photo Stock. Estas obras están protegidas de manera global por la Ley No. 65-00 sobre Derecho de Autor de la República Dominicana, así como por el Convenio de Berna para la Protección de las Obras Literarias y Artísticas, el Tratado de la OMPI sobre Derecho de Autor (WCT) y la Convención Universal sobre Derechos de Autor, garantizando su absoluta protección en todas las jurisdicciones internacionales suscritas a dichos acuerdos.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '1rem' }}>2. Concesión de Licencia</h2>
            <p style={{ marginBottom: '1rem' }}>
              La transacción realizada en esta plataforma no constituye una venta de la obra. Al adquirir una fotografía, el usuario obtiene una licencia de uso no exclusiva, intransferible y de alcance mundial, sujeta estrictamente a los términos del tipo de licencia seleccionada:
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li>
                <strong>Licencia Estándar (Uso Personal y Editorial):</strong> Autoriza el uso de la imagen a nivel mundial para fines no comerciales. Esto incluye proyectos personales, material educativo, blogs, redes sociales no corporativas y artículos periodísticos o editoriales. Queda expresamente prohibido su uso en publicidad, promoción de negocios, o integración en productos destinados a la venta.
              </li>
              <li>
                <strong>Licencia Extendida (Uso Comercial):</strong> Otorga el derecho mundial a utilizar la fotografía con fines de lucro. Esto ampara su uso en campañas publicitarias (impresas o digitales), marketing corporativo, empaques, diseño web comercial y mercancía física o digital destinada a la venta, siempre respetando las restricciones generales.
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '1rem' }}>3. Restricciones Generales (Aplicables a todas las jurisdicciones)</h2>
            <p style={{ marginBottom: '1rem' }}>Sin importar el tipo de licencia adquirida o el país de residencia del usuario, queda terminantemente prohibido:</p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', listStyleType: 'none' }}>
              <li><strong>a) Redistribución:</strong> Revender, sublicenciar, compartir o distribuir el archivo fotográfico original a terceros, ya sea de forma gratuita o remunerada, incluyendo otras plataformas de stock.</li>
              <li><strong>b) Apropiación de Autoría:</strong> Reclamar la creación de la obra. El derecho moral de paternidad es inalienable según la legislación dominicana y los tratados internacionales; el autor siempre conservará el crédito de la obra.</li>
              <li><strong>c) Uso Indebido:</strong> Emplear la imagen en contextos difamatorios, calumniosos, pornográficos, ilegales, o de cualquier forma que promueva el odio, la violencia o infrinja las leyes de la República Dominicana o del país donde se visualice el contenido.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '1rem' }}>4. Rescisión y Consecuencias Legales</h2>
            <p>
              El incumplimiento de cualquiera de las cláusulas estipuladas en este acuerdo provocará la revocación inmediata y automática de la licencia a nivel global, sin obligación de reembolso por parte de Lumina Photo Stock. En tal caso, el usuario deberá cesar todo uso de la imagen y destruir cualquier copia digital o física, reservándose el autor el derecho a emprender las acciones civiles y penales correspondientes en las jurisdicciones internacionales pertinentes.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
