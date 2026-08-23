"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SecretAdminTrigger() {
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSecretClick = (e) => {
    e.preventDefault();
    setShowPrompt(true);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
        setPassword('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <span 
        onClick={handleSecretClick}
        style={{
          cursor: 'default',
          color: 'transparent',
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          fontSize: '10px',
          userSelect: 'none',
          padding: '20px',
          zIndex: 50
        }}
        title=""
      >
        Lumina v1.0
      </span>

      {showPrompt && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backdropFilter: 'blur(5px)'
        }}>
          <form 
            onSubmit={handleLogin}
            style={{
              backgroundColor: '#111',
              padding: '2rem',
              borderRadius: '8px',
              border: '1px solid #333',
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <p style={{ color: '#fff', margin: 0, textAlign: 'center', fontFamily: 'monospace' }}>
              {error ? <span style={{ color: '#ff4a4a' }}>ACCESO DENEGADO</span> : 'SISTEMA CENTRAL'}
            </p>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              style={{
                backgroundColor: '#000',
                border: '1px solid #333',
                color: '#fff',
                padding: '0.5rem',
                outline: 'none',
                fontFamily: 'monospace',
                textAlign: 'center',
                letterSpacing: '3px'
              }}
            />
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                type="button" 
                onClick={() => setShowPrompt(false)}
                style={{ flex: 1, padding: '0.5rem', backgroundColor: '#333', border: 'none', color: '#fff', cursor: 'pointer' }}
              >
                CANCELAR
              </button>
              <button 
                type="submit"
                style={{ flex: 1, padding: '0.5rem', backgroundColor: '#d4af37', border: 'none', color: '#000', cursor: 'pointer', fontWeight: 'bold' }}
              >
                ENTRAR
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
