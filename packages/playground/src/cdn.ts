//import { Resolver } from '@velcro/resolver';
//import { CdnStrategy } from '@velcro/strategy-cdn';
//import { GraphBuilder } from '@velcro/bundler';
//import { sucrasePlugin } from '@velcro/plugin-sucrase';
//import { cssPlugin } from '@velcro/plugin-css';
import { parse } from 'acorn';
import { WEB_MODULES } from './constants';
//import { transform } from 'cjs-es'
//@ts-ignore
import cjsEs from 'https://cdn.skypack.dev/-/cjs-es@v0.8.2-ceQTG87fHFEzTzEBy8F3/dist=es2020/cjs-es.js';

import { CONTROLLED } from './constants';

const importMap = new Map();
importMap.set('@fullcalendar/core', ['/web_modules/@fullcalendar/core.js']);
importMap.set('@fullcalendar/core/locales/cs', [
  '/web_modules/@fullcalendar/core/locales/cs.js',
]);
importMap.set('@fullcalendar/core/locales/es', [
  '/web_modules/@fullcalendar/core/locales/es.js',
]);
importMap.set('@fullcalendar/core/locales/fr', [
  '/web_modules/@fullcalendar/core/locales/fr.js',
]);
importMap.set('@fullcalendar/core/locales/ru', [
  '/web_modules/@fullcalendar/core/locales/ru.js',
]);
importMap.set('@fullcalendar/core/locales/sk', [
  '/web_modules/@fullcalendar/core/locales/sk.js',
]);
importMap.set('@fullcalendar/core/main.css', [
  '/web_modules/@fullcalendar/core/main.css',
]);
importMap.set('@fullcalendar/daygrid', [
  '/web_modules/@fullcalendar/daygrid.js',
]);
importMap.set('@fullcalendar/daygrid/main.css', [
  '/web_modules/@fullcalendar/daygrid/main.css',
]);
importMap.set('@fullcalendar/interaction', [
  '/web_modules/@fullcalendar/interaction.js',
]);
importMap.set('@fullcalendar/timegrid', [
  '/web_modules/@fullcalendar/timegrid.js',
]);
importMap.set('@fullcalendar/timegrid/main.css', [
  '/web_modules/@fullcalendar/timegrid/main.css',
]);
importMap.set('@material/mwc-button', ['/web_modules/@material/mwc-button.js']);
importMap.set('@material/mwc-checkbox', [
  '/web_modules/@material/mwc-checkbox.js',
]);
importMap.set('@material/mwc-dialog', ['/web_modules/@material/mwc-dialog.js']);
importMap.set('@material/mwc-drawer', ['/web_modules/@material/mwc-drawer.js']);
importMap.set('@material/mwc-fab', ['/web_modules/@material/mwc-fab.js']);
importMap.set('@material/mwc-icon', ['/web_modules/@material/mwc-icon.js']);
importMap.set('@material/mwc-icon-button', [
  '/web_modules/@material/mwc-icon-button.js',
]);
importMap.set('@material/mwc-linear-progress', [
  '/web_modules/@material/mwc-linear-progress.js',
]);
importMap.set('@material/mwc-list', ['/web_modules/@material/mwc-list.js']);
importMap.set('@material/mwc-list/mwc-check-list-item', [
  '/web_modules/@material/mwc-list/mwc-check-list-item.js',
]);
importMap.set('@material/mwc-list/mwc-list', [
  '/web_modules/@material/mwc-list/mwc-list.js',
]);
importMap.set('@material/mwc-list/mwc-list-item', [
  '/web_modules/@material/mwc-list/mwc-list-item.js',
]);
importMap.set('@material/mwc-ripple', ['/web_modules/@material/mwc-ripple.js']);
importMap.set('@material/mwc-select', ['/web_modules/@material/mwc-select.js']);
importMap.set('@material/mwc-snackbar', [
  '/web_modules/@material/mwc-snackbar.js',
]);
importMap.set('@material/mwc-tab', ['/web_modules/@material/mwc-tab.js']);
importMap.set('@material/mwc-tab-bar', [
  '/web_modules/@material/mwc-tab-bar.js',
]);
importMap.set('@material/mwc-textarea', [
  '/web_modules/@material/mwc-textarea.js',
]);
importMap.set('@material/mwc-textfield', [
  '/web_modules/@material/mwc-textfield.js',
]);
importMap.set('@material/mwc-top-app-bar', [
  '/web_modules/@material/mwc-top-app-bar.js',
]);
importMap.set('@urql/core', ['/web_modules/@urql/core.js']);
importMap.set('@urql/svelte', ['/web_modules/@urql/svelte.js']);
importMap.set('fast-deep-equal', ['/web_modules/fast-deep-equal.js']);
importMap.set('graphql', ['/web_modules/graphql.js']);
importMap.set('graphql-request', ['/web_modules/graphql-request.js']);
importMap.set('graphql-tag', ['/web_modules/graphql-tag.js']);
importMap.set('moment', ['/web_modules/moment.js']);
importMap.set('svelte', ['/web_modules/svelte.js']);
importMap.set('svelte-i18n', ['/web_modules/svelte-i18n.js']);
importMap.set('svelte/animate', ['/web_modules/svelte/animate.js']);
importMap.set('svelte/easing', ['/web_modules/svelte/easing.js']);
importMap.set('svelte/internal', ['/web_modules/svelte/internal.js']);
importMap.set('svelte/store', ['/web_modules/svelte/store.js']);
importMap.set('svelte/transition', ['/web_modules/svelte/transition.js']);
importMap.set('sveltejs-tippy', ['/web_modules/sveltejs-tippy.js']);
importMap.set('tippy.js', ['/web_modules/tippy.js']);

