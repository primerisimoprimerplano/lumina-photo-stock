export const metadata = {
  title: 'Términos y Condiciones de Uso | Lumina Photo Stock',
};

export default function LegalPage() {
  return (
    <div style={{ padding: '6rem 2rem', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#111', padding: '3rem', borderRadius: '8px', border: '1px solid #333' }}>
        <h1 style={{ color: 'var(--accent)', marginBottom: '2rem', textAlign: 'center', fontSize: '2.5rem' }}>Términos y Condiciones de Uso</h1>
        <div style={{ color: '#ccc', lineHeight: '1.8', fontSize: '1.1rem', textAlign: 'justify' }}>
          <p style={{ marginBottom: "1.5rem" }}>1. Introducción y Aceptación Bienvenido a Lumina Photo Stock. Al acceder, navegar y utilizar este sitio web para la adquisición de fotografías digitales, usted acepta estar legalmente vinculado por los presentes Términos y Condiciones. Este acuerdo vinculante se celebra entre usted (en adelante, el "Usuario") y Ramón Arturo Herrera Rijo, operando bajo la plataforma Lumina Photo Stock (en adelante, "la Plataforma").</p>
          <p style={{ marginBottom: "1.5rem" }}>2. Propiedad Intelectual y Derechos de Autor Todo el contenido visual y fotográfico disponible en esta plataforma es una obra original y propiedad exclusiva de su autor. Dicho contenido está protegido de manera estricta y absoluta por la Ley No. 65-00 sobre Derecho de Autor de la República Dominicana y los tratados internacionales aplicables. La adquisición de una fotografía a través de Lumina Photo Stock le otorga al Usuario una licencia de uso específica (cuyos límites se detallan en el documento de "Licencias y Uso"), pero en ningún escenario constituye una cesión, venta o transferencia de los derechos patrimoniales o morales de la obra originaria.</p>
          <p style={{ marginBottom: "1.5rem" }}>3. Seguridad Transaccional El Usuario reconoce y acepta que las compras realizadas en la Plataforma se ejecutan en un entorno digital seguro. Para garantizar la integridad de sus datos financieros, nuestras pasarelas de pago cuentan con cifrado de seguridad de extremo a extremo (SSL Encryption) y operan bajo infraestructuras robustas respaldadas por certificaciones internacionales (ISO 27001).</p>
          <p style={{ marginBottom: "1.5rem" }}>4. Política de Reembolsos y Entregables Debido a la naturaleza digital e intangible de los bienes comercializados (archivos de imagen descargables en alta resolución), todas las ventas realizadas en Lumina Photo Stock son definitivas. Una vez que el sistema registra que el archivo fotográfico ha sido descargado exitosamente por el Usuario, no aplicará ningún tipo de reembolso, crédito o devolución.</p>
          <p style={{ marginBottom: "1.5rem" }}>5. Ley Aplicable y Resolución de Conflictos Estos Términos y Condiciones se regirán, interpretarán y aplicarán de conformidad con las leyes vigentes de la República Dominicana. Cualquier disputa, controversia o reclamo que surja del uso de esta plataforma o de la compra de licencias fotográficas, será sometida a la jurisdicción exclusiva de los tribunales competentes de la República Dominicana.</p>
        </div>
      </div>
    </div>
  );
}
