# Quick Start

## Installation

```bash
npm install frosted-canvas three
```

## Basic Usage (Preset)

```javascript
import FrostCanvas from 'frosted-canvas';

// Use a preset gradient
const frost = new FrostCanvas('#container', {
  preset: 0  // 0-43 (44 presets total)
});
```

## Custom Colors

```javascript
import FrostCanvas from 'frosted-canvas';

const frost = new FrostCanvas('#container');

// Create your own gradient
frost.setColors({
  paletteA: [0.9, 0.2, 0.5],  // Pink
  paletteB: [0.5, 0.5, 0.5],  // Gray
  paletteC: [1.0, 0.8, 0.3],  // Yellow
  paletteD: [0.1, 0.3, 0.6]   // Blue
});
```

## Using Hex Colors

```javascript
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

frost.setColors({
  paletteA: hexToRgb('#FF6B6B'),
  paletteC: hexToRgb('#4ECDC4')
});
```

## HTML Setup

```html
<div id="container" style="width: 100%; height: 100vh;"></div>
```

## Complete Example

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    #bg {
      width: 100%;
      height: 100vh;
      position: relative;
    }
    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      z-index: 10;
    }
  </style>
</head>
<body>
  <div id="bg">
    <div class="content">
      <h1>Hello World</h1>
    </div>
  </div>

  <script type="module">
    import FrostCanvas from 'frosted-canvas';
    
    const frost = new FrostCanvas('#bg', {
      preset: 0,
      autoResize: true
    });
  </script>
</body>
</html>
```

## Next Steps

- [Custom Colors Guide](./CUSTOM_COLORS.md) - Create unique gradients
- [Usage Examples](./USAGE_EXAMPLES.md) - 12+ examples
- [API Reference](./README.md#api-methods) - Full API docs
- [Live Demo](https://frosted-canvas.vercel.app/) - See it in action

## Need Help?

- 📖 [Full Documentation](./README.md)
- 🎨 [Color Customizer](./color-customizer.html) - Interactive tool
- 💡 [Examples](./USAGE_EXAMPLES.md) - Real-world use cases
