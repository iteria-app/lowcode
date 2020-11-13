import examplePackage from './examplePackage';

export default async (packageName: string) => {
  //   const parsedPackage = JSON.parse(examplePackage);

  //   for (const dependencyName in parsedPackage.dependencies) {
  //     const dependencyVersion = parsedPackage.dependencies[
  //       dependencyName
  //     ].replace('^', '@');

  //     const response = await fetch(
  //       `https://esm.run/${dependencyName}${dependencyVersion}`,
  //     );
  //     console.log(response);
  //     if (!response.ok) {
  //       const responseUnpkg = await fetch(
  //         `https://unpkg.com/${dependencyName}${dependencyVersion}?module`,
  //       );
  //       if (responseUnpkg.ok) return console.log(responseUnpkg);

  //       const responseSkypack = await fetch(
  //         `https://cdn.skypack.dev/${dependencyName}${dependencyVersion}`,
  //       );
  //       console.log(responseSkypack);
  //     }
  //   }
  if (packageName === 'react' || packageName === 'react-dom')
    return `https://cdn.skypack.dev/${packageName}`;
  const response = await fetch(`https://esm.run/${packageName}`);
  console.log(packageName);
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
