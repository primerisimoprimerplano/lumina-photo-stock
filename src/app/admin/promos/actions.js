"use server";

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Generate a random code
function generateRandomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'PROMO-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function createPromoCode() {
  const newCode = generateRandomCode();
  
  const { data, error } = await supabase
    .from('promo_codes')
    .insert([{ code: newCode, discount_percentage: 100, is_used: false }])
    .select();

  if (error) {
    console.error("Error creating promo code:", error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/promos');
  return { success: true, data: data[0] };
}

export async function deletePromoCode(id) {
  const { error } = await supabase
    .from('promo_codes')
    .delete()
    .eq('id', id);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/promos');
  return { success: true };
}

export async function getPromoCodes() {
  const { data, error } = await supabase
    .from('promo_codes')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching promo codes:", error);
    return [];
  }

  return data;
}

// Para usar en el checkout
export async function validatePromoCode(code) {
  const { data, error } = await supabase
    .from('promo_codes')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('is_used', false)
    .single();

  if (error || !data) {
    return { valid: false, message: "Código inválido o ya utilizado." };
  }

  return { valid: true, discount: data.discount_percentage, codeId: data.id };
}

export async function redeemPromoCode(codeId) {
  const { data, error } = await supabase
    .from('promo_codes')
    .update({ is_used: true, used_at: new Date().toISOString() })
    .eq('id', codeId)
    .select();

  if (error) {
    return { success: false, error: error.message };
  }
  return { success: true };
}
