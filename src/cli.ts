import * as yargs from 'yargs';

const { argv } = yargs
  .usage('Usage: $0 <command> [options]')
  .command({
    command: 'check-package',
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
      const result = await check({ name }, 'yarn');
      console.log(result);
    },
  })
  .help('h')
  .alias('h', 'help');
