import checkSourceAndTarget from './util/checkSource.js'

const fs = require('fs');
const path = require('path');
const csv = require('csvtojson'); // Use csvtojson npm package for conversion
const checkSourceAndTarget  = require('./util/checkSource.js'); // Assuming this utility function exists

/**
 * Converts a CSV file to JSON format with optional file saving and transposition.
 *
 * @param {string} source - The path to the source CSV file.
 * @param {boolean} shouldSaveToFile - Whether to save the JSON output to a file (true) or log it to the console (false).
 * @param {boolean} shouldTranspose - Whether to transpose the CSV before converting it to JSON.
 * @param {boolean} verbose - Enable verbose logging to display additional details during the conversion process.
 * @returns {Promise<void>} - Returns a Promise that resolves with the JSON output if successful, or rejects with an error.
 * 
 * @throws {Error} - If there is an issue with the file reading, conversion, or writing process.
 */
const convertCSV = async (source, shouldSaveToFile, shouldTranspose, verbose) => {
    try {
        const targetFormat = 'json';
        const validFormats = ['csv'];

        if (verbose) console.log(`Starting conversion of ${source} to format: ${targetFormat}`);

        // Check if source file and formats are valid
        checkSourceAndTarget(source, validFormats, targetFormat, [targetFormat]);

        // Read CSV data
        let csvData = await csv().fromFile(source);

        if (verbose) console.log('CSV data successfully read.');

        // Transpose the CSV if the flag is set
        if (shouldTranspose) {
            if (verbose) console.log('Transposing CSV data...');
            csvData = transposeCSV(csvData);
        }

        // Convert to JSON
        const jsonData = JSON.stringify(csvData, null, 2);

        if (shouldSaveToFile) {
            // Determine the output path (same as CSV but with .json extension)
            const destination = source.replace('.csv', '.json');
            const outputPath = path.resolve(destination);

            // Save the JSON to a file
            fs.writeFileSync(outputPath, jsonData, 'utf8');
            if (verbose) console.log(`JSON successfully saved to ${outputPath}`);
        } else {
            // Log the JSON to the console for quick use
            console.log(jsonData);
        }
    } catch (err) {
        console.error(`Error during conversion: ${err.message}`);
        return Promise.reject(err);
    }
};

/**
 * Transposes a 2D array (list of rows from CSV).
 * 
 * @param {Array} data - The CSV data array.
 * @returns {Array} - The transposed array.
 */
const transposeCSV = (data) => {
    return data[0].map((_, colIndex) => data.map(row => row[colIndex]));
};


export default convertCSV;