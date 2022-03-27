import * as fs from 'fs';

const result = fs.readFileSync('./src/dictionary.json', 'utf8');
const words: string[] = JSON.parse(result);

const stripped = words.filter(word => word.length >= 4 && word.length <= 11);

fs.writeFileSync('./scripts/out.json', JSON.stringify(stripped));
