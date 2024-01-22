const fs = require('fs');
const path = require('path');

const secretDirectoryName = 'secret-folder';
const subdirectoryPath = path.join(__dirname, secretDirectoryName);

fs.readdir(subdirectoryPath, { withFileTypes: true }, (err, files) => {
  console.log(`\nFiles in the subdirectory '${secretDirectoryName}':`);

  if (err) {
    console.error(err);
  } else {
    files.forEach((file) => {
      const filePath = path.join(subdirectoryPath, file.name);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats for ${file.name}:`, err);
        } else if (stats.isFile()) {
          const fileNameWithoutExtension = path.basename(
            file.name,
            path.extname(file.name),
          );
          const fileSize = stats.size;
          const fileExtension = path.extname(file.name);

          console.log(
            `File: ${fileNameWithoutExtension} - ${fileExtension.slice(
              1,
            )} - ${fileSize}kb`,
          );
        }
      });
    });
  }
});
