import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

/**
 * Converts an image to the specified format and saves it to the destination
 * 
 * @param {string} source - The path to the source image file
 * @param {string} format - The target image format (e.g., jpg, png, webp)
 * @param {string} destination - The path to save the converted image file (without extension)
 * @param {boolean} verbose - Whether to enable verbose logging
 */
const convertImage = async (source, format, destination, verbose = false) => {
    try {
      if (verbose) {
        console.log(`Starting conversion of ${source} to format: ${format}`);
      }
  
      // Check if the source file exists
      if (!fs.existsSync(source)) {
        throw new Error(`Source file does not exist: ${source}`);
      }
  
      // Supported formats
      const validFormats = ['jpeg', 'jpg', 'png', 'webp', 'tiff', 'gif'];
      if (!validFormats.includes(format)) {
        throw new Error(`Invalid format: ${format}. Supported formats: ${validFormats.join(', ')}`);
      }
  
      // Create destination directory if it doesn't exist
      const destDir = path.dirname(destination);
      if (!fs.existsSync(destDir)) {
        if (verbose) {
          console.log(`Creating destination directory: ${destDir}`);
        }
        fs.mkdirSync(destDir, { recursive: true });
      }
  
      // Set the file extension based on the format
      const outputFilePath = `${destination}.${format}`;
  
      if (verbose) {
        console.log(`Saving converted image to ${outputFilePath}`);
      }
  
      // Convert the image and save to the output path
      await sharp(source)
        .toFormat(format)
        .toFile(outputFilePath);
  
      console.log(`Image successfully converted to ${format} and saved at: ${outputFilePath}`);
      return outputFilePath;
    } catch (error) {
      console.error(`Error during conversion: ${error.message}`);
      throw error;
    }
  };
  
  export default convertImage;