export async function cdnImports(source: string, path: string) {
  const cacheDeps = await caches.open('web_modules');

  const importMatches = source.match(
    /(?<!\/\/[\s]*)import[^a-zA-Z0-9][^"']*["'][^"']*["']/gm,
  );

  let imports: Array<String> = [];
  for (let match of importMatches || []) {
    // console.trace('import match', match);
    const dependencyFirstQuote = match.lastIndexOf(
      match[match.length - 1],
      match.length - 2,
    );
    const dependency = match.substring(
      dependencyFirstQuote + 1,
      match.length - 1,
    );

    if (dependency.endsWith('.css')) {
      source = source.replaceAll(match, `//${match}`); //TODO import css
      imports.push(`@import "${dependency}";`);
      continue;
    }
    if (dependency.startsWith('./') && !dependency.endsWith('.svelte')) {
      const slash = path.lastIndexOf('/');
      if (slash > 1) {
        const indexSuffix = dependency.substring(1) + '/index';
        const index = path.substring(0, slash) + indexSuffix;
        const cache = await caches.open('playground');
        const response = await cache.match(index);
        if (response?.ok) {
          const cacheImport =
            match.substring(0, dependencyFirstQuote) + `"${dependency}/index"`;
          source = source.replaceAll(match, cacheImport);
          continue;
        }
      }
      continue;
    }

    const importMapDep = importMap.get(dependency);
    if (importMapDep) {
      const cacheImport =
        match.substring(0, dependencyFirstQuote) + `"${importMapDep}"`;
      source = source.replaceAll(match, cacheImport);
      continue;
    }
    // Check if found dependency is stored in dependencies cache
    const dependencyPath = WEB_MODULES + dependency;
    const response = await cacheDeps.match(dependencyPath);
    if (response?.ok) {
      const cacheImport =
        match.substring(0, dependencyFirstQuote) + `"${dependencyPath}"`;
      //source = source.replaceAll(match, cacheImport);
      continue;
    }

    if (dependency?.length > 0 && !dependency.startsWith('https://')) {
      if (dependency.startsWith('@material/mwc-')) {
        source = source.replaceAll(match, '');
        continue;
      }
      let dependencyCdn = `https://cdn.skypack.dev/${dependency}`;
      if (dependencyCdn && dependencyCdn?.length > 0) {
        const cdnImport =
          match.substring(0, dependencyFirstQuote) + `"${dependencyCdn}"`;
        // console.log(match, ' => ', cdnImport);
        //source = source.replaceAll(match, cdnImport);
        continue;
        /*
import dependencyFetcher 
from './util/dependencyFetcher';
import { parse } from 'acorn'
//import { transform } from 'cjs-es'
import cjsEs from 'https://cdn.skypack.dev/-/cjs-es@v0.8.2-ceQTG87fHFEzTzEBy8F3/dist=es2020/cjs-es.js'
export async function cdnImports(source: string): Promise<string> {
  const importMatches = source.match(/import[^a-zA-Z0-9][^"']*["'][^\.][^"']*["']/gm);
  for(let match of importMatches || []) {
    const dependencyFirstQuote = match.lastIndexOf(match[match.length - 1], match.length - 2)
    const dependency = match.substring(dependencyFirstQuote + 1, match.length - 1)
    if (dependency?.length > 0 && !dependency.startsWith('https://')) {
      if (dependency.startsWith('@material/mwc-')) {
        source = source.replaceAll(match, '');
        continue
      }
      let dependencyCdn = await dependencyFetcher(dependency)
      if (dependencyCdn && dependencyCdn?.length > 0) {
        const cdnImport = match.substring(0, dependencyFirstQuote) + `"${dependencyCdn}"`
        console.log(match, ' => ', cdnImport);
        source = source.replaceAll(match, cdnImport);
        continue
*/
      }
    }
    console.log(match, 'NO REPLACEMENT');
  }

  return { source, imports };
}
