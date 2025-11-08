import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import { presetData } from './data/presetData';

class FrostCanvas {
  constructor(container, options = {}) {
    this.container =
      typeof container === 'string'
        ? document.querySelector(container)
        : container;

    if (!this.container) {
      throw new Error('FrostCanvas: Container element not found');
    }

    // Options
    this.options = {
      showGUI: options.showGUI ?? false,
      showPresets: options.showPresets ?? false,
      preset: options.preset ?? 0,
      autoResize: options.autoResize ?? true,
      static: options.static ?? false,
      ...options,
    };

    // Setup
    this.canvas = null;
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();
    this.presets = presetData;
    this.currentPresetIndex = this.options.preset;
    this.transition = null;

    this.init();
  }

  init() {
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.display = 'block';
    this.container.appendChild(this.canvas);

    // Get container size
    const rect = this.container.getBoundingClientRect();
    this.sizes = { width: rect.width, height: rect.height };

    this.initCamera();
    this.initGeometry();
    this.initRenderer();
    this.initControls();

    if (this.options.autoResize) {
      this.initEventListeners();
    }

    if (this.options.showGUI) {
      this.initGUI();
    }

    // Apply initial preset
    this.applyPresetImmediate(this.presets[this.currentPresetIndex]);
    this.startAnimationLoop();
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 1);
    this.scene.add(this.camera);
  }

  initGeometry() {
    const distance = this.camera.position.z;
    const vFov = (this.camera.fov * Math.PI) / 180;
    const planeHeight = 2 * Math.tan(vFov / 2) * distance;
    const planeWidth = planeHeight * (this.sizes.width / this.sizes.height);

    this.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 32, 32);

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(this.sizes.width, this.sizes.height),
        },
        uNoiseScale: { value: 0.3 },
        uNoiseStrength: { value: 0.35 },
        uAnimationSpeed: { value: 0.5 },
        uGrainIntensity: { value: 0.03 },
        uVignetteStrength: { value: 3.0 },
        uPaletteA: { value: new THREE.Vector3(0.9, 0.65, 1.0) },
        uPaletteB: { value: new THREE.Vector3(0.5, 0.5, 0.5) },
        uPaletteC: { value: new THREE.Vector3(1.0, 0.7, 0.4) },
        uPaletteD: { value: new THREE.Vector3(0.0, 0.15, 0.2) },
        // Advanced gradient controls
        uDomainWarpStrength: { value: 0.15 },
        uTurbulence: { value: 0.2 },
        uGradientAngle: { value: 0.0 },
        uColorSpread: { value: 1.0 },
        uFlowSpeed: { value: 0.3 },
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enabled = false;
  }

  initEventListeners() {
    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.container);
  }

  initGUI() {
    this.gui = new GUI({ width: 300 });

    const animationFolder = this.gui.addFolder('Animation');
    animationFolder.close();
    animationFolder
      .add(this.material.uniforms.uAnimationSpeed, 'value')
      .min(0)
      .max(0.5)
      .step(0.01)
      .name('Speed');
    animationFolder
      .add(this.material.uniforms.uFlowSpeed, 'value')
      .min(0)
      .max(1.0)
      .step(0.01)
      .name('Flow Speed');

    const gradientFolder = this.gui.addFolder('Gradient');
    gradientFolder.close();
    gradientFolder
      .add(this.material.uniforms.uGradientAngle, 'value')
      .min(0)
      .max(Math.PI * 2)
      .step(0.01)
      .name('Angle');
    gradientFolder
      .add(this.material.uniforms.uColorSpread, 'value')
      .min(0.1)
      .max(3.0)
      .step(0.1)
      .name('Color Spread');
    gradientFolder
      .add(this.material.uniforms.uDomainWarpStrength, 'value')
      .min(0)
      .max(0.5)
      .step(0.01)
      .name('Warp Strength');
    gradientFolder
      .add(this.material.uniforms.uTurbulence, 'value')
      .min(0)
      .max(1.0)
      .step(0.05)
      .name('Turbulence');

    const noiseFolder = this.gui.addFolder('Noise');
    noiseFolder.close();
    noiseFolder
      .add(this.material.uniforms.uNoiseScale, 'value')
      .min(0.1)
      .max(3.0)
      .step(0.1)
      .name('Scale');
    noiseFolder
      .add(this.material.uniforms.uNoiseStrength, 'value')
      .min(0)
      .max(1.0)
      .step(0.05)
      .name('Strength');
  }

  handleResize() {
    const rect = this.container.getBoundingClientRect();
    this.sizes.width = rect.width;
    this.sizes.height = rect.height;

    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.material.uniforms.uResolution.value.set(
      this.sizes.width,
      this.sizes.height
    );

    const distance = this.camera.position.z;
    const vFov = (this.camera.fov * Math.PI) / 180;
    const planeHeight = 2 * Math.tan(vFov / 2) * distance;
    const planeWidth = planeHeight * this.camera.aspect;
    this.geometry.dispose();
    this.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 32, 32);
    this.mesh.geometry = this.geometry;
    
    // Re-render if in static mode
    if (this.options.static) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  applyPresetImmediate(preset) {
    const u = this.material.uniforms;
    Object.keys(preset.uniforms).forEach((k) => {
      const v = preset.uniforms[k];
      if (v instanceof THREE.Vector3) u[k].value.copy(v);
      else u[k].value = v;
    });
    this.transition = null;
  }

  setPreset(index) {
    const clamped = Math.max(0, Math.min(index, this.presets.length - 1));
    this.currentPresetIndex = clamped;
    this.applyPresetImmediate(this.presets[clamped]);
    
    // Re-render if in static mode
    if (this.options.static) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  setColors(colors) {
    const u = this.material.uniforms;

    if (colors.paletteA) {
      u.uPaletteA.value.set(
        colors.paletteA[0],
        colors.paletteA[1],
        colors.paletteA[2]
      );
    }
    if (colors.paletteB) {
      u.uPaletteB.value.set(
        colors.paletteB[0],
        colors.paletteB[1],
        colors.paletteB[2]
      );
    }
    if (colors.paletteC) {
      u.uPaletteC.value.set(
        colors.paletteC[0],
        colors.paletteC[1],
        colors.paletteC[2]
      );
    }
    if (colors.paletteD) {
      u.uPaletteD.value.set(
        colors.paletteD[0],
        colors.paletteD[1],
        colors.paletteD[2]
      );
    }
    
    // Re-render if in static mode
    if (this.options.static) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  setConfig(config) {
    const u = this.material.uniforms;

    if (config.noiseScale !== undefined)
      u.uNoiseScale.value = config.noiseScale;
    if (config.noiseStrength !== undefined)
      u.uNoiseStrength.value = config.noiseStrength;
    if (config.animationSpeed !== undefined)
      u.uAnimationSpeed.value = config.animationSpeed;
    if (config.grainIntensity !== undefined)
      u.uGrainIntensity.value = config.grainIntensity;
    if (config.vignetteStrength !== undefined)
      u.uVignetteStrength.value = config.vignetteStrength;
    if (config.domainWarpStrength !== undefined)
      u.uDomainWarpStrength.value = config.domainWarpStrength;
    if (config.turbulence !== undefined)
      u.uTurbulence.value = config.turbulence;
    if (config.gradientAngle !== undefined)
      u.uGradientAngle.value = config.gradientAngle;
    if (config.colorSpread !== undefined)
      u.uColorSpread.value = config.colorSpread;
    if (config.flowSpeed !== undefined)
      u.uFlowSpeed.value = config.flowSpeed;
    
    // Re-render if in static mode
    if (this.options.static) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  getColors() {
    const u = this.material.uniforms;
    return {
      paletteA: [u.uPaletteA.value.x, u.uPaletteA.value.y, u.uPaletteA.value.z],
      paletteB: [u.uPaletteB.value.x, u.uPaletteB.value.y, u.uPaletteB.value.z],
      paletteC: [u.uPaletteC.value.x, u.uPaletteC.value.y, u.uPaletteC.value.z],
      paletteD: [u.uPaletteD.value.x, u.uPaletteD.value.y, u.uPaletteD.value.z],
    };
  }

  getConfig() {
    const u = this.material.uniforms;
    return {
      noiseScale: u.uNoiseScale.value,
      noiseStrength: u.uNoiseStrength.value,
      animationSpeed: u.uAnimationSpeed.value,
      grainIntensity: u.uGrainIntensity.value,
      vignetteStrength: u.uVignetteStrength.value,
      domainWarpStrength: u.uDomainWarpStrength.value,
      turbulence: u.uTurbulence.value,
      gradientAngle: u.uGradientAngle.value,
      colorSpread: u.uColorSpread.value,
      flowSpeed: u.uFlowSpeed.value,
    };
  }

  animate() {
    if (!this.options.static) {
      const elapsed = this.clock.getElapsedTime();
      this.material.uniforms.uTime.value = elapsed;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    
    if (!this.options.static) {
      this.animationId = requestAnimationFrame(() => this.animate());
    }
  }

  startAnimationLoop() {
    if (this.options.static) {
      // For static backgrounds, render once
      this.renderer.render(this.scene, this.camera);
    } else {
      // For animated backgrounds, start the animation loop
      this.animate();
    }
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.gui) {
      this.gui.destroy();
    }
    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
  }
}

export default FrostCanvas;
