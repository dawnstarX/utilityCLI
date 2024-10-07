#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import convertImage from './services/convertImageFormat.js';

const program = new Command();

// Setting the CLI version and description
program
  .version('1.0.0')
  .description('A CLI tool for mutiple utility');

// command to convert images
program
  .command('cif <source> <format>')
  .description('Convert image from source format to target format')
  .option('-o, --output <destination>', 'Specify the destination output file/directory')
  .option('-v, --verbose', 'Enable verbose mode')
  .action(async(source, format, options) => {
    try {
      const destination = options.output || source;
      const resolvedPath = path.resolve(destination);

      const outputPath = destination.endsWith('/') ? (resolvedPath + '/') : resolvedPath
      const verbose = options.verbose ? true : false;

      await convertImage(source, format, outputPath, verbose)
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  });

// command to convert csv to json
program
  .command('ctj <source>')
  .description('Convert CSV file to JSON format')
  .option('-s, --save', 'Save the output to a JSON file instead of logging to console')
  .option('-t, --transpose', 'Transpose the CSV before converting to JSON')
  .option('-v, --verbose', 'Enable verbose logging')
  .action(async (source, options) => {
    try {
      const verbose = options.verbose ? true : false;
      const shouldSaveToFile = options.save ? true : false;
      const shouldTranspose = options.transpose ? true : false;

      console.log(source, verbose, shouldSaveToFile, shouldTranspose)
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  });

program.parse(process.argv);

/////////////------------------- to do -> check for permission denied files ------------------------------//////////////////////