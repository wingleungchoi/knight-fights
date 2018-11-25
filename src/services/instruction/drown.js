import * as R from 'ramda';

const drown = (game, instruction) => {
  const newPos = game[instruction.knight][0];
  debugger;
  if (newPos[0] < 0 || newPos[0] > 7 || newPos[1] < 0 || newPos[1] > 7) {
    const drownedKnightUnderWater = R.pipe(
      R.update(0, null),
      R.update(1, 'DROWNED'),
      R.update(2, null),
      R.update(3, 0),
      R.update(4, 0),
    )(game[instruction.knight]);
    const gameAfterDrowningKnight = R.set(R.lensProp(instruction.knight), drownedKnightUnderWater, game);
    const carriedEquipment =  game[instruction.knight][2];
    if (carriedEquipment === null) {
      return gameAfterDrowningKnight;
    }
    let oldPos;
    switch (instruction.direction) {
      case 'N':
        oldPos = [newPos[0] + 1, newPos[1]];
        break;
      case 'S':
        oldPos = [newPos[0] - 1, newPos[1]];
        break;
      case 'W':
        oldPos = [newPos[0], newPos[1] + 1];
        break;
      case 'E':
        oldPos = [newPos[0], newPos[1] - 1];
        break;
      default:
        break;
    }
    const notCarriedEquipment = R.pipe(
      R.update(0, oldPos),
      R.update(1, false)
    )(game[carriedEquipment]);
    const gameAfterDrowningKnightsAndRemaingEquipments = R.set(R.lensProp(carriedEquipment), notCarriedEquipment, gameAfterDrowningKnight);
    return gameAfterDrowningKnightsAndRemaingEquipments;
  }
  return game;
}

export {
  drown
}
