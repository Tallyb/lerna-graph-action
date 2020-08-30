import {buildGraph} from '../src/graph';

describe('graph', () => {
  test('generate graph', async () => {
    const res = await buildGraph('__fixtures__/normal');
    expect(res).toMatchSnapshot();
  });
});
