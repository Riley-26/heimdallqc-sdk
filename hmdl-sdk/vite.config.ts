// vite.config.ts
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import react from "@vitejs/plugin-react"
import { resolve } from "path"

export default defineConfig({
    plugins: [
        react(),
        dts({
            tsconfigPath: "./tsconfig.app.json",
            rollupTypes: true,
        }),
    ],
    build: {
        minify: true,
        sourcemap: false,
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "hmdl-sdk",
            formats: ["es", "umd"],
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                }
            },
        },
    },
})
