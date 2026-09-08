import React from 'react';
import { getPromoCodes } from './actions';
import PromoAdminClient from './PromoAdminClient';

export const metadata = {
  title: 'Administrar Promociones | Lumina Photo Stock',
};

export const dynamic = 'force-dynamic';

export default async function PromosAdminPage() {
  const codes = await getPromoCodes();
  
  return (
    <div>
      <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 300 }}>
        Códigos <span style={{ color: 'var(--accent)' }}>Promocionales</span>
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Genera códigos de un solo uso para regalar fotografías a periodistas o medios a cambio de atribución.
      </p>
      
      <PromoAdminClient initialCodes={codes} />
    </div>
  );
}
