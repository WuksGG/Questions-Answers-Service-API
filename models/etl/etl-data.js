const path = require('path');
const fs = require('fs');
const parse = require('csv-parse');
require('dotenv').config();

const { client } = require('../../helpers/database');

const [,, modeArg] = process.argv;

const initializeDatabase = async () => {
  process.stdout.write('\x1b[36m\x1b[1mScript started... Populating database.\x1b[0m \n\n');
  const dataFilePath = path.join(__dirname, 'qa.sql');
  try {
    const sqlFileContent = fs.readFileSync(dataFilePath).toString().split(';');
    for (let i = 0; i < sqlFileContent.length - 1; i += 1) {
      const command = sqlFileContent[i].trim();
      // eslint-disable-next-line no-await-in-loop
      await client.query(command);
      process.stdout.write(`\x1b[34m\x1b[1mSuccessfully executed:\x1b[0m \n${command}\n\n`);
    }
    process.stdout.write('\x1b[32m\x1b[1mAll commands successfully executed.\x1b[0m\n\n');
  } catch (e) {
    process.stdout.write('\x1b[31m\x1b[1mScript terminated. The following error has occurred with the script execution:\x1b[0m\n');
    process.stdout.write(`${e.stack}\n\n`);
  }
};

const parseAndInsertData = () => {
  console.log('test');
  return 1;
};

(async () => {
  if (modeArg === '1') {
    await initializeDatabase();
  } else if (modeArg === '2') {
    await parseAndInsertData();
  }
  process.exit();
})();

// process.stdout.write(`${dataFilePath}\n`);
