import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from "fs";
import path from "path";
import { componentTagger } from "lovable-tagger";

/** Serve public HTML index files for /works directory URLs (avoid Vite SPA fallback). */
const servePublicHtmlDirs = (): Plugin => {
  const publicDir = path.resolve(__dirname, "public");

  const tryServe = (
    reqUrl: string | undefined,
    res: { setHeader: (k: string, v: string) => void; end: (b: Buffer) => void },
    next: () => void,
  ) => {
    if (!reqUrl) return next();
    const pathname = reqUrl.split("?")[0] ?? "";
    if (!pathname.startsWith("/works/")) return next();

    const candidates: string[] = [];
    if (pathname.endsWith("/")) {
      candidates.push(path.join(publicDir, pathname, "index.html"));
    } else if (!path.extname(pathname)) {
      candidates.push(path.join(publicDir, pathname, "index.html"));
      candidates.push(path.join(publicDir, `${pathname}.html`));
    } else if (pathname.endsWith(".html")) {
      candidates.push(path.join(publicDir, pathname));
    }

    for (const file of candidates) {
      const resolved = path.resolve(file);
      if (!resolved.startsWith(publicDir)) continue;
      if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile()) continue;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(fs.readFileSync(resolved));
      return;
    }
    next();
  };

  return {
    name: "serve-public-html-dirs",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        tryServe(req.url, res, next);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        tryServe(req.url, res, next);
      });
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [
    servePublicHtmlDirs(),
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
