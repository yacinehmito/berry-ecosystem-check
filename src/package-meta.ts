import fetch from 'node-fetch';
import { PackageMeta } from './common';

export async function fetchPackageMeta(
  packageName: string,
): Promise<PackageMeta> {
  const response = await fetch(
    `https://registry.npmjs.com/${packageName}/latest`,
    { method: 'get' },
  );
  const manifest = await response.json();
  return {
    name: packageName,
    peerDependencies: manifest.peerDependencies,
  };
}
