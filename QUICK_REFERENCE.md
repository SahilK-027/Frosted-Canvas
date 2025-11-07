# Quick Reference

## Installation

```bash
npm install frosted-canvas three
```

## Basic Usage

```javascript
import FrostCanvas from 'frosted-canvas';
const frost = new FrostCanvas('#container');
```

## Options

```javascript
new FrostCanvas('#container', {
  preset: 0,        // 0-43 (44 presets)
  showGUI: false,   // Debug controls
  autoResize: true  // Auto-resize
});
```

## Methods

```javascript
// Presets
frost.setPreset(3);

// Custom colors (RGB 0-1)
frost.setColors({
  paletteA: [0.9, 0.2, 0.5],
  paletteB: [0.5, 0.5, 0.5],
  paletteC: [1.0, 0.8, 0.3],
  paletteD: [0.1, 0.3, 0.6]
});

// Configuration
frost.setConfig({
  noiseScale: 0.3,
  animationSpeed: 0.5
});

// Get values
const colors = frost.getColors();
const config = frost.getConfig();

// Clean up
frost.destroy();
```

## Presets (44 Total)

| # | Name | # | Name |
|---|------|---|------|
| 0 | Molten Peach | 22 | Meteor Storm |
| 1 | Paper Koi | 23 | Tropical Night |
| 2 | Sunset Bloom | 24 | Dusty Rose |
| 3 | Aurora Glow | 25 | Slate Storm |
| 4 | Deep Ocean | 26 | Glacial Drift |
| 5 | Slate Grain | 27 | Amber Glow |
| 6 | Peach Mirage | 28 | Neon Canyon |
| 7 | Crimson Dusk | 29 | Petrol Dream |
| 8 | Watermelon | 30 | Saffron Mist |
| 9 | Electric Indigo | 31 | Cosmic Bloom |
| 10 | Coral Reef | 32 | Porcelain Dawn |
| 11 | Lemon Zest | 33 | Obsidian Fade |
| 12 | Midnight Velvet | 34 | Rose Quartz |
| 13 | Forest Mist | 35 | Velvet Plum |
| 14 | Solar Flare | 36 | Horizon Teal |
| 15 | Arctic Dawn | 37 | Dusty Denim |
| 16 | Vintage Sepia | 38 | Brass Ember |
| 17 | Lavender Haze | 39 | Iris Bloom |
| 18 | Moss Grove | 40 | Celadon Whisper |
| 19 | Copper Sunset | 41 | Starling Night |
| 20 | Candy Cloud | 42 | Polar Mint |
| 21 | Meteor Storm | 43 | Silent Harbor |

## React

```jsx
import { useEffect, useRef } from 'react';
import FrostCanvas from 'frosted-canvas';

function Component() {
  const ref = useRef(null);
  const frost = useRef(null);

  useEffect(() => {
    frost.current = new FrostCanvas(ref.current);
    return () => frost.current?.destroy();
  }, []);

  return <div ref={ref} style={{ width: '100%', height: '100vh' }} />;
}
```

## Vue

```vue
<template>
  <div ref="container" />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import FrostCanvas from 'frosted-canvas';

const container = ref(null);
let frost = null;

onMounted(() => {
  frost = new FrostCanvas(container.value);
});

onUnmounted(() => frost?.destroy());
</script>
```

## CDN

```html
<script type="importmap">
{
  "imports": {
    "three": "https://unpkg.com/three@0.181.0/build/three.module.js",
    "three/": "https://unpkg.com/three@0.181.0/"
  }
}
</script>

<script type="module">
import FrostCanvas from 'https://unpkg.com/frosted-canvas/dist/frosted-canvas.es.js';
new FrostCanvas('#bg');
</script>
```

## Important Notes

- Container must have explicit width/height
- Call `destroy()` when removing component
- Three.js is a peer dependency
- Use `position: relative` on container for overlays
