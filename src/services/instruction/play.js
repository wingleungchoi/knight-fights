import { fight } from 'src/services/instruction/fight';
import { drown } from 'src/services/instruction/drown';
import { getEquipment } from 'src/services/instruction/getEquipment';
import { moveKnight } from 'src/services/instruction/moveKnight';

const play = (game, instruction) => {
  const status = game[instruction.knight][1];
  if (status !== 'LIVE') {
    return game;
  }
  const gameAfterMovedKnights = moveKnight(game, instruction);
  const gameAfterDrowningKnight = drown(gameAfterMovedKnights, instruction);
  const updatedStatus = gameAfterDrowningKnight[instruction.knight][1];
  if (updatedStatus === 'DROWNED') {
    return gameAfterDrowningKnight;
  }
  const gameAfterGetEquipment = getEquipment(gameAfterDrowningKnight, instruction);
  const gameAfterFight = fight(gameAfterGetEquipment, instruction);
  return gameAfterFight;
}

export {
  play,
};
