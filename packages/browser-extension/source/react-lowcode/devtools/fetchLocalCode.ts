export interface LocalResponse {
  body: string
  status: number
}

export async function fetchLocalCode(url: string) {
  return new Promise<LocalResponse>(function (resolve, reject) {
    var xhr = new XMLHttpRequest;
    xhr.onload = function () {
      resolve({ body: xhr.responseText, status: xhr.status });
    };
    xhr.onerror = function () {
      reject(new TypeError('Local request failed'));
    };
    xhr.open('GET', url);
    xhr.send(null);
  });
}
