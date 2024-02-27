import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            exclude: [
                './src/config',
                '**/node_modules/**',
                '**/build/**',
            ],
            provider: 'istanbul',
        },
        exclude: [
            '**/node_modules/**',
            '**/build/**',
        ],
    },
});
