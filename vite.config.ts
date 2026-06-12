import { defineConfig } from 'vite';

export default defineConfig({
  base: '/lisobet/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Corrigido: manualChunks agora é uma função, não um objeto
        manualChunks(id) {
          if (id.includes('@supabase/supabase-js')) {
            return 'supabase';
          }
        },
      },
    },
  },
  server: {
    port: 3000,
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});