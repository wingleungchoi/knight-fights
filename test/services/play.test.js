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

    it('should not move a drownd/dead knight', async () => {
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

    it('should equip when a knight is not equipped', async () => {
      const newGame = initialize();
      newGame.green = [[6, 5], 'LIVE', null, 1, 1];
      newGame.magic_staff = [[6, 6], false];
      const gameAfterFirstPlay = play(newGame, {knight: 'green', direction: 'E'});
      expect(gameAfterFirstPlay.green).to.eql([[6, 6], 'LIVE', 'magic_staff', 1, 1]);
      expect(gameAfterFirstPlay.magic_staff).to.eql([[6, 6], true]);
    });

    it('should equip according the priority', async () => {
      const newGame = initialize();
      newGame.green = [[6, 5], 'LIVE', null, 1, 1];
      newGame.magic_staff = [[6, 6], false];
      newGame.dagger = [[6, 6], false];
      newGame.axe = [[6, 6], false];
      const gameAfterFirstPlay = play(newGame, {knight: 'green', direction: 'E'});
      expect(gameAfterFirstPlay.green).to.eql([[6, 6], 'LIVE', 'axe', 1, 1]);
      expect(gameAfterFirstPlay.magic_staff).to.eql([[6, 6], false]);
      expect(gameAfterFirstPlay.dagger).to.eql([[6, 6], false]);
      expect(gameAfterFirstPlay.axe).to.eql([[6, 6], true]);
    });

    it('should allow basic fight', async () => {
      const newGame = initialize();
      newGame.green = [[6, 5], 'LIVE', null, 1, 1];
      newGame.red = [[6, 6], 'LIVE', null, 1, 1];
      const gameAfterFirstPlay = play(newGame, {knight: 'green', direction: 'E'});
      expect(gameAfterFirstPlay.green).to.eql([[6, 6], 'LIVE', null, 1, 1]);
      expect(gameAfterFirstPlay.red).to.eql([[6, 6], 'DEAD', null, 1, 1]);
    });

    it('should allow fight with equipment', async () => {
      const newGame = initialize();
      newGame.green = [[5, 5], 'LIVE', null, 1, 1];
      newGame.red = [[4, 5], 'LIVE', 'helmet', 1, 1];
      const gameAfterFirstPlay = play(newGame, {knight: 'green', direction: 'N'});
      expect(gameAfterFirstPlay.green).to.eql([[4, 5], 'DEAD', null, 1, 1]);
      expect(gameAfterFirstPlay.red).to.eql([[4, 5], 'LIVE', 'helmet', 1, 1]);
    });

    it('should allow fight with equipment', async () => {
      const newGame = initialize();
      newGame.green = [[4, 5], 'LIVE', 'dagger', 1, 1];
      newGame.red = [[4, 4], 'LIVE', 'axe', 1, 1];
      newGame.dagger = [[4, 5], true];
      newGame.axe = [[4, 4], true];
      const gameAfterFirstPlay = play(newGame, {knight: 'green', direction: 'W'});
      expect(gameAfterFirstPlay.green).to.eql([[4, 4], 'LIVE', 'dagger', 1, 1]);
      expect(gameAfterFirstPlay.red).to.eql([[4, 4], 'DEAD', null, 1, 1]);
      expect(gameAfterFirstPlay.dagger).to.eql([[4, 4], true]);
      expect(gameAfterFirstPlay.axe).to.eql([[4, 4], false]);
    });
  });
});
