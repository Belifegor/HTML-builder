const fs = require('fs/promises');
const path = require('path');
const fsNoPromises = require('fs');

fs.mkdir(path.join(__dirname, 'project-dist'));
const fileHTML = fsNoPromises.createWriteStream(
  path.join(__dirname, 'project-dist', 'index.html'),
);

async function changeFile() {
  try {
    const readTemplate = fsNoPromises.createReadStream(
      path.join(__dirname, 'template.html'),
      'utf-8',
    );
    const fileNames = await fs.readdir(
      path.join(__dirname, 'components'),
      { withFileTypes: true },
      (files) => {
        files.forEach((file) => file);
      },
    );
    readTemplate.on('data', (chunk) => {
      fileNames.forEach(async (item) => {
        let arrayName = item.name.split('.');
        const newName = arrayName[0];
        const readComponents = await fs.readFile(
          path.join(__dirname, 'components', item.name),
        );
        if (chunk.includes(newName)) {
          chunk = chunk.replace(new RegExp(newName, 'g'), `${readComponents}`);
          fileHTML.write(chunk);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}
changeFile();