import Link from 'next/link';

export const metadata = {
  title: 'Políticas de Privacidad | Lumina Photo Stock',
  description: 'Políticas de privacidad y manejo de datos de Lumina Photo Stock.',
};

export default function PrivacidadPage() {
  return (
    <div style={{ padding: '6rem 2rem', backgroundColor: '#0a0a0a', minHeight: '100vh', color: '#e0e0e0' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <Link href="/" style={{ color: '#d4af37', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px' }}>
          ← Volver a la tienda
        </Link>
        
        <h1 style={{ fontSize: '3rem', color: '#fff', fontFamily: 'serif', marginBottom: '3rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
          Políticas de Privacidad
        </h1>

        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <section>
            <h2 style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '1rem' }}>1. Recopilación y Uso de Datos Legítimo</h2>
            <p style={{ marginBottom: '1rem' }}>
              Lumina Photo Stock respeta profundamente su privacidad. Recopilamos exclusivamente la información estrictamente necesaria para procesar la compra de sus licencias fotográficas y mejorar su experiencia en nuestra plataforma.
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li>
                <strong>Datos de Identificación:</strong> Requerimos su nombre completo y correo electrónico para la entrega segura de los bienes digitales adquiridos.
              </li>
              <li>
                <strong>Datos de Facturación:</strong> Solicitamos la dirección y detalles fiscales únicamente para emitir los comprobantes legales correspondientes.
              </li>
              <li>
                <strong>Privacidad Absoluta:</strong> Garantizamos que su información personal jamás será vendida, alquilada ni compartida con terceros para fines publicitarios.
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '1rem' }}>2. Procesamiento de Pagos y Seguridad Financiera</h2>
            <p style={{ marginBottom: '1rem' }}>
              Su seguridad transaccional es una prioridad técnica y legal inquebrantable para nosotros.
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li>
                <strong>Cero Almacenamiento:</strong> Lumina Photo Stock no procesa, no retiene y no almacena en sus servidores los datos de sus tarjetas de crédito o débito.
              </li>
              <li>
                <strong>Pasarelas Certificadas:</strong> Toda información financiera viaja estrictamente encriptada (SSL Encryption) hacia pasarelas de pago que cumplen con las más altas normativas internacionales de seguridad (ISO 27001).
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '1rem' }}>3. Derechos del Titular de los Datos</h2>
            <p style={{ marginBottom: '1rem' }}>
              Como usuario de nuestra plataforma global, usted conserva el control absoluto sobre su información personal, amparado en las leyes dominicanas e internacionales.
            </p>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li>
                <strong>Acceso y Rectificación:</strong> Usted puede solicitar conocer qué datos poseemos o actualizar cualquier información a través de nuestro soporte: hola@luminastock.com.
              </li>
              <li>
                <strong>Cancelación:</strong> Tiene el derecho irrenunciable de solicitar la eliminación total de sus datos de nuestros servidores, siempre que no existan obligaciones legales o fiscales pendientes por transacciones previas.
              </li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '1rem' }}>4. Uso de Cookies y Modificaciones</h2>
            <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li>
                <strong>Transparencia:</strong> Nos reservamos el derecho de actualizar esta política para cumplir con nuevas legislaciones globales. Cualquier cambio sustancial será notificado oportunamente a nuestros usuarios registrados.
              </li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
