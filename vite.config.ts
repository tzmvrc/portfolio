import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { handler as contactHandler } from "./src/api/contact";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "contact-api-dev",
      configureServer(server) {
        server.middlewares.use("/api/contact", async (req, res) => {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                success: false,
                message: "Method not allowed.",
              }),
            );
            return;
          }

          try {
            const chunks: Buffer[] = [];
            for await (const chunk of req) {
              chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            }

            const body = chunks.length
              ? JSON.parse(Buffer.concat(chunks).toString("utf-8"))
              : {};
            const response = await contactHandler(
              new Request("http://localhost/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
              }),
            );

            res.statusCode = response.status;
            res.setHeader("Content-Type", "application/json");
            res.end(await response.text());
          } catch (error) {
            console.error("Contact API dev error", error);
            res.statusCode = 400;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                success: false,
                message: "Invalid request body.",
              }),
            );
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
