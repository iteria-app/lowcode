import svelte from 'svelte/compiler';

export const addSnippetToCode = (
  code: string,
  snippet: string,
  end: number | null,
) => {
  if (!snippet) return console.warn('No code snippet was provided');

  if (end === null) return console.warn('Element was not found in the code');

  const lineArray = code.split('\n');
  lineArray.splice(end + 1, 0, snippet);

  return lineArray.join('\n');
};

export const findElementInAST = (body: string, char: number) => {
  const AST = svelte.parse(body).html;

  let clickedNode: any;
  //@ts-ignore
  svelte.walk(AST, {
    enter(node: any) {
      if (node.start === char) {
        clickedNode = node;
      }
    },
  });

  return clickedNode;
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
