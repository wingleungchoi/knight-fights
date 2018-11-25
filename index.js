import * as R from 'ramda';

import { play, readFromFile, } from 'src/services/instruction'
import { initialize } from 'src/models/game';

const start = async () => {
  const newGame = initialize();
  const instructions = await readFromFile('moves.txt');
  const finalResult = R.reduce(
    (game, instruction) => play(game, instruction),
    newGame,
    instructions
  );
  console.log('final result:', finalResult);
};

start();