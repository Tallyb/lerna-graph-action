import {run} from './main';
import * as core from '@actions/core';
import Fs from 'fs';

jest.mock('@actions/core');

describe('main', () => {
  const mockInput = jest.fn();
  const mockFailed = jest.fn();
  Object.defineProperty(core, 'getInput', {value: mockInput});
  Object.defineProperty(core, 'setFailed', {value: mockFailed});
  // eslint-disable-next-line no-console
  Object.defineProperty(core, 'debug', {value: console.log});

  it(' should run on normal', async () => {
    const INPUTS: Record<string, string> = {
      rootPath: '__fixtures__/normal',
      imagePath: 'temp/graph.png',
    };
    mockInput.mockImplementation((input: string): string => INPUTS[input]);
    await run();
    expect(mockInput).toHaveBeenCalledWith('rootPath');
    expect(mockFailed).not.toHaveBeenCalled();
    expect(Fs.statSync('temp/graph.png').size).toBeGreaterThan(20000);
  });
});
