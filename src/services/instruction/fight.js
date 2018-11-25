import * as R from 'ramda';

import { ATTACKER_ADVANTAGE, EQUIPMENTS, KNIGHT_NAMES } from 'src/constants';

const fight = (game, instruction) => {
  const newPos = game[instruction.knight][0];
  const liveAndAtThePosKnight = R.pipe(
    R.pick(R.without([instruction.knight], KNIGHT_NAMES)),
    R.filter((knight, knightName) => (knight[1] === 'LIVE') && R.equals(newPos, knight[0])
    )
  )(game);

  if (R.isNil(liveAndAtThePosKnight) || R.isEmpty(liveAndAtThePosKnight)) {
    // no knight here for fight...
    return game;
  }

  const liveAndAtThePosKnightName = R.pipe(
    R.keys,
    R.head
  )(liveAndAtThePosKnight);

  const attackerEquipment = game[instruction.knight][2];
  const attackerScore = game[instruction.knight][3] + ATTACKER_ADVANTAGE + (attackerEquipment ? EQUIPMENTS[attackerEquipment].attack : 0);
  const defenderEquipment = game[liveAndAtThePosKnightName][2];
  const defenderScore = liveAndAtThePosKnight[liveAndAtThePosKnightName][4] + (defenderEquipment ? EQUIPMENTS[defenderEquipment].defence : 0);

  // defender dies case
  if (attackerScore > defenderScore) {
    const deadKnight = R.pipe(
      R.update(1, 'DEAD'),
      R.update(2, null), // drop equipment
    )(liveAndAtThePosKnight[liveAndAtThePosKnightName]);
    const gameWithEquippedKnights = R.set(R.lensProp(liveAndAtThePosKnightName), deadKnight, game);
    if (R.is(String, defenderEquipment)) {
      const droppedEquipment = R.update(1, false, game[defenderEquipment]);
      const gameAfterDroppedEquipment = R.set(R.lensProp(defenderEquipment), droppedEquipment, gameWithEquippedKnights);
      return gameAfterDroppedEquipment;
    }
    return gameWithEquippedKnights;
  }
  // attacker dies case
  const deadKnight = R.update(1, 'DEAD', game[instruction.knight]);
  const gameWithEquippedKnights = R.set(R.lensProp(instruction.knight), deadKnight, game);
  if (R.is(String, attackerEquipment)) {
    const droppedEquipment = R.update(1, false, game[attackerEquipment]);
    const gameAfterDroppedEquipment = R.set(R.lensProp(attackerEquipment), droppedEquipment, gameWithEquippedKnights);
    return gameAfterDroppedEquipment;
  }
  return gameWithEquippedKnights
}

export {
  fight
};
