import { FirstThreeWordsPipe } from './first-three-words.pipe';

describe('FirstThreeWordsPipe', () => {
  it('create an instance', () => {
    const pipe = new FirstThreeWordsPipe();
    expect(pipe).toBeTruthy();
  });
});
