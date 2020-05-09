import { join as joinPath } from 'path';
import * as cp from 'child_process';
import { resolveTmpDirectory } from './common';

export interface YarnMessage {
  name: number;
  data: string;
}

export async function install(
  packageName: string,
  yarnCommand: string,
): Promise<YarnMessage[]> {
  const dir = joinPath(resolveTmpDirectory(), packageName);
  const yarnProcess = cp.spawn(yarnCommand, ['--json'], {
    cwd: dir,
  });
  const yarnMessages: YarnMessage[] = [];
  yarnProcess.stdout.on('data', (data) => {
    const yarnMessages = data
      .toString('utf8')
      .split('\n')
      .map(readYarnMessage)
      .filter(Boolean);
    yarnMessages.push(...yarnMessages);
  });
  yarnProcess.stderr.on('data', (data) => {
    console.error(data.toString('utf8'));
  });
  return new Promise((resolve) => {
    yarnProcess.once('close', () => {
      resolve(yarnMessages);
    });
  });
}

function parseJson(str: string): any {
  try {
    return str ? JSON.parse(str) : undefined;
  } catch (error) {
    console.error('Could not parse JSON');
    throw error;
  }
}

function readYarnMessage(messageStr: string): YarnMessage | undefined {
  const messageObject: { name: unknown; data: unknown } = parseJson(messageStr);
  if (!messageObject || !messageObject.name) {
    return undefined;
  }
  if (typeof messageObject.name !== 'number') {
    throw new Error('Could not read yarn message');
  }
  const { name } = messageObject;
  if (typeof messageObject.data !== 'string') {
    throw new Error('Could not read yarn message');
  }
  const { data } = messageObject;
  return {
    name,
    data,
  };
}
