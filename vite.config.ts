import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    allowedHosts:true,
    proxy: {
      "/api": {
        target: process.env.VITE_API_PROXY_TARGET || "https://www.rephyl.com",
        changeOrigin: true,
        secure: true,
      },
    },
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom"],
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Explicitly define chunks to avoid circular dependencies
          'vendor-react': [
            'react',
            'react-dom',
            'react-router-dom',
            'react-router',
          ],
          'vendor-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip',
          ],
          'vendor-query': [
            '@tanstack/react-query',
          ],
          'vendor-form': [
            'react-hook-form',
            '@hookform/resolvers',
          ],
          'vendor-icons': [
            'lucide-react',
          ],
          'vendor-other': [
            'class-variance-authority',
            'clsx',
            'cmdk',
            'date-fns',
            'embla-carousel-react',
            'input-otp',
            'next-themes',
            'react-day-picker',
            'react-resizable-panels',
          ],
        },
      },
    },
    // Ensure proper modules are kept in the main bundle
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  // Optimize dependencies to prevent issues with module resolution
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}));