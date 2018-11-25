import * as R from 'ramda';

import { EQUIPMENT_NAMES, EQUIPMENT_PRIORITIES } from 'src/constants';

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

export {
  getEquipment
}
