import * as R from 'ramda';

const GAME_END = 'GAME-END';
const GAME_START = 'GAME-START';
const KNIGHT_NAME_MAPPING = {
  R: 'red',
  B: 'blue',
  G: 'green',
  Y: 'yellow',
};
const KNIGHT_NAMES = R.values(KNIGHT_NAME_MAPPING);
const EQUIPMENTS = {
  axe: {
    attack: 2,
  },
  dagger: {
    attack: 1,
  },
  helmet: {
    defence: 1,
  },
  magic_staff: {
    attack: 1,
    defence: 1,
  },
};
const EQUIPMENT_NAMES = R.keys(EQUIPMENTS);
const EQUIPMENT_PRIORITIES = ['axe', 'magic_staff', 'dagger', 'helmet'];

export {
  EQUIPMENT_NAMES,
  EQUIPMENT_PRIORITIES,
  EQUIPMENTS,
  GAME_END,
  GAME_START,
  KNIGHT_NAME_MAPPING,
  KNIGHT_NAMES,
};

