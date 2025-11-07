# 🎨 Frosted Canvas

Beautiful, interactive shader gradients for any div element. Built with Three.js and WebGL shaders.

[![npm version](https://img.shields.io/npm/v/frosted-canvas.svg)](https://www.npmjs.com/package/frosted-canvas)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎨 44 beautiful preset gradients
- 🎨 **Create custom colors** - full control over gradients
- 🔧 Simple API - just point to a div
- 📦 Works with any framework (React, Vue, Svelte, etc.)
- 🎯 Auto-resizes with container
- 🚀 Lightweight and performant
- 💻 No build tools required (CDN available)

## 📦 Installation

```bash
npm install frosted-canvas three
```

> **Why install Three.js separately?**  
> Three.js is a peer dependency to keep the package lightweight (~98KB instead of ~698KB). This also prevents duplicate installations if you're already using Three.js in your project.

## 🚀 Quick Start

```javascript
import FrostCanvas from 'frosted-canvas';

// Use a preset
const frost = new FrostCanvas('#my-div', { preset: 0 });

// Or create custom colors
frost.setColors({
  paletteA: [0.9, 0.2, 0.5],
  paletteC: [1.0, 0.8, 0.3]
});
```

```html
<div id="my-div" style="width: 100%; height: 400px;"></div>
```

That's it! 🎉 [See full quick start →](./QUICK_START.md)

## 📖 Documentation

### Options

```javascript
const frost = new FrostCanvas('#container', {
  preset: 0,           // Starting preset (0-43, 44 total presets)
  showGUI: false,      // Show debug controls
  autoResize: true     // Auto-resize on container changes
});
```

### API Methods

```javascript
// Change preset
frost.setPreset(3);

// Set custom colors (RGB values 0-1)
frost.setColors({
  paletteA: [0.9, 0.65, 1.0],  // Offset
  paletteB: [0.5, 0.5, 0.5],   // Amplitude
  paletteC: [1.0, 0.7, 0.4],   // Frequency
  paletteD: [0.0, 0.15, 0.2]   // Phase
});

// Set configuration
frost.setConfig({
  noiseScale: 0.3,
  noiseStrength: 0.35,
  animationSpeed: 0.5,
  grainIntensity: 0.03,
  vignetteStrength: 3.0
});

// Get current colors
const colors = frost.getColors();

// Get current config
const config = frost.getConfig();

// Clean up when done
frost.destroy();
```

### Available Presets

**44 Beautiful Gradients** - Here are some featured presets:

| Index | Name | Description |
|-------|------|-------------|
| 0 | Molten Peach | Warm molten peach with lively motion |
| 1 | Paper Koi | Gentle paper-like pastels |
| 2 | Sunset Bloom | Warm orange center with soft grain |
| 3 | Aurora Glow | The northern lights |
| 4 | Deep Ocean | Muted teals and deep blues |
| 5 | Slate Grain | High-grain monochrome, cinematic |
| 10 | Coral Reef | Bright coral / teal interplay |
| 14 | Solar Flare | Fiery amber with fast motion |
| 15 | Arctic Dawn | Pale blues, crisp and calm |
| 21 | Candy Cloud | Playful pinks and blues |
| 30 | Cosmic Bloom | Galactic gradients |
| 43 | Silent Harbor | Calm harbor dusk |

**All 44 Presets**: Molten Peach, Paper Koi, Sunset Bloom, Aurora Glow, Deep Ocean, Slate Grain, Peach Mirage, Crimson Dusk, Watermelon, Electric Indigo, Coral Reef, Lemon Zest, Midnight Velvet, Forest Mist, Solar Flare, Arctic Dawn, Vintage Sepia, Lavender Haze, Moss Grove, Copper Sunset, Candy Cloud, Meteor Storm, Tropical Night, Dusty Rose, Slate Storm, Glacial Drift, Amber Glow, Neon Canyon, Petrol Dream, Saffron Mist, Cosmic Bloom, Porcelain Dawn, Obsidian Fade, Rose Quartz, Velvet Plum, Horizon Teal, Dusty Denim, Brass Ember, Iris Bloom, Celadon Whisper, Starling Night, Polar Mint, Silent Harbor.

## 🎯 Framework Examples

### React

```jsx
import { useEffect, useRef } from 'react';
import FrostCanvas from 'frosted-canvas';

function Hero() {
  const containerRef = useRef(null);
  const frostRef = useRef(null);

  useEffect(() => {
    frostRef.current = new FrostCanvas(containerRef.current, {
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
import FrostCanvas from 'frosted-canvas';

const container = ref(null);
let frost = null;

onMounted(() => {
  frost = new FrostCanvas(container.value, { preset: 0 });
});

onUnmounted(() => frost?.destroy());
</script>
```

### Vanilla JS

```html
<div id="bg" style="width: 100%; height: 100vh;"></div>

<script type="module">
  import FrostCanvas from 'frosted-canvas';
  new FrostCanvas('#bg', { preset: 0 });
</script>
```

## 🌐 CDN Usage (No Build Tools)

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
  new FrostCanvas('#background');
</script>
```

See [CDN_USAGE.md](./CDN_USAGE.md) for complete examples.

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build library
npm run build
```

## 📝 Documentation

- [Quick Reference](./QUICK_REFERENCE.md) - Cheat sheet
- [Custom Colors Guide](./CUSTOM_COLORS.md) - Create your own gradients
- [Getting Started Guide](./GETTING_STARTED.md) - Detailed setup
- [Usage Examples](./USAGE_EXAMPLES.md) - 12+ real examples
- [CDN Usage](./CDN_USAGE.md) - No build tools
- [Publishing Guide](./PUBLISHING.md) - For contributors

## 🎨 Live Demo

Check out the live demo with interactive color customizer:
- **Demo**: https://frosted-canvas.vercel.app/
- **Color Customizer**: Open `color-customizer.html` locally

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit PRs.

## 📄 License

MIT © [SahilK-027](https://github.com/SahilK-027)

## 🙏 Credits

Built with [Three.js](https://threejs.org/) v0.181.0

---

Made with ❤️ by [SahilK-027](https://github.com/SahilK-027)
