# Frosted Canvas

Beautiful, interactive shader gradients for any div element. Built with Three.js and WebGL shaders.

[![npm version](https://img.shields.io/npm/v/frosted-canvas.svg)](https://www.npmjs.com/package/frosted-canvas)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**[📖 Full Documentation](https://frosted-canvas.vercel.app/docs.html)** | **[🎨 Live Demo](https://frosted-canvas.vercel.app/)** | **[🛠️ Color Customizer](https://frosted-canvas.vercel.app/color-customizer.html)**

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
  - [Basic Usage with Preset](#basic-usage-with-preset)
  - [Custom Colors](#custom-colors)
  - [Using Hex Colors](#using-hex-colors)
- [Understanding the Color Palette](#understanding-the-color-palette)
- [API Reference](#api-reference)
  - [Constructor](#constructor)
  - [Methods](#methods)
- [Presets](#presets)
- [Framework Integration](#framework-integration)
  - [React](#react)
  - [Vue 3](#vue-3)
  - [Svelte](#svelte)
  - [Next.js](#nextjs)
  - [Vanilla JavaScript](#vanilla-javascript)
- [CDN Usage](#cdn-usage)
- [Usage Examples](#usage-examples)
- [Tips & Best Practices](#tips--best-practices)
- [Resources](#resources)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Features

- 44 beautiful preset gradients with smooth animations
- **NEW v2.0**: Advanced gradient controls with domain warping and turbulence
- Custom color API for creating unique gradients
- Simple, declarative API
- Framework agnostic (React, Vue, Svelte, vanilla JS)
- Automatic container resizing
- Lightweight (~98KB) with Three.js as peer dependency
- CDN support for no-build workflows
- Fine-grained control over animation, effects, and gradient flow

## Installation

```bash
npm install frosted-canvas three
```

**Note**: Three.js is a peer dependency to keep the package lightweight (~98KB instead of ~698KB) and prevent duplicate installations.

## Quick Start

### Basic Usage with Preset

```javascript
import FrostedCanvas from 'frosted-canvas';

// Initialize with a preset gradient
const frost = new FrostedCanvas('#container', { preset: 0 });
```

```html
<div id="container" style="width: 100%; height: 400px;"></div>
```

### Static Background

```javascript
import FrostedCanvas from 'frosted-canvas';

// Generate a static (non-animated) background
const frost = new FrostedCanvas('#container', { 
  preset: 0,
  static: true 
});
```

### Custom Colors

```javascript
import FrostedCanvas from 'frosted-canvas';

const frost = new FrostedCanvas('#container');

// Create your own gradient
frost.setColors({
  paletteA: [0.9, 0.2, 0.5], // Pink
  paletteB: [0.5, 0.5, 0.5], // Gray
  paletteC: [1.0, 0.8, 0.3], // Yellow
  paletteD: [0.1, 0.3, 0.6], // Blue
});
```

### Using Hex Colors

```javascript
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

frost.setColors({
  paletteA: hexToRgb('#FF6B6B'),
  paletteC: hexToRgb('#4ECDC4'),
});
```

## Understanding the Color Palette

The shader uses a cosine-based formula to generate beautiful procedural gradients. Each gradient is controlled by 4 color palettes (A, B, C, D):

**The Formula:**

```
color(t) = a + b · cos[2π(c·t+d)]
```

**The Palettes:**

- **Palette A (Offset)**: Base color offset - shifts the entire color range
- **Palette B (Amplitude)**: Color intensity - controls how vibrant colors are
- **Palette C (Frequency)**: Color variation - controls how colors transition
- **Palette D (Phase)**: Color shift - offsets the color wave

Each palette takes RGB values from 0 to 1:

- `[1.0, 0.0, 0.0]` = Red
- `[0.0, 1.0, 0.0]` = Green
- `[0.0, 0.0, 1.0]` = Blue
- `[0.5, 0.5, 0.5]` = Mid Gray

**Learn more:** [YouTube explanation](https://www.youtube.com/shorts/TH3OTy5fTog) | [Full theory](https://iquilezles.org/articles/palettes/)

## Advanced Gradient Controls (v2.0+)

Version 2.0 introduces powerful new controls for creating more organic and dynamic gradients:

### Domain Warping

**`domainWarpStrength`** (0-0.5): Warps the coordinate space using layered noise for organic, flowing distortions. Higher values create more dramatic warping effects.

```javascript
frost.setConfig({ domainWarpStrength: 0.25 }); // Moderate organic flow
```

### Turbulence

**`turbulence`** (0-1.0): Adds fractal Brownian motion (FBM) with 5 octaves of noise for additional complexity and detail. Creates layered, turbulent effects.

```javascript
frost.setConfig({ turbulence: 0.5 }); // Add fractal detail
```

### Gradient Rotation

**`gradientAngle`** (0-6.28): Rotates the gradient direction in radians (0° to 360°). Allows dynamic gradient rotation.

```javascript
frost.setConfig({ gradientAngle: Math.PI / 4 }); // 45 degree rotation
```

### Color Distribution

**`colorSpread`** (0.1-3.0): Controls how spread out colors are across the gradient. Lower values create tighter color bands, higher values stretch and repeat colors.

```javascript
frost.setConfig({ colorSpread: 1.5 }); // Wider color distribution
```

### Flow Animation

**`flowSpeed`** (0-1.0): Independent animation speed for the domain warping flow, separate from the main animation speed for more control.

```javascript
frost.setConfig({ flowSpeed: 0.6 }); // Faster flowing motion
```

### Example: Maximum Organic Effect

```javascript
frost.setConfig({
  domainWarpStrength: 0.4,
  turbulence: 0.8,
  flowSpeed: 0.5,
  colorSpread: 2.0,
  gradientAngle: Math.PI / 6,
});
```

## API Reference

### Constructor

```javascript
new FrostedCanvas(container, options);
```

**Parameters:**

- `container` (string | HTMLElement) - CSS selector or DOM element
- `options` (object) - Configuration options

**Options:**
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `preset` | number | 0 | Starting preset (0-43) |
| `showGUI` | boolean | false | Show debug controls |
| `autoResize` | boolean | true | Auto-resize on container changes |
| `static` | boolean | false | Generate static (non-animated) background |

### Methods

#### `setPreset(index)`

Change to a different preset gradient (0-43).

```javascript
frost.setPreset(3);
```

#### `setColors(colors)`

Set custom RGB colors (values 0-1).

```javascript
frost.setColors({
  paletteA: [0.9, 0.65, 1.0], // Offset
  paletteB: [0.5, 0.5, 0.5], // Amplitude
  paletteC: [1.0, 0.7, 0.4], // Frequency
  paletteD: [0.0, 0.15, 0.2], // Phase
});
```

#### `setConfig(config)`

Adjust animation, effects, and gradient controls.

```javascript
frost.setConfig({
  // Animation & Noise
  noiseScale: 0.3, // 0.1-3.0: Size of noise patterns
  noiseStrength: 0.35, // 0-1.0: Intensity of distortion
  animationSpeed: 0.5, // 0-0.5: Speed of animation
  grainIntensity: 0.03, // 0-0.2: Film grain effect
  vignetteStrength: 3.0, // 0-3.0: Edge darkening

  // Advanced Gradient Controls (v2.0+)
  domainWarpStrength: 0.15, // 0-0.5: Organic coordinate warping
  turbulence: 0.2, // 0-1.0: Fractal noise complexity
  gradientAngle: 0.0, // 0-6.28: Rotation angle in radians
  colorSpread: 1.0, // 0.1-3.0: Color distribution
  flowSpeed: 0.3, // 0-1.0: Independent flow animation speed
});
```

#### `getColors()`

Get current color values.

```javascript
const colors = frost.getColors();
// Returns: { paletteA: [...], paletteB: [...], paletteC: [...], paletteD: [...] }
```

#### `getConfig()`

Get current configuration.

```javascript
const config = frost.getConfig();
// Returns: { noiseScale: 0.3, noiseStrength: 0.35, ... }
```

#### `destroy()`

Clean up resources and remove canvas.

```javascript
frost.destroy();
```

## Presets

44 preset gradients are available (indexed 0-43).

### Featured Presets

| Index | Name         | Description                               |
| ----- | ------------ | ----------------------------------------- |
| 0     | Molten Peach | Warm molten peach with lively motion      |
| 1     | Paper Koi    | Gentle paper-like pastels with pond tones |
| 2     | Sunset Bloom | Warm orange center with soft grain        |
| 3     | Aurora Glow  | The northern lights                       |
| 4     | Deep Ocean   | Muted teals and deep blues, calm motion   |
| 5     | Slate Grain  | High-grain monochrome, cinematic          |
| 10    | Coral Reef   | Bright coral / teal interplay             |
| 13    | Forest Mist  | Subtle greens and cool fog                |
| 14    | Solar Flare  | Fiery amber with fast motion              |
| 15    | Arctic Dawn  | Pale blues, crisp and calm                |
| 20    | Candy Cloud  | Playful pinks and blues                   |
| 30    | Cosmic Bloom | Galactic gradients with soft pulsation    |
| 43    | Mystic Flow  | Ethereal flowing gradients with organic warping (v2.0 showcase) |

### All 44 Presets

Molten Peach, Paper Koi, Sunset Bloom, Aurora Glow, Deep Ocean, Slate Grain, Peach Mirage, Crimson Dusk, Watermelon, Electric Indigo, Coral Reef, Lemon Zest, Midnight Velvet, Forest Mist, Solar Flare, Arctic Dawn, Vintage Sepia, Lavender Haze, Moss Grove, Copper Sunset, Candy Cloud, Meteor Storm, Tropical Night, Dusty Rose, Slate Storm, Glacial Drift, Amber Glow, Neon Canyon, Petrol Dream, Saffron Mist, Cosmic Bloom, Porcelain Dawn, Obsidian Fade, Rose Quartz, Velvet Plum, Horizon Teal, Dusty Denim, Brass Ember, Iris Bloom, Celadon Whisper, Starling Night, Polar Mint, Silent Harbor, Mystic Flow.

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
      preset: 0,
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

### Vue 3

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

<style scoped>
.background {
  width: 100%;
  height: 100vh;
}
</style>
```

### Svelte

```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import FrostedCanvas from 'frosted-canvas';

  let container;
  let frost;

  onMount(() => {
    frost = new FrostedCanvas(container, { preset: 0 });
  });

  onDestroy(() => {
    if (frost) frost.destroy();
  });
</script>

<div bind:this={container} class="background">
  <h1>Your Content</h1>
</div>

<style>
  .background {
    width: 100%;
    height: 100vh;
  }
</style>
```

### Next.js

```jsx
'use client';

import { useEffect, useRef } from 'react';
import FrostedCanvas from 'frosted-canvas';

export default function Hero() {
  const containerRef = useRef(null);
  const frostRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !frostRef.current) {
      frostRef.current = new FrostedCanvas(containerRef.current, {
        preset: 0,
      });
    }

    return () => {
      if (frostRef.current) {
        frostRef.current.destroy();
        frostRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100vh' }}>
      <h1>Next.js + Frosted Canvas</h1>
    </div>
  );
}
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
  </body>
</html>
```

## Usage Examples

### Full-Screen Hero Background

```html
<div class="hero" id="hero-bg">
  <div class="hero-content">
    <h1>Welcome</h1>
  </div>
</div>

<script type="module">
  import FrostedCanvas from 'frosted-canvas';
  new FrostedCanvas('#hero-bg', { preset: 0 });
</script>
```

### Card Background

```html
<div class="card" id="card-bg">
  <div class="card-content">
    <h2>Card Title</h2>
  </div>
</div>

<script type="module">
  import FrostedCanvas from 'frosted-canvas';
  new FrostedCanvas('#card-bg', { preset: 5 });
</script>
```

### Interactive Preset Switcher

```html
<div id="bg">
  <button onclick="frost.setPreset(0)">Sunset</button>
  <button onclick="frost.setPreset(3)">Aurora</button>
  <button onclick="frost.setPreset(14)">Solar Flare</button>
</div>

<script type="module">
  import FrostedCanvas from 'frosted-canvas';
  window.frost = new FrostedCanvas('#bg', { preset: 0 });
</script>
```

### Custom Color Examples

#### Sunset Orange & Pink

```javascript
frost.setColors({
  paletteA: [0.9, 0.65, 1.0],
  paletteB: [0.5, 0.5, 0.5],
  paletteC: [1.0, 0.7, 0.4],
  paletteD: [0.0, 0.15, 0.2],
});
```

#### Ocean Blue & Teal

```javascript
frost.setColors({
  paletteA: [0.5, 0.8, 1.0],
  paletteB: [0.5, 0.5, 0.5],
  paletteC: [1.0, 1.0, 0.5],
  paletteD: [0.0, 0.1, 0.2],
});
```

#### Purple & Magenta

```javascript
frost.setColors({
  paletteA: [0.8, 0.5, 1.0],
  paletteB: [0.5, 0.5, 0.5],
  paletteC: [1.0, 0.5, 0.8],
  paletteD: [0.3, 0.2, 0.5],
});
```

## Tips & Best Practices

### Creating Great Gradients

1. **Start with a preset**: Use `frost.setPreset(0)` then tweak from there
2. **Keep Palette B moderate**: Values around 0.5 work best for amplitude
3. **Experiment with Palette C**: This creates the most dramatic changes
4. **Use complementary colors**: Colors opposite on the color wheel create vibrant gradients
5. **Test different noise settings**: Lower noiseScale = larger patterns
6. **Adjust animation speed**: Slower speeds (0.1-0.3) are often more elegant

### When to Use Static Backgrounds

Use `static: true` when:
- You want better performance (no animation loop)
- Creating print-ready or screenshot-friendly designs
- Building static hero sections or cards
- Reducing battery consumption on mobile devices
- You need a beautiful gradient without motion

### Performance

- Container must have explicit width and height
- Call `destroy()` when removing the component to clean up resources
- Use `autoResize: true` for responsive containers
- Multiple instances on the same page are supported

### Saving and Loading Custom Presets

```javascript
// Save current state
const myPreset = {
  colors: frost.getColors(),
  config: frost.getConfig(),
};
localStorage.setItem('myGradient', JSON.stringify(myPreset));

// Load later
const saved = JSON.parse(localStorage.getItem('myGradient'));
frost.setColors(saved.colors);
frost.setConfig(saved.config);
```

## Resources

- [Live Demo](https://frosted-canvas.vercel.app/) - See all presets in action
- [Full Documentation](https://frosted-canvas.vercel.app/docs.html) - Complete documentation
- [Color Customizer](https://frosted-canvas.vercel.app/color-customizer.html) - Interactive tool to create custom gradients
- [GitHub Repository](https://github.com/SahilK-027/frosted-canvas) - Source code
- [npm Package](https://www.npmjs.com/package/frosted-canvas) - npm registry

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

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Credits

- Built with [Three.js](https://threejs.org/) v0.181.0
- Color palette theory by [Íñigo Quílez](https://iquilezles.org/articles/palettes/)
- Created by [SahilK-027](https://github.com/SahilK-027)
