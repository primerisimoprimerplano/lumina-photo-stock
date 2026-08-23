import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { password } = await request.json();
    
    // Read the password from environment variables
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (password === adminPassword) {
      // Set a secure HttpOnly cookie
      const cookieStore = await cookies();
      cookieStore.set({
        name: 'admin_session',
        value: 'authenticated',
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json({ success: false, message: 'Contraseña incorrecta' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error de servidor' }, { status: 500 });
  }
}
