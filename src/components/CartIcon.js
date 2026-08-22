"use client";

import React from 'react';
import { useCart } from '../context/CartContext';

export default function CartIcon() {
  const { cartItems, toggleCart } = useCart();
  
  const itemCount = cartItems.length;

  return (
    <button 
      onClick={toggleCart}
      style={{
        background: 'transparent',
        border: '1px solid var(--border)',
        color: 'var(--text-primary)',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.color = 'var(--accent)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.color = 'var(--text-primary)';
      }}
    >
      <span style={{ fontSize: '1.2rem' }}>🛒</span>
      {itemCount > 0 && (
        <span style={{
          background: 'var(--accent)',
          color: '#000',
          fontWeight: 'bold',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
        }}>
          {itemCount}
        </span>
      )}
    </button>
  );
}
