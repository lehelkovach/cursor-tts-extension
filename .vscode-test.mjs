import { defineConfig } from '@vscode/test-electron';

export default defineConfig({
    files: 'test/**/*.test.ts',
    version: '1.80.0',
    extensionDevelopmentPath: '.',
    extensionTestsPath: './out/test/extension.test.js'
});

