import { getOffset } from '../util/highlight';

const iFrame = document.querySelector('iframe');
console.log('hello world');

const innerDoc = iFrame!.contentDocument || iFrame!.contentWindow!.document;

innerDoc.addEventListener('mouseover', (e: MouseEvent) => {
  const styles = getOffset(e.target!);
  const mainDiv = innerDoc.getElementById('buttonContainer')!;
  mainDiv.setAttribute(
    'style',
    `height:${styles!.height}px; width:${
      styles!.width
    }px; transform:translate3d(${styles!.left}px, ${styles!.top}px, 0px)`,
  );
});
