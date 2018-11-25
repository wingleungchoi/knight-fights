import * as fs from 'fs';
import * as util from 'util';
fs.readFileAsync = util.promisify(fs.readFile);

const getInstruction = async (path) => {
  const buffer = await fs.readFileAsync(path);
  console.log('buffer', buffer.toString());
}

getInstruction('./moves.txt');