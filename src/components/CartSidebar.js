"use client";

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Image from 'next/image';

export default function CartSidebar() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, cartTotal } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

    const [legalAccepted, setLegalAccepted] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = async () => {
    if (!legalAccepted) return;
    setIsProcessing(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cartItems }),
      });
      
      const { url } = await response.json();
      if (url) {
        window.location.href = url; // Redirect to Stripe Checkout
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={closeCart}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 1040,
        }}
      />
      
      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: '450px',
        background: '#111',
        borderLeft: '1px solid var(--border)',
        zIndex: 1050,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        transform: 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 300, color: 'var(--accent)' }}>Tu Carrito</h2>
          <button 
            onClick={closeCart}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '1.5rem',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '3rem' }}>
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.cartItemId} style={{
                display: 'flex',
                gap: '1rem',
                borderBottom: '1px solid var(--border)',
                paddingBottom: '1rem',
              }}>
                <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '4px', overflow: 'hidden' }}>
                  <Image src={item.url || `/api/local-image?path=${encodeURIComponent(item.path)}`} alt={item.name} fill style={{ objectFit: 'cover' }} unoptimized={true} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{item.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>Tamaño: {item.size}</p>
                  <p style={{ margin: '0.5rem 0 0 0', fontWeight: 'bold', color: 'var(--accent)' }}>${item.price}.00 USD</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.cartItemId)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    height: 'fit-content'
                  }}
                  title="Eliminar del carrito"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid var(--border)',
            background: 'rgba(255, 255, 255, 0.02)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
              <span>Total:</span>
              <span style={{ color: 'var(--accent)' }}>${cartTotal}.00 USD</span>
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <input 
                type="checkbox" 
                id="legal-terms" 
                checked={legalAccepted}
                onChange={(e) => setLegalAccepted(e.target.checked)}
                style={{ marginTop: '0.2rem', cursor: 'pointer', width: '1.2rem', height: '1.2rem' }}
              />
              <label htmlFor="legal-terms" style={{ fontSize: '0.8rem', color: '#ccc', lineHeight: '1.4', cursor: 'pointer' }}>
                He leído y acepto las <a href="/licencias" target="_blank" style={{ color: 'var(--accent)', textDecoration: 'underline' }} onClick={(e) => e.stopPropagation()}>Licencias y Uso</a>, los <a href="/terminos" target="_blank" style={{ color: 'var(--accent)', textDecoration: 'underline' }} onClick={(e) => e.stopPropagation()}>Términos y Condiciones</a> y las <a href="/privacidad" target="_blank" style={{ color: 'var(--accent)', textDecoration: 'underline' }} onClick={(e) => e.stopPropagation()}>Políticas de Privacidad</a>.
              </label>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={isProcessing || !legalAccepted}
              style={{
                width: '100%',
                padding: '1rem',
                background: (isProcessing || !legalAccepted) ? '#333' : 'var(--accent)',
                color: (isProcessing || !legalAccepted) ? '#888' : '#000',
                border: 'none',
                borderRadius: '4px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: (isProcessing || !legalAccepted) ? 'not-allowed' : 'pointer',
                opacity: 1,
                transition: 'all 0.2s'
              }}
            >
              {isProcessing ? 'PROCESANDO...' : 'PROCEDER AL PAGO'}
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '1rem 0 0 0' }}>Pagos seguros procesados por Stripe</p>
          </div>
        )}
      </div>
    </>
  );
}
