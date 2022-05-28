import * as fs from 'fs';
import * as path from 'path';

const result = fs.readFileSync(path.resolve(__dirname, './dictionary.json'), 'utf8');
const words: string[] = JSON.parse(result);

const MIN_LENGTH = 6;
const MAX_LENGTH = 6;

const stripped = words.filter(
  word => word.length >= MIN_LENGTH && word.length <= MAX_LENGTH,
);

fs.writeFileSync(
  path.resolve(__dirname, '../src/dictionary.json'),
  JSON.stringify(stripped),
);
