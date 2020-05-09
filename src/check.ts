import { PackageMeta } from './common';
import { prepare } from './prepare';
import { YarnMessage, install } from './install';
import { start } from './start';
import { fetchPackageMeta } from './package-meta';

export interface CheckResult extends PackageMeta {
  yarnMessages: YarnMessage[];
  runOutput?: string;
}

export async function check(
  packageName: string,
  yarnCommand: string,
): Promise<CheckResult> {
  console.log('debug: Will fetch package meta');
  const packageMeta = await fetchPackageMeta(packageName);
  console.log('debug: Will prepare');
  await prepare(packageMeta);
  console.log('debug: Will install');
  const yarnMessages = await install(packageName, yarnCommand);
  let runOutput: string | undefined = undefined;
  if (yarnMessages.length === 0) {
    console.log('debug: Will start');
    runOutput = await start(packageName, yarnCommand);
  }
  console.log('debug: Check done');
  return {
    ...packageMeta,
    yarnMessages,
    runOutput,
  };
}
