#!/usr/bin/env node

import { Command } from 'commander';
const program = new Command();

// Set the CLI version and description
program
  .version('1.0.0')
  .description('A CLI tool for performing various utilities');

// Add a command to say hello
program
  .command('hello <name>')
  .description('Say hello to someone')
  .action((name) => {
    console.log(`Hello, ${name}!`);
  });

  program.parse(process.argv);