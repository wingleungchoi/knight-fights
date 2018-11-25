import * as fs from 'fs';
import * as R from 'ramda';
import * as util from 'util';
import {  GAME_END, GAME_START, KNIGHT_NAME_MAPPING, } from 'src/constants';

fs.readFileAsync = util.promisify(fs.readFile);

const getInstructionSentencesFromTxt = R.pipe(
  R.split('\n'),
  R.filter((instructionSentence) =>
    R.is(String, instructionSentence) && (instructionSentence.length > 0)
  )
);
const validateInstructionSentences = instructionSentences =>
  (R.last(instructionSentences) === GAME_END) && (R.head(instructionSentences) === GAME_START);

const formatInstructionSentences = (instructionSentences) => {
  const instructionSentencesWithoutGameInfo = R.pipe(R.tail, R.dropLast(1))(instructionSentences);
  return R.map((instructionSentence) => 
    R.pipe(
      R.split(':'),
      (array) => ({
        knight: KNIGHT_NAME_MAPPING[array[0]],
        direction: array[1],
      })
    )(instructionSentence)
  , instructionSentencesWithoutGameInfo);
}

const readFromFile = async (path) => {
  const buffer = await fs.readFileAsync(path);
  const instructionSentences = getInstructionSentencesFromTxt(buffer.toString());
  const validInstructionSentences = validateInstructionSentences(instructionSentences);
  if (!validInstructionSentences) {
    throw new Error('Incorrect instruction');
  }
  return formatInstructionSentences(instructionSentences);
}

export {
  readFromFile
};
