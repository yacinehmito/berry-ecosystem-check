process.on('uncaughtException', (error) => {
  console.error(error.stack);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error(error.stack);
  process.exit(1);
});

require('../build/cli');
