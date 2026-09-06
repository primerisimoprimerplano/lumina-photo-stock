"use client";

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Image from 'next/image';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function CartSidebar() {
  const { isCartOpen, closeCart, cartItems, removeFromCart, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [legalAccepted, setLegalAccepted] = useState(false);

  if (!isCartOpen) return null;

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
    currency: "USD",
    intent: "capture",
  };

  const createOrder = async (data, actions) => {
    try {
      const response = await fetch("/api/paypal/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });
      
      const orderData = await response.json();

      if (orderData.id) {
        return orderData.id;
      } else {
        const errorDetail = orderData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      throw error;
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const response = await fetch("/api/paypal/capture-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: data.orderID }),
      });
      
      const orderData = await response.json();
      
      const errorDetail = orderData?.details?.[0];
      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        return actions.restart();
      } else if (errorDetail) {
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // Successful capture!
        console.log("Capture result", orderData);
        clearCart();
        window.location.href = "/success";
      }
    } catch (error) {
      console.error("Error capturing PayPal payment:", error);
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
            
            <div style={{ position: 'relative', zIndex: 0, opacity: legalAccepted ? 1 : 0.5, pointerEvents: legalAccepted ? 'auto' : 'none' }}>
              <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons
                  style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                />
              </PayPalScriptProvider>
            </div>
            {!legalAccepted && (
              <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#ff6b6b', margin: '0.5rem 0 0 0' }}>
                Debes aceptar los términos para proceder al pago
              </p>
            )}
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', margin: '1rem 0 0 0' }}>Pagos seguros procesados por PayPal</p>
          </div>
        )}
      </div>
    </>
  );
}
