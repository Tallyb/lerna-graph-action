import {buildGraph} from './graph';
import {generateImage} from './image';
import Path from 'path';
import * as core from '@actions/core';

export async function run(): Promise<void> {
  try {
    const cwd: string =
      core.getInput('rootPath') || process.env.LERNA_ROOT || process.cwd();
    core.debug(`Creating a graph on ${cwd}`);
    const imagePath = Path.resolve(process.cwd(), core.getInput('imagePath'));
    const graph = await buildGraph(cwd);
    await generateImage(graph, imagePath);
    core.debug(`Creating image ${cwd}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}
run();
