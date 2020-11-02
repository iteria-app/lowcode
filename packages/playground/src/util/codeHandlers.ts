export const addSnippetToCode = (
  code: string,
  snippet: string,
  end: number | null,
) => {
  if (!snippet) return console.warn('No code snippet was provided');

  if (!end) return console.warn('Element was not found in the code');

  const lineArray = code.split('\n');
  lineArray.splice(end + 1, 0, snippet);

  return lineArray.join('\n');
};

export const cloneElementInCode = (
  code: string,
  start: number | null,
  end: number | null,
) => {
  if (!start || !end) return console.warn('Element was not found in the code');

  const lineArray = code.split('\n');
  const cloneLines: Array<string> = [];

  for (let i = start; i <= end; i++) {
    cloneLines.push(lineArray[i]);
  }

  lineArray.splice(end + 1, 0, ...cloneLines);
  return lineArray.join('\n');
};

export const deleteElementInCode = (
  code: string,
  start: number | null,
  end: number | null,
) => {
  if (!start || !end) return console.warn('Element was not found in the code');

  const lineArray = code.split('\n');
  return [...lineArray.slice(0, start), ...lineArray.slice(end + 1)].join('\n');
};
