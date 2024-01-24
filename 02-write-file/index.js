const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');

const filePath = path.join(__dirname, '02-write-file.txt');
const writebleStream = fs.createWriteStream(filePath);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Введите текст или "exit" если хотите завершить процесс:');

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    rl.close();
  }
  writebleStream.write(`${input}\n`);
});

rl.on('close', () => {
  console.log('the end');
  writebleStream.end();
  process.exit();
});
