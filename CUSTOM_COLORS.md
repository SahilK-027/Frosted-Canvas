# Custom Colors Guide

Create your own unique gradients with Frosted Canvas!

## Quick Start

```javascript
import FrostCanvas from 'frosted-canvas';

const frost = new FrostCanvas('#container');

// Set your custom colors
frost.setColors({
  paletteA: [0.9, 0.2, 0.5],  // Pink
  paletteB: [0.5, 0.5, 0.5],  // Gray
  paletteC: [1.0, 0.8, 0.3],  // Yellow
  paletteD: [0.1, 0.3, 0.6]   // Blue
});
```

## Understanding the Color Palette

The shader uses 4 color palettes (A, B, C, D) that work together to create the gradient:

- **Palette A (Offset)**: Base color offset - shifts the entire color range
- **Palette B (Amplitude)**: Color intensity - controls how vibrant colors are
- **Palette C (Frequency)**: Color variation - controls how colors transition
- **Palette D (Phase)**: Color shift - offsets the color wave

Each palette takes RGB values from 0 to 1:
- `[1.0, 0.0, 0.0]` = Red
- `[0.0, 1.0, 0.0]` = Green
- `[0.0, 0.0, 1.0]` = Blue
- `[1.0, 1.0, 1.0]` = White
- `[0.0, 0.0, 0.0]` = Black

## Color Examples

### Sunset Orange & Pink
```javascript
frost.setColors({
  paletteA: [0.9, 0.65, 1.0],
  paletteB: [0.5, 0.5, 0.5],
  paletteC: [1.0, 0.7, 0.4],
  paletteD: [0.0, 0.15, 0.2]
});
```

### Ocean Blue & Teal
```javascript
frost.setColors({
  paletteA: [0.5, 0.8, 1.0],
  paletteB: [0.5, 0.5, 0.5],
  paletteC: [1.0, 1.0, 0.5],
  paletteD: [0.0, 0.1, 0.2]
});
```

### Purple & Magenta
```javascript
frost.setColors({
  paletteA: [0.8, 0.5, 1.0],
  paletteB: [0.5, 0.5, 0.5],
  paletteC: [1.0, 0.5, 0.8],
  paletteD: [0.3, 0.2, 0.5]
});
```

### Green & Yellow
```javascript
frost.setColors({
  paletteA: [0.6, 1.0, 0.5],
  paletteB: [0.5, 0.5, 0.5],
  paletteC: [0.8, 1.0, 0.3],
  paletteD: [0.2, 0.3, 0.0]
});
```

### Red & Orange Fire
```javascript
frost.setColors({
  paletteA: [1.0, 0.5, 0.3],
  paletteB: [0.5, 0.5, 0.5],
  paletteC: [1.0, 0.6, 0.2],
  paletteD: [0.0, 0.1, 0.0]
});
```

### Monochrome Blue
```javascript
frost.setColors({
  paletteA: [0.3, 0.5, 0.8],
  paletteB: [0.3, 0.3, 0.3],
  paletteC: [0.5, 0.7, 1.0],
  paletteD: [0.1, 0.2, 0.4]
});
```

## Converting Hex Colors to RGB

If you have hex colors, convert them to 0-1 RGB:

```javascript
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

// Example: Use brand colors
const brandPrimary = hexToRgb('#FF6B6B');   // [1.0, 0.42, 0.42]
const brandSecondary = hexToRgb('#4ECDC4'); // [0.31, 0.80, 0.77]

frost.setColors({
  paletteA: brandPrimary,
  paletteB: [0.5, 0.5, 0.5],
  paletteC: brandSecondary,
  paletteD: [0.2, 0.2, 0.3]
});
```

## Additional Configuration

Control the animation and effects:

```javascript
frost.setConfig({
  noiseScale: 0.3,        // 0.1-3.0: Size of noise patterns
  noiseStrength: 0.35,    // 0-1.0: Intensity of distortion
  animationSpeed: 0.5,    // 0-0.5: Speed of animation
  grainIntensity: 0.03,   // 0-0.2: Film grain effect
  vignetteStrength: 3.0   // 0-3.0: Edge darkening
});
```

## Getting Current Values

```javascript
// Get current colors
const colors = frost.getColors();
console.log(colors);
// {
//   paletteA: [0.9, 0.65, 1.0],
//   paletteB: [0.5, 0.5, 0.5],
//   paletteC: [1.0, 0.7, 0.4],
//   paletteD: [0.0, 0.15, 0.2]
// }

// Get current config
const config = frost.getConfig();
console.log(config);
// {
//   noiseScale: 0.3,
//   noiseStrength: 0.35,
//   animationSpeed: 0.5,
//   grainIntensity: 0.03,
//   vignetteStrength: 3.0
// }
```

## Interactive Color Picker Example

```html
<div id="bg" style="width: 100%; height: 100vh;"></div>

<div style="position: fixed; top: 20px; right: 20px; z-index: 100;">
  <label>
    Primary Color:
    <input type="color" id="color1" value="#e6a6ff">
  </label>
  <label>
    Secondary Color:
    <input type="color" id="color2" value="#ffc266">
  </label>
</div>

<script type="module">
  import FrostCanvas from 'frosted-canvas';

  const frost = new FrostCanvas('#bg');

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
  }

  document.getElementById('color1').addEventListener('input', (e) => {
    frost.setColors({
      paletteA: hexToRgb(e.target.value)
    });
  });

  document.getElementById('color2').addEventListener('input', (e) => {
    frost.setColors({
      paletteC: hexToRgb(e.target.value)
    });
  });
</script>
```

## Tips for Creating Great Gradients

1. **Start with a preset**: Use `frost.setPreset(0)` then tweak from there
2. **Keep Palette B moderate**: Values around 0.5 work best for amplitude
3. **Experiment with Palette C**: This creates the most dramatic changes
4. **Use complementary colors**: Colors opposite on the color wheel create vibrant gradients
5. **Test different noise settings**: Lower noiseScale = larger patterns
6. **Adjust animation speed**: Slower speeds (0.1-0.3) are often more elegant

## Saving and Loading Presets

```javascript
// Save current state
const myPreset = {
  colors: frost.getColors(),
  config: frost.getConfig()
};

// Save to localStorage
localStorage.setItem('myGradient', JSON.stringify(myPreset));

// Load later
const saved = JSON.parse(localStorage.getItem('myGradient'));
frost.setColors(saved.colors);
frost.setConfig(saved.config);
```

## Random Gradient Generator

```javascript
function randomGradient() {
  const random = () => Math.random();
  
  frost.setColors({
    paletteA: [random(), random(), random()],
    paletteB: [0.5, 0.5, 0.5],
    paletteC: [random(), random(), random()],
    paletteD: [random() * 0.5, random() * 0.5, random() * 0.5]
  });
}

// Generate random gradient every 5 seconds
setInterval(randomGradient, 5000);
```

## Brand Color Integration

```javascript
// Use your brand colors
const brandColors = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#FFE66D'
};

frost.setColors({
  paletteA: hexToRgb(brandColors.primary),
  paletteB: [0.5, 0.5, 0.5],
  paletteC: hexToRgb(brandColors.secondary),
  paletteD: hexToRgb(brandColors.accent).map(v => v * 0.3)
});
```
