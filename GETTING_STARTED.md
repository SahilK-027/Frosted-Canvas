# Getting Started with Frosted Canvas

## Quick Start

### 1. Install the package

```bash
npm install frosted-canvas three
```

### 2. Create your HTML

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    #background {
      width: 100%;
      height: 100vh;
    }
  </style>
</head>
<body>
  <div id="background"></div>
  <script type="module" src="main.js"></script>
</body>
</html>
```

### 3. Initialize in your JavaScript

```javascript
// main.js
import FrostCanvas from 'frosted-canvas';

const frost = new FrostCanvas('#background');
```

That's it! You now have a beautiful animated shader gradient.

## Configuration Options

```javascript
new FrostCanvas('#container', {
  preset: 0,           // Which preset to start with (0-43, 44 total)
  showGUI: false,      // Show debug controls
  autoResize: true     // Automatically resize when container changes
});
```

## Using with React

```jsx
import { useEffect, useRef } from 'react';
import FrostCanvas from 'frosted-canvas';

function Hero() {
  const containerRef = useRef(null);
  const frostRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      frostRef.current = new FrostCanvas(containerRef.current, {
        preset: 0
      });
    }

    return () => {
      if (frostRef.current) {
        frostRef.current.destroy();
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100vh' }}>
      <h1>Your Content Here</h1>
    </div>
  );
}
```

## Using with Vue

```vue
<template>
  <div ref="container" class="background">
    <h1>Your Content Here</h1>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import FrostCanvas from 'frosted-canvas';

const container = ref(null);
let frost = null;

onMounted(() => {
  frost = new FrostCanvas(container.value, { preset: 0 });
});

onUnmounted(() => {
  if (frost) frost.destroy();
});
</script>

<style scoped>
.background {
  width: 100%;
  height: 100vh;
}
</style>
```

## Building for Production

```bash
npm run build
```

This creates optimized bundles in the `dist/` folder.

## Publishing to npm

1. Update version in `package.json`
2. Build the library: `npm run build`
3. Publish: `npm publish`

## Tips

- The container must have explicit width and height
- Use `position: relative` on the container if you want to overlay content
- Call `destroy()` when removing the component to clean up resources
- Three.js is a peer dependency - users need to install it separately
