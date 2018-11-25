import * as path from 'path';
import { expect } from 'chai';
import { play } from 'src/services/instruction'
import { initialize } from 'src/models/game';

describe('Instruction', () => {
  describe('#play(game, instruction)', () => {
    it('should return an new game object (no mutation) following a valid instruction', async () => {
      const newGame = initialize();
      const gameAfterFirstPlay = play(newGame, {knight: 'red', direction: 'S'});
      expect(gameAfterFirstPlay.red).to.eql([[1, 0], 'LIVE', null, 1, 1]);
    });

    it('should move a item with it master knight', async () => {
      const newGame = initialize();
      newGame.red = [[1, 0], 'LIVE', 'magic_staff', 1, 1];
      newGame.magic_staff = [[1, 0], true];
      const gameAfterFirstPlay = play(newGame, {knight: 'red', direction: 'E'});
      expect(gameAfterFirstPlay.red).to.eql([[1, 1], 'LIVE', 'magic_staff', 1, 1]);
      expect(gameAfterFirstPlay.magic_staff).to.eql([[1, 1], true]);
    });

    it('should not move a drwoned/dead knight', async () => {
      const newGame = initialize();
      newGame.red = [null, 'DROWNED', null, 0, 0];
      newGame.magic_staff = [[1, 0], true];
      const gameAfterFirstPlay = play(newGame, {knight: 'red', direction: 'E'});
      expect(gameAfterFirstPlay.red).to.eql([null, 'DROWNED', null, 0, 0]);
      expect(gameAfterFirstPlay.magic_staff).to.eql([[1, 0], true]);
      newGame.blue = [[7, 0], 'DEAD', null, 0, 0];
      const gameAfterSecondPlay = play(gameAfterFirstPlay, {knight: 'blue', direction: 'E'});
      expect(gameAfterSecondPlay.blue).to.eql([[7, 0], 'DEAD', null, 0, 0]);
      expect(gameAfterSecondPlay.magic_staff).to.eql([[1, 0], true]);
    });
  });
});
