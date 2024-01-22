const fs = require('fs').promises;
const path = require('path');

const directoryName = path.join(__dirname, 'files');
const destinationDirectory = path.join(__dirname, 'files-copy');

async function copyFile(source, destination) {
  try {
    await fs.copyFile(source, destination);
    console.log(`File ${source} successfully copied to ${destination}.`);
  } catch (err) {
    console.error(`Error copying file ${source}:`, err.message);
  }
}

async function listFiles(directory) {
  try {
    console.log(`List file ${directory}:`);
    const files = await fs.readdir(directory, { withFileTypes: true });
    files.forEach((file) => {
      if (file.isFile()) {
        console.log(`${file.name}-${path.extname(file.name).slice(1)}`);
      }
    });
  } catch (err) {
    console.error(`Error when listing files:`, err.message);
  }
}

async function updateDestinationDirectory() {
  try {
    await listFiles(directoryName);

    const destinationExists = await fs
      .access(destinationDirectory)
      .then(() => true)
      .catch(() => false);

    if (!destinationExists) {
      await fs.mkdir(destinationDirectory);
      console.log('Created folder files-copy.');
    }

    const folderFiles = await fs.readdir(directoryName, {
      withFileTypes: true,
    });

    for (const file of folderFiles) {
      const sourceFile = path.join(directoryName, file.name);
      const destinationFile = path.join(destinationDirectory, file.name);

      const stats = await fs.stat(sourceFile);
      if (stats.isFile()) {
        await copyFile(sourceFile, destinationFile);
      }
    }

    const destinationFiles = await fs.readdir(destinationDirectory);
    for (const file of destinationFiles) {
      const destinationFile = path.join(destinationDirectory, file);

      if (!folderFiles.some((f) => f.name === file)) {
        await fs.unlink(destinationFile);
        console.log(
          `The ${destinationFile} file was removed from the copy because it is not in the source folder.`,
        );
      }
    }

    console.log('Update complete.');
  } catch (err) {
    console.error(
      'Error when updating the contents of the files-copy folder:',
      err.message,
    );
  }
}

//
updateDestinationDirectory();
