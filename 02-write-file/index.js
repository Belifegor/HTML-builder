const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const fileName = '02-write-file.txt';
const filePath = path.join(__dirname, fileName); // Используйте абсолютный путь к файлу

const output = fs.createWriteStream(filePath, { flags: 'a' });

function writeToFile() {
  stdin.resume();
  stdout.write(
    "Введите текст для записи в файл (или введите 'exit' либо используйте 'ctrl + c' для завершения): ",
  );

  stdin.once('data', function (data) {
    const input = data.toString().trim();

    if (input.toLowerCase() === 'exit') {
      console.log('Спасибо! Программа завершается.');
      process.exit(0);
    } else {
      output.write(input + '\n', function (err) {
        if (err) {
          console.error('Ошибка при записи в файл:', err);
          process.exit(1);
        }
        console.log('Текст успешно добавлен в файл');
        writeToFile(); // Рекурсивный вызов для продолжения ввода
      });
    }
  });
}

writeToFile();
