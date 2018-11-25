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
  const gameAfterMovedKnights = R.set(R.lensProp(instruction.knight), knightWithNewPos, game);
  const carriedEquipment =  game[instruction.knight][2];
  if (carriedEquipment === null) {
    return gameAfterMovedKnights;
  }
  const equipmentWithNewPos = R.update(0, newPos, game[carriedEquipment]);
  const gameAfterMovedKnightsAndEquipments = R.set(R.lensProp(carriedEquipment), equipmentWithNewPos, gameAfterMovedKnights);
  return gameAfterMovedKnightsAndEquipments;
}

export {
  moveKnight
}
