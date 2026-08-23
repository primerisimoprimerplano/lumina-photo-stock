import React from 'react';

export default function TrustBadges() {
  return (
    <div style={{ backgroundColor: '#111', padding: '3rem 1rem', borderTop: '1px solid #222', borderBottom: '1px solid #222', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* Separator with text */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
          <div style={{ height: '1px', backgroundColor: '#333', flexGrow: 1, maxWidth: '200px' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ccc', fontSize: '1.1rem', fontWeight: 'bold' }}>
            <span>Compra segura bajo el respaldo de</span>
          </div>
          <div style={{ height: '1px', backgroundColor: '#333', flexGrow: 1, maxWidth: '200px' }}></div>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4rem', color: '#888' }}>
          
          {/* ISO 27001 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
            <div style={{ textAlign: 'left', lineHeight: '1.1' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#888', textTransform: 'uppercase' }}>Infraestructura</div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#ccc' }}>ISO <span style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>27001</span></div>
            </div>
          </div>

          {/* Secure Payment */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ position: 'relative' }}>
              <svg width="45" height="35" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10" stroke="#111" strokeWidth="2"></line>
              </svg>
              <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', backgroundColor: '#111', borderRadius: '50%', padding: '2px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#4ade80" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <polyline points="9 12 11 14 15 10" stroke="#111" strokeWidth="3"></polyline>
                </svg>
              </div>
            </div>
            <div style={{ textAlign: 'left', lineHeight: '1.1', marginLeft: '0.5rem' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#ccc' }}>Secure</div>
              <div style={{ fontSize: '0.9rem' }}>Payment</div>
            </div>
          </div>

          {/* SSL Encryption */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="35" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              <polyline points="10 16 12 18 16 14" stroke="#111" strokeWidth="3"></polyline>
            </svg>
            <div style={{ textAlign: 'left', lineHeight: '1.1' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#ccc', letterSpacing: '1px' }}>SECURE</div>
              <div style={{ fontSize: '0.7rem', textTransform: 'uppercase' }}>SSL Encryption</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
