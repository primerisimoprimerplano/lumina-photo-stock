import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imagePath = searchParams.get('path');

  if (!imagePath) {
    return new NextResponse('Path is required', { status: 400 });
  }

  try {
    // Only allow reading from V:\STOCK PHOTOS for security
    if (!imagePath.startsWith('V:\\STOCK PHOTOS')) {
      return new NextResponse('Unauthorized path', { status: 403 });
    }

    const fileBuffer = fs.readFileSync(imagePath);
    
    // Determine content type
    const ext = path.extname(imagePath).toLowerCase();
    let contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.webp') contentType = 'image/webp';
    else if (ext === '.gif') contentType = 'image/gif';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error reading local image:', error);
    return new NextResponse('Image not found', { status: 404 });
  }
}
