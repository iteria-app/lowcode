interface GitlabFile {
  id: string;
  name: string;
  type: string;
  path: string;
  mode: string;
}

function decodeUnicode(base64: string) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
}
export async function gitlabFetchFile(filename: string, privateToken: string) {
  const filenameUrlEnc = encodeURI(filename).replaceAll('/', '%2F');
  const ref = 'campaign-fix'; //'master'//'gitlabAPI-lowcode'
  const projectId = 18967974;
  const gitlabUrl = `https://gitlab.com/api/v4/projects/${projectId}/repository/files/${filenameUrlEnc}?ref=${ref}`;
  return await fetch(gitlabUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      cache: 'no-store',
      'PRIVATE-TOKEN': privateToken,
    },
  })
    .then((res) => {
      //console.log('gitlabFetch', filename, gitlabUrl, res)
      const result = res.json().then((data) => {
        if (data.content) {
          if (filename.indexOf('/sk.js') > 0) {
            console.log('gitlabFetch', filename, gitlabUrl, data);
          }
          let resData = decodeUnicode(data.content);
          return resData;
        }
        return `/* 404 ${gitlabUrl} */`;
      });

      console.log('got', filename);
      return result;
    })
    .catch((err) => {
      console.log('gitlabFetch', filename, gitlabUrl, err);
    });
}

export const gitlabFetchFiles = async (token: string) => {
  const projectId = 18967974;
  const ref = 'master';
  let pageNumber = 1;
  const gitlabURL = `https://gitlab.com/api/v4/projects/${projectId}/repository/tree?recursive=true&per_page=100&ref=${ref}`;

  let data;
  const fileArray: Array<GitlabFile> = [];
  try {
    do {
      const res = await fetch(`${gitlabURL}&page=${pageNumber}`, {
        headers: {
          Accept: 'application/json',
          cache: 'no-store',
          'PRIVATE-TOKEN': token,
        },
      });
      pageNumber++;
      data = await res.json();
      fileArray.push(...data);
    } while (data.length === 100);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }

  return fileArray;
};
