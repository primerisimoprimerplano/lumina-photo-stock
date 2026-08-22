import React from 'react';
import Link from 'next/link';

export default function CancelPage() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ color: 'white', fontSize: '3rem', marginBottom: '1rem' }}>Pago Cancelado</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2rem' }}>
        El proceso de pago ha sido cancelado y no se ha realizado ningún cargo a tu tarjeta. 
        Las fotografías siguen guardadas en tu carrito por si deseas completar la compra más tarde.
      </p>

      <Link href="/">
        <button className="btn-contact" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Seguir Explorando
        </button>
      </Link>
    </div>
  );
}
