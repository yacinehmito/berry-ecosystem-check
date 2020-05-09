import { join as joinPath } from 'path';
import * as cp from 'child_process';
import { resolveTmpDirectory } from './common';

export async function start(
  packageName: string,
  yarnCommand: string,
): Promise<string> {
  const dir = joinPath(resolveTmpDirectory(), packageName);
  const yarnProcess = cp.spawn(yarnCommand, ['start'], {
    cwd: dir,
  });
  yarnProcess.stdout.on('data', (data) => {
    console.log(data.toString('utf8'));
  });
  yarnProcess.stderr.on('data', (data) => {
    console.error(data.toString('utf8'));
  });
  return new Promise((resolve) => {
    yarnProcess.once('close', () => {
      resolve('done');
    });
  });
}
