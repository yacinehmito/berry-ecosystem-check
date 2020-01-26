import { PackageMeta } from './common';
import { prepare } from './prepare';
import { YarnMessage, install } from './install';
import { run } from './run';

interface Result extends PackageMeta {
  yarnMessages: YarnMessage[];
  runOutput?: string;
}

export async function check(
  packageMeta: PackageMeta,
  yarnCommand: string,
): Promise<Result> {
  await prepare(packageMeta);
  const yarnMessages = await install(packageMeta.name, yarnCommand);
  let runOutput: string | undefined = undefined;
  if (yarnMessages.length === 0) {
    runOutput = await run(packageMeta.name, yarnCommand);
  }
  return {
    ...packageMeta,
    yarnMessages,
    runOutput,
  };
}
