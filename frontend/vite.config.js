import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'
import path from 'path'

export default ({ mode }) => {
    return defineConfig({
        plugins: [react(), eslint()],
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
