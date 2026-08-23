"use server";

import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

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
