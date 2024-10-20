import path from 'path';
import fs from 'fs';
import checkSourceAndTarget from './util/checkSource.js'
import ffmpeg from 'fluent-ffmpeg';

/**
 * Converts a video file to another vedio or audio format.
 *
 * @param {string} source - The path to the source video file.
 * @param {string} outputFormat - The desired output format (e.g., 'mp4', 'mp3').
 * @param {boolean} verbose - A flag to enable verbose logging during the conversion process.
 * 
 * @throws {Error} If the source file format is invalid or if there is an error during conversion.
 * 
 * @returns {Promise<string>} A promise that resolves with the output file name upon successful conversion.
 */
const convertVideo = async (source, outputFormat, verbose) =>{
    try{
        const validInputFormats = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'mpeg', 'mpg', 'webm', '3gp', 'ogv', 'ts', 'dv', 'm4v', 'gif', ''];
        const validOutputFormats = [...validInputFormats, 'mp3', 'wav', 'aac', 'ogg', 'flac', 'wma', 'm4a', 'aiff', 'aif', 'opus', 'ac3', 'dts', 'amr', 'au', 'gsm', 'mpc'];
        if(verbose) console.log('checking the validity of source and output file and format');
        // checking for source and target formats
        checkSourceAndTarget(source, validInputFormats, outputFormat, validOutputFormats);

        const outputFileName = `${path.basename(source, path.extname(source))}.${outputFormat}`;

        return new Promise((resolve, reject) => {
            let command = ffmpeg(source)
              .toFormat(outputFormat)
              .on('start', () => {
                if (verbose) {
                  console.log(`Starting conversion of ${source} to ${outputFormat}...`);
                }
              })
              .on('end', () => {
                if (verbose) {
                  console.log(`Conversion completed: ${outputFileName}`);
                }
                resolve(outputFileName);
              })
              .on('error', (err) => {
                console.error(`Conversion error: ${err.message}`);
                reject(err);
              });
        
            command.save(outputFileName);
          });
    } catch(err){
        return Promise.reject(err);
    }
}

export default convertVideo;
