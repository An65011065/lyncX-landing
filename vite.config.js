import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json";
import { resolve } from "path";
import dotenv from "dotenv";
// Load environment variables
dotenv.config();
export default defineConfig(function (_a) {
    var mode = _a.mode;
    return ({
        plugins: [react(), crx({ manifest: manifest })],
        resolve: {
            alias: {
                "@": resolve(__dirname, "src"),
            },
        },
        define: {
            "process.env.OPENAI_API_KEY": JSON.stringify(process.env.OPENAI_API_KEY),
        },
        build: {
            watch: mode === "development" ? {} : undefined,
            rollupOptions: {
                input: {
                    background: "src/data/background.ts",
                    popup: resolve(__dirname, "src/popup/popup.html"),
                    graph: resolve(__dirname, "src/graph/graph.html"),
                    dashboard: resolve(__dirname, "src/dashboard/dashboard.html"),
                    main: resolve(__dirname, "src/main/main.html"),
                },
            },
        },
    });
});
