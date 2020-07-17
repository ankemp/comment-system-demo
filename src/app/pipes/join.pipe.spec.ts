import { JoinPipe } from './join.pipe';

describe('JoinPipe', () => {
  let pipe: JoinPipe;

  beforeEach(() => {
    pipe = new JoinPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform array into string with \',\' separator', () => {
    const array = ['one', 'two', 'three', 'four'];
    expect(pipe.transform(array)).toBe('one, two, three, four');
  });

  it('should transform array into string with \'::\' separator', () => {
    const array = ['one', 'two', 'three', 'four'];
    expect(pipe.transform(array, '::')).toBe('one::two::three::four');
  });
});