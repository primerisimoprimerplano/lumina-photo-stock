const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

// Set environment variable before requiring cloudinary
process.env.CLOUDINARY_URL = "cloudinary://988598497533237:kx47uL-wT2mFkAgzWz03V6xgMZk@eqijlhyf";
const cloudinary = require('cloudinary').v2;

const uploadFolder = "lumina/naturaleza";
const sourceFolder = "V:\\STOCK PHOTOS\\GALERIA 4\\LUMINA PHOTO STOCK";

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getFileHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

function uploadBufferToCloudinary(buffer, fileName) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { 
        folder: uploadFolder, 
        public_id: fileName.split('.')[0], // Remove extension for public_id
        overwrite: true,
        resource_type: 'image'
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}

async function uploadImages() {
  console.log(`Analyzing directory: ${sourceFolder}`);
  
  if (!fs.existsSync(sourceFolder)) {
    console.error(`Folder not found: ${sourceFolder}`);
    return;
  }

  const allFiles = fs.readdirSync(sourceFolder);
  const imageFiles = allFiles.filter(file => file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg'));
  
  console.log(`Found ${imageFiles.length} image files. Finding duplicates...`);
  
  const seenHashes = new Set();
  const uniqueFiles = [];
  const duplicates = [];

  for (const file of imageFiles) {
    const fullPath = path.join(sourceFolder, file);
    const hash = getFileHash(fullPath);
    if (seenHashes.has(hash)) {
      duplicates.push(file);
    } else {
      seenHashes.add(hash);
      uniqueFiles.push(file);
    }
  }
  
  console.log(`Uploading ${uniqueFiles.length} unique images to Cloudinary with compression...`);

  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < uniqueFiles.length; i++) {
    const file = uniqueFiles[i];
    const fullPath = path.join(sourceFolder, file);
    console.log(`[${i+1}/${uniqueFiles.length}] Compressing and uploading ${file}...`);
    
    try {
      // Compress the image to a web-friendly size (max width 2500px, 80% quality)
      const compressedBuffer = await sharp(fullPath)
        .resize({ width: 2500, withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();

      await uploadBufferToCloudinary(compressedBuffer, file);
      successCount++;
    } catch (error) {
      console.error(`Error uploading ${file}:`, error.message);
      errorCount++;
    }
    
    // Add a small delay to respect API rate limits
    await delay(300);
  }

  console.log(`Upload process finished!`);
  console.log(`Successfully uploaded: ${successCount}`);
  if (errorCount > 0) console.log(`Failed to upload: ${errorCount}`);
}

uploadImages();
