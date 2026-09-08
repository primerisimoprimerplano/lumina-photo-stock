"use client";

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCart } from '../../context/CartContext';

function SuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const isPromo = searchParams.get('promo') === 'true';

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const handleCopyAttribution = () => {
    navigator.clipboard.writeText("Fotografía por lumina-photo-stock.vercel.app");
    alert("Texto copiado al portapapeles");
  };

  if (isPromo) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ color: 'var(--accent)', fontSize: '3rem', marginBottom: '1rem' }}>¡Descarga Exitosa!</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2rem' }}>
          Gracias por usar tu código promocional. Tus fotografías deberían haberse descargado automáticamente en tu navegador.
        </p>
        
        <div style={{ padding: '2rem', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--accent)', borderRadius: '8px', marginBottom: '2rem', maxWidth: '600px' }}>
          <h3 style={{ marginBottom: '1rem', color: 'white' }}>⚠️ Recordatorio Importante de Atribución</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            Como acordaste al realizar la descarga, es obligatorio incluir el siguiente crédito junto a la fotografía al momento de publicarla:
          </p>
          <div style={{ background: '#000', padding: '1rem', borderRadius: '4px', border: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <code style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>Fotografía por lumina-photo-stock.vercel.app</code>
            <button onClick={handleCopyAttribution} style={{ background: 'var(--accent)', color: 'black', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Copiar</button>
          </div>
        </div>

        <Link href="/" className="btn-contact" style={{ padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none' }}>
          Volver a la Galería
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ color: 'var(--accent)', fontSize: '3rem', marginBottom: '1rem' }}>¡Pago Exitoso!</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2rem' }}>
        Gracias por tu compra. Te hemos enviado un correo electrónico con los enlaces para descargar tus fotografías en alta calidad y el recibo de tu pago.
      </p>
      
      <div style={{ padding: '2rem', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid var(--accent)', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem', color: 'white' }}>Siguientes pasos:</h3>
        <p style={{ color: 'var(--text-secondary)' }}>1. Revisa tu bandeja de entrada (y la carpeta de spam).</p>
        <p style={{ color: 'var(--text-secondary)' }}>2. Descarga los archivos originales.</p>
        <p style={{ color: 'var(--text-secondary)' }}>3. ¡Disfruta usando las imágenes en tus proyectos creativos!</p>
      </div>

      <Link href="/" className="btn-contact" style={{ padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none' }}>
        Volver a la Galería
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
