import * as R from 'ramda';

const moveKnight = (game, instruction) => {
  const oldPos = game[instruction.knight][0]
  let newPos;
  switch (instruction.direction) {
    case 'N':
      newPos = [oldPos[0] - 1, oldPos[1]];
      break;
    case 'S':
      newPos = [oldPos[0] + 1, oldPos[1]];
      break;
    case 'W':
      newPos = [oldPos[0], oldPos[1] - 1];
      break;
    case 'E':
      newPos = [oldPos[0], oldPos[1] + 1];
      break;
    default:
      break;
  }
  const knightWithNewPos = R.update(0, newPos, game[instruction.knight]);
  const gameWithMovedKnights = R.set(R.lensProp(instruction.knight), knightWithNewPos, game);
  const carriedEqiupment =  game[instruction.knight][2];
  if (carriedEqiupment === null) {
    return gameWithMovedKnights;
  }
  const equipmentWithNewPos = R.update(0, newPos, game[carriedEqiupment]);
  const gameWithMovedKnightsAndEquipments = R.set(R.lensProp(carriedEqiupment), equipmentWithNewPos, gameWithMovedKnights);
  return gameWithMovedKnightsAndEquipments;
}

const play = (game, instruction) => {
  const gameWithMovedKnights = moveKnight(game, instruction);
  return gameWithMovedKnights;
}

export {
  play,
};
