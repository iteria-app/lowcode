import { getOffset } from '../util/highlight';

const iFrame = document.querySelector('iframe');

const innerDoc = iFrame!.contentDocument || iFrame!.contentWindow!.document;

// const cloneElement = (location: any) => {
//   caches.match(`/controlled/${location.file}`).then((c) => console.log(c));
// };

export const addBorderFrame = (innerDoc: Document) => {
  const root = innerDoc.querySelector('body');
  root?.addEventListener('mouseover', (e: MouseEvent) => {
    if (e.target === root) return;
    const styles = getOffset(e.target!);

    const mainDiv = document.getElementById('buttonContainer')!;
    const cloneIcon = document.getElementById('cloneIcon');

    cloneIcon?.addEventListener(
      'click',
      () => console.log('Clone element'),
      // //@ts-ignore
      // cloneElement(e.target.__svelte_meta),
    );

    const icons = mainDiv.children[0].children[0].children;

    for (let i = 0; i < icons.length; i++) {
      if (icons[i] === e.target) return;
    }

    mainDiv.setAttribute(
      'style',
      `height:${styles!.height}px; width:${
        styles!.width
      }px; transform:translate3d(${styles!.left}px, ${styles!.top}px, 0px)`,
    );
  });
};

addBorderFrame(innerDoc);
