"use server";

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';
import { supabase } from '../../../lib/supabase';

// Cloudinary auto-configures using process.env.CLOUDINARY_URL

export async function deletePhoto(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result === 'ok') {
      revalidatePath('/admin/galerias');
      // Extract folder name from public_id (e.g., "lumina/naturaleza/foto" -> "naturaleza")
      const parts = publicId.split('/');
      if (parts.length >= 2) {
        revalidatePath(`/tema/${parts[parts.length - 2]}`);
      }
      return { success: true };
    }
    return { success: false, error: 'No se pudo eliminar la foto.' };
  } catch (error) {
    console.error('Error deleting photo:', error);
    return { success: false, error: error.message };
  }
}

export async function savePhotoOrder(categoryId, orderedPhotoIds) {
  try {
    // orderedPhotoIds es un array de public_id en el nuevo orden
    const { error } = await supabase
      .from('categories')
      .update({ photo_order: orderedPhotoIds })
      .eq('id', categoryId);

    if (error) throw error;
    
    revalidatePath(`/admin/galerias`);
    revalidatePath(`/tema/${categoryId}`);
    return { success: true };
  } catch (error) {
    console.error('Error saving photo order:', error);
    return { success: false, error: error.message };
  }
}
