import { knownExtension, KnownExtension } from '../src/loader/transpilation'

describe("transpilation", () => {
    test(".svelte", () => {
        const known = knownExtension('./component.svelte', ['.svelte' as KnownExtension])
        expect(known).toBe('.svelte');
    });

    test(".svelte negative", () => {
        const known = knownExtension('./component.jsx', ['.svelte' as KnownExtension])
        expect(known).toBeNull();
    });
})