# Changelog

All notable changes to Frosted Canvas will be documented in this file.

## [2.0.0] - 2025-01-08

### 🎨 New Features

#### Static Background Option
- **Static Mode**: New `static` option in constructor for non-animated backgrounds
- When `static: true`, the background only re-renders when needed (no continuous animation loop)
- Automatically re-renders when calling `setColors()`, `setConfig()`, `setPreset()`, or on resize
- Perfect for performance-sensitive scenarios and static designs
- Reduces CPU/GPU usage and improves battery life on mobile devices
- Maintains full functionality - all methods work the same way

### 📚 Documentation Updates
- Updated README.md with static background usage
- Added static background examples to docs.html
- Updated API reference with `static` option
- Added "When to Use Static Backgrounds" section
- Updated test.html with static/animated mode toggle
- Added static background example to example.html

---

## [2.0.0] - 2025

### 🎨 Major Features

#### Advanced Gradient Controls
- **Domain Warping**: New `uDomainWarpStrength` uniform (0-0.5) for organic coordinate space warping
- **Turbulence**: New `uTurbulence` uniform (0-1.0) adds fractal Brownian motion with 5 octaves
- **Gradient Rotation**: New `uGradientAngle` uniform (0-6.28 radians) for dynamic gradient rotation
- **Color Spread**: New `uColorSpread` uniform (0.1-3.0) controls color distribution
- **Flow Speed**: New `uFlowSpeed` uniform (0-1.0) for independent flow animation control

### 🔧 Technical Improvements

#### Shader Enhancements
- Added `rotate2D()` function for 2D coordinate rotation
- Added `domainWarp()` function with two-layer noise warping
- Added `fbm()` function for fractional Brownian motion
- Optimized noise layering for better performance
- Enhanced organic gradient generation

#### API Updates
- `setConfig()` now accepts 5 new parameters:
  - `domainWarpStrength`
  - `turbulence`
  - `gradientAngle`
  - `colorSpread`
  - `flowSpeed`
- `getConfig()` returns all new gradient parameters
- All 43 presets updated with new uniform defaults

#### GUI Improvements
- New "Gradient" folder in debug GUI with 5 controls
- "Animation" folder now includes Flow Speed control
- Better organization of controls

#### Color Customizer
- Added 5 new sliders for gradient controls
- Real-time preview of all new parameters
- Updated code output to include new config options
- Improved UI with better labeling

### 📚 Documentation
- Updated README.md with v2.0 features
- New "Advanced Gradient Controls" section
- Added GRADIENT_FEATURES.md with technical details
- Updated all code examples
- Added usage examples for new features

### 🎯 Preset Updates
All 43 presets now include:
- `uDomainWarpStrength: 0.0` (default, opt-in)
- `uTurbulence: 0.0` (default, opt-in)
- `uGradientAngle: 0.0`
- `uColorSpread: 1.0`
- `uFlowSpeed: 0.3`

### 🔄 Breaking Changes
None - v2.0 is fully backward compatible. New features are opt-in with sensible defaults.

### 📦 Library Defaults
- `lib.js`: New uniforms have non-zero defaults for enhanced visuals
  - `uDomainWarpStrength: 0.15`
  - `uTurbulence: 0.2`
- `main.js`: New uniforms default to 0 for backward compatibility

---

## [1.0.0] - Initial Release

### Features
- 43 beautiful preset gradients
- Custom color API with 4-palette system
- Cosine-based procedural gradients
- Simplex noise for organic motion
- Animation controls
- Grain and vignette effects
- Framework support (React, Vue, Svelte)
- CDN support
- Auto-resize functionality
- Debug GUI
