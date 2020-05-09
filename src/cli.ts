import * as yargs from 'yargs';

const { argv } = yargs
  .usage('Usage: $0 <command> [options]')
  .command({
    command: 'package',
    describe: 'Checks that a package installs and runs properly with berry',
    builder(cmdYargs) {
      // TODO: Peer dependencies
      return cmdYargs.positional('name', {
        type: 'string',
        description: 'Name of the package to check',
      });
    },
    async handler(args) {
      const { check } = await import('./check');
      const name = args._[1];
      if (!name) {
        throw new Error('Must specify a name for the package to check');
      }
      const result = await check(name, 'yarn');
      console.log(result);
    },
  })
  .command({
    command: 'depended',
    describe: 'Checks that 36 packages from the most depended packages install and run properly with berry',
    builder(cmdYargs) {
      // TODO: Peer dependencies
      return cmdYargs.positional('page', {
        type: 'number',
        description: 'Page number',
      });
    },
    async handler(args) {
      const { fetchDependedPackages } = await import('./depended');
      const { check } = await import('./check');
      const page = args._[1] as any as number || 0;
      const pkgs = await fetchDependedPackages(page);
      for (const [i, pkg] of pkgs.entries()) {
        console.log(`Will check package ${pkg} (${i + 1}/${pkgs.length})`);
        const result = await check(pkg, 'yarn');
        console.log(result);
      }
    },
  })
  .help('h')
  .alias('h', 'help');
