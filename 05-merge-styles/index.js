const fs = require('fs').promises;
const path = require('path');

const stylesDirectory = path.join(__dirname, 'styles');
const distDirectory = path.join(__dirname, 'project-dist');
const outputFile = path.join(distDirectory, 'bundle.css');

async function readStyleFile(file) {
  try {
    const filePath = path.join(stylesDirectory, file);
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (err) {
    console.error(`Ошибка при чтении файла ${file}:`, err.message);
    return '';
  }
}

async function mergeStyles() {
  try {
    const stylesExists = await fs.access(stylesDirectory)
      .then(() => true)
      .catch(() => false);

    if (!stylesExists) {
      console.log('Папка "styles" не существует.');
      return;
    }

    const styleFiles = await fs.readdir(stylesDirectory);

    const cssFiles = styleFiles.filter((file) => path.extname(file) === '.css');

    const stylesArray = await Promise.all(cssFiles.map(readStyleFile));

    await fs.writeFile(outputFile, stylesArray.join('\n'), 'utf-8');

    console.log('Стили успешно объединены в bundle.css.');
  } catch (err) {
    console.error('Ошибка при объединении стилей:', err.message);
  }
}

mergeStyles();