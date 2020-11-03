import { cloneElement, removeElement } from '../util/cacheHandlers';
import { getOffset } from '../util/highlight';

const iFrame = document.querySelector('iframe');

const innerDoc = iFrame!.contentDocument || iFrame!.contentWindow!.document;

export const addBorderFrame = (innerDoc: Document) => {
  const root = innerDoc.querySelector('body');

  root?.addEventListener('mouseover', (e: MouseEvent) => {
    if (e.target === root || !e.target) return;
    const styles = getOffset(e.target);

    const mainDiv = document.getElementById('buttonContainer')!;
    const cloneIcon = document.getElementById('cloneIcon');
    const removeIcon = document.getElementById('removeIcon');
    const icons = mainDiv.children[0].children[0].children;

    for (let i = 0; i < icons.length; i++) {
      if (icons[i] === e.target) return;
    }

    cloneIcon!.onclick = () => {
      //@ts-ignore
      if (e.target.__svelte_meta) {
        //@ts-ignore
        cloneElement(e.target.__svelte_meta);
      } else console.warn('Something went wrong');
    };

    removeIcon!.onclick = () => {
      //@ts-ignore
      if (e.target.__svelte_meta) {
        //@ts-ignore
        removeElement(e.target.__svelte_meta);
      } else console.warn('Something went wrong');
    };

    mainDiv.setAttribute(
      'style',
      `height:${styles.height}px; width:${styles.width}px; transform:translate3d(${styles.left}px, ${styles.top}px, 0px)`,
    );
  });
};

addBorderFrame(innerDoc);
