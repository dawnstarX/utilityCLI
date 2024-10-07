import path from 'path';
import fs from 'fs';

/**
 *  This utility function verifies the validity of the source file , source file format and the target format.
 * 
 * @param {string} source - The path to the source file.
 * @param {Array<string>} validSourceFormats - array of valid format for source file
 * @param {string} targetFormat - target format for the output file
 * @param {Array<string>} validTargetFormats - array of valid format for output file
 * @throws {Error} Throws an error if:
 * - The source file does not exist.
 * - The source file does not have a valid image format.
 * - The specified format for conversion is not valid. 
 * @returns {void} This function does not return a value.
 */
const checkSourceAndTarget = (source, validSourceFormats, targetFormat, validTargetFormats) => {

    // Check if the source file exists
    if (!fs.existsSync(source)) throw new Error(`Source file does not exist: ${source}`);
    const fileExtension = path.extname(source).slice(1).toLowerCase();

    // Check if the file has a valid image format
    if (!validSourceFormats.includes(fileExtension)) throw new Error(`Invalid Source file format: .${fileExtension} Supported formats are: ${validSourceFormats.join(', ')}`);

    // check if target format is valid target format
    if (!validTargetFormats.includes(targetFormat)) throw new Error(`Invalid value for format: ${targetFormat}. Supported formats: ${validTargetFormats.join(', ')}`);
}

export default checkSourceAndTarget;