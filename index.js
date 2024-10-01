#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import convertImage from './services/convertImageFormat.js';

const program = new Command();

// Set the CLI version and description
program
  .version('1.0.0')
  .description('A CLI tool for converting images from one format to another');

// Add a command to convert images
program
  .command('cif <source> <type>')
  .description('Convert image from source format to target format')
  .option('-o, --output <destination>', 'Specify the destination output file/directory')
  .action((source, type, options) => {
    const destination = options.output || process.cwd();  // If destination not provided, use current directory
    const outputPath = path.resolve(destination);

    console.log(`Converting ${source} to ${type} format...`);
    console.log(`Saving converted image to ${outputPath}`);
    
  });

program.parse(process.argv);