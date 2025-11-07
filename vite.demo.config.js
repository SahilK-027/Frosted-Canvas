import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [glsl()],
  build: {
    outDir: 'demo-dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        docs: 'docs.html',
        'index-docs': 'index-docs.html',
        'color-customizer': 'color-customizer.html',
        example: 'example.html',
        test: 'test.html'
      }
    }
  }
});
