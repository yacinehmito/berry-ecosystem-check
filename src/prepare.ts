import { join as joinPath } from 'path';
import * as fs from 'fs-extra';
import { PackageMeta, resolveTmpDirectory } from './common';

export async function prepare(packageMeta: PackageMeta) {
  const dir = joinPath(resolveTmpDirectory(), packageMeta.name);
  await fs.mkdirp(dir);
  for (const { path, getContent } of templates) {
    await fs.writeFile(joinPath(dir, path), getContent(packageMeta));
  }
}

interface FileTemplate {
  path: string;
  getContent(packageMeta: PackageMeta): string;
}

const templates: FileTemplate[] = [
  {
    path: 'package.json',
    getContent({ name, peerDependencies }) {
      const packageJson = {
        name: `${name}-check`,
        version: '0.1.0',
        scripts: {
          start: 'node index.js',
        },
        dependencies: {
          [name]: '*',
        },
        peerDependencies,
      };
      return JSON.stringify(packageJson, null, 2);
    },
  },
  {
    path: 'index.js',
    getContent({ name }) {
      return `require('${name}');`;
    },
  },
  {
    // This is just an optimization so we can reuse as much as possible
    path: '.yarnrc.yml',
    getContent() {
      return 'enableGlobalCache: true\n';
    },
  },
  {
    // This is to prevent the following error:
    // > This command can only be run from within a workspace of your project
    // > (temp/x isn't a workspace of berry-ecosystem-check/package.json).
    path: 'yarn.lock',
    getContent() {
      return '\n';
    },
  },
];
