const initialize = () => ({
  red: [[0, 0], 'LIVE', null, 1, 1],
  blue: [[7, 0], 'LIVE', null, 1, 1],
  green: [[7, 7], 'LIVE', null, 1, 1],
  yellow: [[0, 7], 'LIVE', null, 1, 1],
  magic_staff: [[5, 2], false],
  helmet: [[5, 5], false],
  dagger: [[2, 5], false],
  axe: [[2, 2], false]
});

export {
  initialize
};
