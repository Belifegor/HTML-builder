const fs = require('fs');
const path = require('node:path');

const readStream = fs.createReadStream(
  path.resolve(__dirname, 'text.txt'),
  'utf-8',
);

readStream.on('data', (content) => console.log(content));
