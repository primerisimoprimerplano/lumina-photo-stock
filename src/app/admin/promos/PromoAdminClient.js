"use client";

import React, { useState } from 'react';
import { createPromoCode, deletePromoCode } from './actions';

export default function PromoAdminClient({ initialCodes }) {
  const [codes, setCodes] = useState(initialCodes);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const result = await createPromoCode();
    if (result.success) {
      setCodes([result.data, ...codes]);
    } else {
      alert("Error generando código: " + result.error);
    }
    setIsGenerating(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este código?")) return;
    
    const result = await deletePromoCode(id);
    if (result.success) {
      setCodes(codes.filter(c => c.id !== id));
    } else {
      alert("Error eliminando: " + result.error);
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert("Código copiado al portapapeles: " + code);
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={handleGenerate} 
          disabled={isGenerating}
          className="btn-primary"
        >
          {isGenerating ? "Generando..." : "+ Generar Nuevo Código de 1 Uso"}
        </button>
      </div>

      <div style={{ background: '#111', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#222', color: 'var(--text-secondary)' }}>
              <th style={{ padding: '1rem', borderBottom: '1px solid #333' }}>Código</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid #333' }}>Descuento</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid #333' }}>Estado</th>
              <th style={{ padding: '1rem', borderBottom: '1px solid #333' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {codes.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                  No has generado ningún código promocional todavía.
                </td>
              </tr>
            ) : (
              codes.map((promo) => (
                <tr key={promo.id} style={{ borderBottom: '1px solid #222' }}>
                  <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '1.2rem', color: 'var(--accent)' }}>
                    {promo.code}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {promo.discount_percentage}% (Gratis)
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {promo.is_used ? (
                      <span style={{ color: '#ff6b6b', background: 'rgba(255, 107, 107, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>Usado</span>
                    ) : (
                      <span style={{ color: '#51cf66', background: 'rgba(81, 207, 102, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>Válido</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '1rem' }}>
                    <button 
                      onClick={() => handleCopy(promo.code)}
                      style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Copiar
                    </button>
                    <button 
                      onClick={() => handleDelete(promo.id)}
                      style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
