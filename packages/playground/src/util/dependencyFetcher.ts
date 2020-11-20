export default async (packageName: string) => {
  if (packageName === 'react' || packageName === 'react-dom')
    return `https://cdn.skypack.dev/${packageName}`;
  const response = await fetch(`https://esm.run/${packageName}`);
  if (!response.ok) {
    const responseUnpkg = await fetch(
      `https://unpkg.com/${packageName}?module`,
    );
    if (responseUnpkg.ok) return `https://unpkg.com/${packageName}?module`;

    const responseSkypack = await fetch(
      `https://cdn.skypack.dev/${packageName}`,
    );
    if (responseSkypack.ok) {
      return `https://cdn.skypack.dev/${packageName}`;
    } else return console.log('NENASIEL SOM NIC', packageName);
  } else return `https://esm.run/${packageName}`;
};
