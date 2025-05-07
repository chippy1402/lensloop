import sharp from 'sharp';
import { normalizePath } from 'obsidian'; // Useful for cleaning up paths

// Assuming you have the path to the image file within the vault
// You'll likely get this path when you find files in your Photo Journal directory
const imagePath = normalizePath('path/to/your/vault/Photo_Journal/YYYY-MM-DD/your-photo.jpg');

try {
    const metadata = await sharp(imagePath).metadata();

    // Now you can access various metadata properties, e.g.:
    console.log('Image Format:', metadata.format);
    console.log('Image Width:', metadata.width);
    console.log('Image Height:', metadata.height);
    console.log('EXIF Data:', metadata.exif); // Raw EXIF buffer

    // You'll likely need an additional library or some parsing logic
    // to extract specific tags from the raw EXIF buffer (metadata.exif)
    // exifreader, even if not used for initial loading, could potentially
    // help parse a raw EXIF buffer if sharp provides one. Or you might find
    // dedicated EXIF parsing helpers.

} catch (error) {
    console.error("Error reading image metadata:", error);
}