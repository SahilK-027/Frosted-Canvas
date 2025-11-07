# Usage Examples

## 1. Full-Screen Hero Background

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .hero {
      width: 100%;
      height: 100vh;
      position: relative;
    }
    .hero-content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      text-align: center;
      z-index: 10;
    }
  </style>
</head>
<body>
  <div class="hero" id="hero-bg">
    <div class="hero-content">
      <h1>Welcome</h1>
      <p>Beautiful backgrounds made easy</p>
    </div>
  </div>

  <script type="module">
    import FrostCanvas from 'frosted-canvas';
    new FrostCanvas('#hero-bg', { preset: 0 });
  </script>
</body>
</html>
```

## 2. Card Background

```html
<style>
  .card {
    width: 400px;
    height: 300px;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
  }
  .card-content {
    position: absolute;
    inset: 0;
    padding: 20px;
    color: white;
    z-index: 10;
  }
</style>

<div class="card" id="card-bg">
  <div class="card-content">
    <h2>Card Title</h2>
    <p>Card content here</p>
  </div>
</div>

<script type="module">
  import FrostCanvas from 'frosted-canvas';
  new FrostCanvas('#card-bg', { preset: 5 });
</script>
```

## 3. Section Background

```html
<style>
  .section {
    width: 100%;
    min-height: 500px;
    position: relative;
  }
  .section-content {
    position: relative;
    z-index: 10;
    padding: 60px 20px;
    text-align: center;
    color: white;
  }
</style>

<section class="section" id="section-bg">
  <div class="section-content">
    <h2>Features</h2>
    <p>Amazing features with beautiful backgrounds</p>
  </div>
</section>

<script type="module">
  import FrostCanvas from 'frosted-canvas';
  new FrostCanvas('#section-bg', { preset: 2 });
</script>
```

## 4. Multiple Backgrounds on Same Page

```html
<div id="bg-1" style="width: 100%; height: 400px;"></div>
<div id="bg-2" style="width: 100%; height: 400px;"></div>
<div id="bg-3" style="width: 100%; height: 400px;"></div>

<script type="module">
  import FrostCanvas from 'frosted-canvas';
  
  new FrostCanvas('#bg-1', { preset: 0 });
  new FrostCanvas('#bg-2', { preset: 3 });
  new FrostCanvas('#bg-3', { preset: 7 });
</script>
```

## 5. Interactive Preset Switcher

```html
<div id="bg" style="width: 100%; height: 100vh; position: relative;">
  <div style="position: absolute; top: 20px; left: 20px; z-index: 10;">
    <button onclick="frost.setPreset(0)">Sunset</button>
    <button onclick="frost.setPreset(1)">Ocean</button>
    <button onclick="frost.setPreset(2)">Forest</button>
    <button onclick="frost.setPreset(3)">Purple</button>
  </div>
</div>

<script type="module">
  import FrostCanvas from 'frosted-canvas';
  window.frost = new FrostCanvas('#bg', { preset: 0 });
</script>
```

## 6. With Debug GUI (Development)

```javascript
import FrostCanvas from 'frosted-canvas';

const frost = new FrostCanvas('#bg', {
  preset: 0,
  showGUI: true  // Shows lil-gui controls for tweaking
});
```

## 7. Responsive Container

```html
<style>
  .responsive-bg {
    width: 100%;
    height: 50vh;
  }
  
  @media (max-width: 768px) {
    .responsive-bg {
      height: 300px;
    }
  }
</style>

<div class="responsive-bg" id="bg"></div>

<script type="module">
  import FrostCanvas from 'frosted-canvas';
  new FrostCanvas('#bg', {
    preset: 0,
    autoResize: true  // Automatically adjusts to container size changes
  });
</script>
```

## 8. Clean Up on Navigation (SPA)

```javascript
import FrostCanvas from 'frosted-canvas';

let frost = null;

function showPage() {
  frost = new FrostCanvas('#bg', { preset: 0 });
}

function hidePage() {
  if (frost) {
    frost.destroy();  // Clean up resources
    frost = null;
  }
}
```

## 9. Next.js Example

```jsx
'use client';

import { useEffect, useRef } from 'react';
import FrostCanvas from 'frosted-canvas';

export default function Hero() {
  const containerRef = useRef(null);
  const frostRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !frostRef.current) {
      frostRef.current = new FrostCanvas(containerRef.current, {
        preset: 0
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
    <div 
      ref={containerRef} 
      style={{ width: '100%', height: '100vh', position: 'relative' }}
    >
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)',
        color: 'white',
        zIndex: 10
      }}>
        <h1>Next.js + Frosted Canvas</h1>
      </div>
    </div>
  );
}
```

## 10. Custom Colors

```html
<div id="bg" style="width: 100%; height: 100vh;"></div>

<script type="module">
  import FrostCanvas from 'frosted-canvas';
  
  const frost = new FrostCanvas('#bg');
  
  // Set your brand colors
  frost.setColors({
    paletteA: [0.9, 0.2, 0.5],  // Pink
    paletteB: [0.5, 0.5, 0.5],  // Gray
    paletteC: [1.0, 0.8, 0.3],  // Yellow
    paletteD: [0.1, 0.3, 0.6]   // Blue
  });
  
  // Adjust animation
  frost.setConfig({
    animationSpeed: 0.3,
    noiseScale: 0.5
  });
</script>
```

## 11. Hex Color Converter

```javascript
import FrostCanvas from 'frosted-canvas';

const frost = new FrostCanvas('#bg');

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

// Use hex colors
frost.setColors({
  paletteA: hexToRgb('#FF6B6B'),
  paletteB: hexToRgb('#808080'),
  paletteC: hexToRgb('#4ECDC4'),
  paletteD: hexToRgb('#1A535C')
});
```

## 12. Svelte Example

```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import FrostCanvas from 'frosted-canvas';

  let container;
  let frost;

  onMount(() => {
    frost = new FrostCanvas(container, { preset: 0 });
  });

  onDestroy(() => {
    if (frost) frost.destroy();
  });
</script>

<div bind:this={container} class="background">
  <h1>Svelte + Frosted Canvas</h1>
</div>

<style>
  .background {
    width: 100%;
    height: 100vh;
    position: relative;
  }

  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    z-index: 10;
  }
</style>
```
