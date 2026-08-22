"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart on successful purchase
    clearCart();
  }, [clearCart]);

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

      <Link href="/">
        <button className="btn-contact" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Volver a la Galería
        </button>
      </Link>
    </div>
  );
}
