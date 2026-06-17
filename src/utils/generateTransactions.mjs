/* istanbul ignore file */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { generateMockTransactions } from './mockDataGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transactions = generateMockTransactions();

const outputPath = path.resolve(__dirname, '../../public/transactions.json');

fs.writeFileSync(outputPath, JSON.stringify(transactions, null, 2));

console.log(`Generated ${transactions.length} transactions`);
console.log(`Saved to: ${outputPath}`);
