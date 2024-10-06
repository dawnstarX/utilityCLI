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

program.parse(process.argv);