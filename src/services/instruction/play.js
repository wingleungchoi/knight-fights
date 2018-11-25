import * as R from 'ramda';

import { EQUIPMENT_NAMES, EQUIPMENT_PRIORITIES } from 'src/constants';
import { fight } from 'src/services/instruction/fight';

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
  const carriedEqiupment =  game[instruction.knight][2];
  if (carriedEqiupment === null) {
    return gameAfterMovedKnights;
  }
  const equipmentWithNewPos = R.update(0, newPos, game[carriedEqiupment]);
  const gameAfterMovedKnightsAndEquipments = R.set(R.lensProp(carriedEqiupment), equipmentWithNewPos, gameAfterMovedKnights);
  return gameAfterMovedKnightsAndEquipments;
}

const getEquipment = (game, instruction) => {
  const equipment = game[instruction.knight][2];
  if (R.is(String, equipment)) {
    // If a knight with an item moves over another item then they ignore it.
    return game;
  }
  const newPos = game[instruction.knight][0];
  const notCarriedAndAtThePosEquipments = R.pipe(
    R.pick(EQUIPMENT_NAMES),
    R.filter((equipment) =>
      (equipment[1] === false) && R.equals(newPos, equipment[0])
    )
  )(game);

  if (R.keys(notCarriedAndAtThePosEquipments).length > 0) {
    for (let i = 0; i < EQUIPMENT_PRIORITIES.length; i++) {
      const preferredEquipment = EQUIPMENT_PRIORITIES[i];
      const isPreferredEquipmentExisting = R.prop(preferredEquipment, notCarriedAndAtThePosEquipments);
      if (isPreferredEquipmentExisting) {
        const knightWithEquipment = R.update(2, preferredEquipment, game[instruction.knight]);
        const gameWithEquippedKnights = R.set(R.lensProp(instruction.knight), knightWithEquipment, game);
        const equipmentWithUpdatedStatus = R.update(1, true, gameWithEquippedKnights[preferredEquipment]);
        const gameAfterGetEquipment = R.set(R.lensProp(preferredEquipment), equipmentWithUpdatedStatus, gameWithEquippedKnights);
        return gameAfterGetEquipment;
      }
    }
  }
  return game;
}

const play = (game, instruction) => {
  const status = game[instruction.knight][1];
  if (status !== 'LIVE') {
    return game;
  }
  const gameAfterMovedKnights = moveKnight(game, instruction);
  const gameAfterGetEquipment = getEquipment(gameAfterMovedKnights, instruction);
  const gameAfterFight = fight(gameAfterGetEquipment, instruction);
  return gameAfterFight;
}

export {
  play,
};
