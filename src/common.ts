import { resolve as resolvePath } from 'path';

export interface PackageMeta {
  name: string;
  peerDependencies?: { [name in string]: string };
}

export function resolveTmpDirectory(): string {
  return resolvePath(process.cwd(), 'berry-ecosystem-check-tmp');
}
