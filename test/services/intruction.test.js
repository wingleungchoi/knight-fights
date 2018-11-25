import * as path from 'path';
import { expect } from 'chai';
import { readFromFile } from 'src/services/instruction'

describe('Instruction', () => {
  describe('#readFromFile(path)', () => {
    it('should return an array when the file matched expected format', async () => {
      const instructions = await readFromFile(path.join(process.env.NODE_PATH, 'test', 'fixtures', 'moves.txt'));
      expect(instructions).to.eql([
        {
          knight: 'R',
          direction: 'S',
        },
        {
          knight: 'R',
          direction: 'S',
        },
        {
          knight: 'B',
          direction: 'E',
        },
        {
          knight: 'G',
          direction: 'N',
        },
        {
          knight: 'Y',
          direction: 'N',
        },
      ])
    });

    it('should raise an error when the file is of wrong format', async () => {
      try {
        const instructions = await readFromFile(path.join(process.env.NODE_PATH, 'test', 'fixtures', 'wrong-moves.txt'));
        expect(instructions).to.not.be(Error);
      } catch (e) {
        expect(e.message).to.equal('Incorrect instruction');
      }
    });
  });
});
