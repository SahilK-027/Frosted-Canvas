import { resolve } from 'path';
import glsl from 'vite-plugin-glsl';

export default {
  plugins: [glsl()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/lib.js'),
      name: 'FrostedCanvas',
      fileName: (format) => `frosted-canvas.${format}.js`
    },
    rollupOptions: {
      external: ['three'],
      output: {
        globals: {
          three: 'THREE'
        }
      }
    }
  }
};
