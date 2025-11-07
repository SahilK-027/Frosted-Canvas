# Frosted Canvas

Beautiful, interactive shader gradients for any div element. Built with Three.js and WebGL shaders.

[![npm version](https://img.shields.io/npm/v/frosted-canvas.svg)](https://www.npmjs.com/package/frosted-canvas)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- 44 beautiful preset gradients with smooth animations
- Custom color API for creating unique gradients
- Simple, declarative API
- Framework agnostic (React, Vue, Svelte, vanilla JS)
- Automatic container resizing
- Lightweight (~98KB) with Three.js as peer dependency
- CDN support for no-build workflows

## Installation

```bash
npm install frosted-canvas three
```

**Note**: Three.js is a peer dependency to keep the package lightweight (~98KB instead of ~698KB) and prevent duplicate installations.

## Quick Start

```javascript
import FrostedCanvas from 'frosted-canvas';

// Initialize with a preset
const frost = new FrostedCanvas('#container', { preset: 0 });

// Or create custom colors
frost.setColors({
  paletteA: [0.9, 0.2, 0.5],
  paletteC: [1.0, 0.8, 0.3]
});
```

```html
<div id="container" style="width: 100%; height: 400px;"></div>
```

## Documentation

**[View Full Documentation](https://frosted-canvas.vercel.app/docs.html)**

### Configuration

```javascript
new FrostedCanvas(container, {
  preset: 0,           // Preset index (0-43)
  showGUI: false,      // Show debug controls
  autoResize: true     // Auto-resize with container
});
```

### API Reference

#### Methods

**setPreset(index)**
```javascript
frost.setPreset(3);
```

**setColors(colors)**
```javascript
frost.setColors({
  paletteA: [0.9, 0.65, 1.0],  // Offset
  paletteB: [0.5, 0.5, 0.5],   // Amplitude
  paletteC: [1.0, 0.7, 0.4],   // Frequency
  paletteD: [0.0, 0.15, 0.2]   // Phase
});
```

**setConfig(config)**
```javascript
frost.setConfig({
  noiseScale: 0.3,
  noiseStrength: 0.35,
  animationSpeed: 0.5,
  grainIntensity: 0.03,
  vignetteStrength: 3.0
});
```

**getColors()** / **getConfig()**
```javascript
const colors = frost.getColors();
const config = frost.getConfig();
```

**destroy()**
```javascript
frost.destroy();
```

### Presets

44 preset gradients are available (indexed 0-43). Featured presets include:

| Index | Name | Description |
|-------|------|-------------|
| 0 | Molten Peach | Warm molten peach with lively motion |
| 3 | Aurora Glow | Northern lights effect |
| 4 | Deep Ocean | Muted teals and deep blues |
| 5 | Slate Grain | High-grain monochrome |
| 14 | Solar Flare | Fiery amber with fast motion |
| 30 | Cosmic Bloom | Galactic gradients |

[View all 44 presets](https://frosted-canvas.vercel.app/docs.html)

## Framework Integration

### React

```jsx
import { useEffect, useRef } from 'react';
import FrostedCanvas from 'frosted-canvas';

function Hero() {
  const containerRef = useRef(null);
  const frostRef = useRef(null);

  useEffect(() => {
    frostRef.current = new FrostedCanvas(containerRef.current, {
      preset: 0
    });
    return () => frostRef.current?.destroy();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100vh' }}>
      <h1>Your Content</h1>
    </div>
  );
}
```

### Vue

```vue
<template>
  <div ref="container" class="background">
    <h1>Your Content</h1>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import FrostedCanvas from 'frosted-canvas';

const container = ref(null);
let frost = null;

onMounted(() => {
  frost = new FrostedCanvas(container.value, { preset: 0 });
});
onUnmounted(() => frost?.destroy());
</script>
```

### Vanilla JavaScript

```html
<div id="background" style="width: 100%; height: 100vh;"></div>

<script type="module">
  import FrostedCanvas from 'frosted-canvas';
  new FrostedCanvas('#background', { preset: 0 });
</script>
```

## CDN Usage

For projects without a build step:

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
  import FrostedCanvas from 'https://unpkg.com/frosted-canvas/dist/frosted-canvas.es.js';
  new FrostedCanvas('#background', { preset: 0 });
</script>
```

## Resources

- [Documentation](https://frosted-canvas.vercel.app/docs.html)
- [Interactive Demo](https://frosted-canvas.vercel.app/)
- [Color Customizer](https://frosted-canvas.vercel.app/color-customizer.html)
- [Quick Reference](./QUICK_REFERENCE.md)
- [Custom Colors Guide](./CUSTOM_COLORS.md)
- [Usage Examples](./USAGE_EXAMPLES.md)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build library for npm
npm run build

# Build demo site
npm run build:demo
```

## Contributing

Contributions are welcome. Please open an issue or submit a pull request.

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Credits

Built with [Three.js](https://threejs.org/) v0.181.0

---

Created by [SahilK-027](https://github.com/SahilK-027)
