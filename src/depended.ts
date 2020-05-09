import fetch from 'node-fetch';

export async function fetchDependedPackages(page: number): Promise<string[]> {
  const offset = Math.floor(page) * 36;
  const response = await fetch(
    `https://www.npmjs.com/browse/depended?offset=${offset}`,
    {
      method: 'get',
      headers: {
        'x-spiferack': '1',
      },
    },
  );
  const data = await response.json();
  return data.packages.map((pkg: { name: string }) => pkg.name);
}
