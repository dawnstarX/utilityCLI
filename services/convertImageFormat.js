import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

/**
 *  This utility function verifies the validity of the source image file and the target format.
 * 
 * @param {string} source - The path to the source image file.
 * @param {string} format - The target format to which the image is to be converted. 
 * @throws {Error} Throws an error if:
 * - The source file does not exist.
 * - The source file does not have a valid image format.
 * - The specified format for conversion is not valid. 
 * @returns {void} This function does not return a value.
 */
const checkSource = (source, format) => {

    const validFormats = ['jpeg', 'jpg', 'png', 'webp', 'tiff', 'gif'];

    // Check if the source file exists
    if (!fs.existsSync(source)) throw new Error(`Source file does not exist: ${source}`);
    const fileExtension = path.extname(source).slice(1).toLowerCase();

    // Check if the file has a valid image format
    if (!validFormats.includes(fileExtension)) throw new Error(`Invalid Source file format: .${fileExtension} Supported formats are: ${validFormats.join(', ')}`);

    if (!validFormats.includes(format)) throw new Error(`Invalid value for format: ${format}. Supported formats: ${validFormats.join(', ')}`);
}

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
        if (verbose) console.log(`Starting conversion of ${source} to format: ${format}`);

        // checks for source file and format
        checkSource(source, format);

        // extracting directory and filename
        const destDir = destination.endsWith('/') ? destination : path.dirname(destination);
        const filename = destination.endsWith('/') ?    path.parse(source).name: path.parse(destination).name;

        // Create destination directory if it doesn't exist
        if (!fs.existsSync(destDir)) {
            if (verbose) console.log(`Creating destination directory: ${destDir}`);
            fs.mkdirSync(destDir, { recursive: true });
        }

        // Set the file extension based on the format
        const outputFilePath = path.join(destDir, `${filename}.${format}`);

        if (verbose) console.log(`Saving converted image to ${outputFilePath}`);

        // Convert the image and save to the output path
        await sharp(source)
            .toFormat(format)
            .toFile(outputFilePath);

        console.log(`Image successfully converted to ${format} and saved at: ${outputFilePath}`);
        return outputFilePath;
    } catch (error) {
        return Promise.reject(error);
    }
};

  
export default convertImage;