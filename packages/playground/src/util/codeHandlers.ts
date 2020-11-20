import {
  parse as svelteParse,
  walk as svelteWalk,
  //@ts-ignore
} from 'https://unpkg.com/svelte@3.29.3/compiler.mjs';

export const findElementInAST = (body: string, char: number) => {
  const AST = svelteParse(body).html;

  let clickedNode: any;
  //@ts-ignore
  svelteWalk(AST, {
    enter(node: any) {
      if (node.start === char) {
        clickedNode = node;
      }
    },
  });

  return clickedNode;
};

export const addSnippetToCode = (
  body: string,
  startChar: number,
  charCount: number,
  snippet: string,
) => {
  const charArray = body.split('');
  const endChar = startChar + charCount;

  if (!snippet) return console.warn('No code snippet was provided');

  charArray.splice(endChar + 1, 0, snippet);

  return charArray.join('\n');
};

export const cloneElementInCode = (
  body: string,
  startChar: number,
  charCount: number,
) => {
  const charArray = body.split('');
  const endChar =
    charArray[startChar + charCount] === '\n'
      ? startChar + charCount + 1
      : startChar + charCount;

  const cloneChars: Array<string> = [];
  if (endChar === charArray.length) cloneChars.push('\n');

  for (let i = startChar; i < startChar + charCount; i++) {
    cloneChars.push(charArray[i]);
  }

  if (charArray[startChar + charCount] === '\n') cloneChars.push('\n');

  charArray.splice(endChar, 0, ...cloneChars);
  return charArray.join('');
};

export const deleteElementInCode = (
  body: string,
  startChar: number,
  charCount: number,
) => {
  const charArray = body.split('');
  const endChar = startChar + charCount;

  return [...charArray.slice(0, startChar), ...charArray.slice(endChar)].join(
    '',
  );
};

export const stripExtension = (filename: string) => {
  const dot = filename.lastIndexOf('.');
  const hasExtension = dot > 0 && dot < filename.length;
  if (hasExtension) {
    return filename.substring(0, dot);
  }

  return filename;
};
