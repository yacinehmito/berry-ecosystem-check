import fetch from 'node-fetch';
import { PackageMeta } from './common';

export async function fetchPackageMeta(
  packageName: string,
): Promise<PackageMeta> {
  let manifest;
  const encodedPackageName = encodeURIComponent(packageName);
  if (encodedPackageName === packageName) {
    const response = await fetch(
      `https://registry.npmjs.com/${packageName}/latest`,
      { method: 'get' },
    );
    manifest = await response.json();
  } else {
    const response = await fetch(
      `https://registry.npmjs.com/${encodedPackageName}`,
      { method: 'get' },
    );
    const packument = await response.json();
    manifest = packument.versions[packument['dist-tags'].latest];
  }
  return {
    name: packageName,
    peerDependencies: manifest.peerDependencies,
  };
}
