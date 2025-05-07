import sharp from 'sharp';
import { normalizePath } from 'obsidian';
import { promises as fs } from 'fs'; // Node.js file system promises

const originalImagePath = normalizePath('path/to/your/vault/Photo_Journal/YYYY-MM-DD/your-photo.jpg');
const thumbnailOutputDir = normalizePath('.obsidian/plugins/obsidian-lensloop/thumbnails'); // Example output dir
const thumbnailFileName = 'thumb_' + yourPhotoFileName; // Define a naming convention
const thumbnailPath = normalizePath(`<span class="math-inline">\{thumbnailOutputDir\}/</span>{thumbnailFileName}`);

const thumbnailWidth = 200; // Define your desired thumbnail width
const thumbnailHeight = 200; // Define your desired thumbnail height (or use .resize(width, height, { fit: 'cover' }))

try {
    // Ensure the thumbnail directory exists
    await fs.mkdir(thumbnailOutputDir, { recursive: true });

    await sharp(originalImagePath)
        .resize(thumbnailWidth, thumbnailHeight, { fit: 'inside' }) // Or 'cover', depending on desired aspect ratio handling
        .toFile(thumbnailPath);

    console.log('Thumbnail generated:', thumbnailPath);

    // Now you can use thumbnailPath when rendering the image in your note

} catch (error) {
    console.error("Error generating thumbnail:", error);
}