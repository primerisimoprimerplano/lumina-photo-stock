"use server";

import { supabase } from '../../../lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData) {
  const title = formData.get('title');
  const content = formData.get('content');
  const published = formData.get('published') === 'true';
  
  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const { error } = await supabase
    .from('posts')
    .insert([{ title, slug, content, published }]);

  if (error) {
    console.error('Error creating post:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  redirect('/admin/blog');
}

export async function deletePost(id) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting post:', error);
    return { success: false, error: error.message };
  }

  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}
