import { getOffset } from '../util/highlight';

const iFrame = document.querySelector('iframe');

const innerDoc = iFrame!.contentDocument || iFrame!.contentWindow!.document;

innerDoc.addEventListener('mouseover', (e: MouseEvent) => {
  const styles = getOffset(e.target!);
  const mainDiv = innerDoc.getElementById('buttonContainer')!;

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
