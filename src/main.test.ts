import {run} from './main';
import * as core from '@actions/core';
jest.mock('@actions/core');

describe('main', () => {
  const mockInput = jest.fn();
  const mockFailed = jest.fn();
  Object.defineProperty(core, 'getInput', {value: mockInput});
  Object.defineProperty(core, 'setFailed', {value: mockFailed});

  it(' should run on normal', async () => {
    const INPUTS: Record<string, string> = {
      rootPath: '__fixtures/normal',
      imagePath: 'temp.graph',
    };
    mockInput.mockImplementation((input: string): string => INPUTS[input]);
    await run();
    expect(mockInput).toHaveBeenCalledWith('rootPath');
  });
});
