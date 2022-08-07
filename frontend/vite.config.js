import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker'
import path from 'path'

export default ({ mode }) => {
    return defineConfig({
        plugins: [
            react(),
            checker({
                overlay: false,
                eslint: {
                    lintCommand: 'eslint --max-warnings 0 --ext js,jsx src"', // for example, lint .ts & .tsx
                },
            }),
        ],
        server: {
            port: 3000,
        },
        define: {
            'process.env.NODE_ENV': `"${mode}"`,
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        build: {
            chunkSizeWarningLimit: 1600,
            sourcemap: false,
        },
    })
}
