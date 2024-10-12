import checkSourceAndTarget from './util/checkSource.js'
import path from 'path';
import fs from 'fs';
import csv from 'csvtojson';

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

        // Reading CSV data as 2D array
        let csvData = await csv({
            noheader: true,
            output: 'csv'
        }).fromFile(source);

        if (verbose) console.log('CSV data successfully read.');

        // Transposing the CSV
        if (shouldTranspose) {
            if (verbose) console.log('Transposing CSV data...');
            csvData = transposeCSV(csvData);
        }

        // converting CSV to JSON
        const jsonCSVData = csvArrayToJson(csvData);
        const jsonData = JSON.stringify(jsonCSVData, null, 2);

        if (shouldSaveToFile) {
            const destination = source.replace('.csv', '.json');
            const outputPath = path.resolve(destination);

            fs.writeFileSync(outputPath, jsonData, 'utf8');
            if (verbose) console.log(`JSON successfully saved to ${outputPath}`);
        } else {
            console.log(jsonData);
        }
    } catch (err) {
        console.error(`Error during conversion: ${err.message}`);
        return Promise.reject(err);
    }
};

/**
 * converts a 2D array into JSON.
 * 
 * @param {Array} csvArray - The CSV data array.
 * @returns {Array} - Array of JS obj.
 */
const csvArrayToJson = (csvArray) => {
    const headers = csvArray[0];
    const rows = csvArray.slice(1);

    const jsonArray = rows.map(row => {
        let obj = {};
        headers.forEach((header, index) => {
            obj[header] = row[index];
        });
        return obj;
    });

    return jsonArray;
};

/**
 * Transponse a 2D array.
 * 
 * @param {Array} csvArray - 2D csv data array.
 * @returns {Array} - Transposed 2D array.s
 */
const transposeCSV = (csvArray) => {
    return csvArray[0].map((_, colIndex) => csvArray.map(row => row[colIndex]));
};

export default convertCSV;