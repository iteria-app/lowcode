
import { prefix } from '../index'
import { CONTENT_TYPE_CSS, CONTENT_TYPE_JS, CONTROLLED } from '../constants'
import { transpileSvelte } from '../transpile'
import { newCustomResponse } from './cacheHandlers'
import {nested} from './examplesJSONS'
import { cdnImports } from '../cdn'
export async function fetchSvelteExample(){
    caches.open('playground').then(async cache=>{
        let cssImports: Array<String> = [];
    console.log("Nested", nested.files)
    for(let file of nested.files){
      // Put original svelte files to cache
      // cache.put(
      //   prefix(CONTROLLED, file.name),
      //   newCustomResponse(file.source,CONTENT_TYPE_JS)
      // )
        const transpiled = await transpileSvelte(file.source, file.name)
        console.log("transpiled", transpiled)
        const sourceCdn = await cdnImports(
            transpiled.code,
            transpiled.path,
          );
        const copyCache = await caches.open('copy_cache');
      copyCache.put(
        prefix(CONTROLLED, transpiled.path),
        newCustomResponse(file.source, CONTENT_TYPE_JS),
      );
      cache.put(
        prefix('', transpiled.path),
        newCustomResponse(sourceCdn.source, CONTENT_TYPE_JS),
      );
      if (transpiled.css.code) {
        cssImports.push(
          `@import "${prefix(
            CONTROLLED,
            prefix('/', `${transpiled.path}.css`),
          )}";`,
        );
        cache.put(
          prefix(CONTROLLED, `${transpiled.path}.css`),
          newCustomResponse(transpiled.css.code, CONTENT_TYPE_CSS),
        );
      }
      cssImports = [...sourceCdn.imports, ...cssImports];
    }
    })
    
    
      
    return nested
}


//    const data = fetch(url,  {
//         mode:"no-cors",
//         method: "GET",
//         headers: {
//             "Accept": "application/json",
//         }
//       }).then((response)=>{
//         console.log("response from svelte fetch", response)
//     })
//     .then(data=>{
//         console.log("data", data)
//     })
//     console.log("Const Data", data)

    // const data = fetch(url,
    //      {
    //          mode:"no-cors",
    //          headers : { 
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //            }
    //      }
    //      ).then(response=>{
    //     console.log("response",response)
    // })
    // console.log("data", data)
//     const https = require('https');


// https.get('https://svelte.dev/examples/nested-components.json', (resp) => {
//   let data = '';

//   // A chunk of data has been recieved.
//   resp.on('data', (chunk) => {
//     data += chunk;
//   });

//   // The whole response has been received. Print out the result.
//   resp.on('end', () => {
//     console.log(JSON.parse(data).explanation);
//   });

// }).on("error", (err) => {
//   console.log("Error: " + err.message);
// });