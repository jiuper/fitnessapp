import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    base: "/bogokoapp",
    plugins: [react(), tsconfigPaths(), svgr()],
    publicDir: "./public",
    server: {
        host: true,
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "@/shared/styles/breakpoints.scss";
                    @import "@/shared/styles/global.scss";
                    @import "@/shared/styles/mixins.scss";
                    @import "@/shared/styles/variables.scss";
                `,
            },
        },
    },
});
