// src/main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import { presetData } from './data/presetData';

class ShaderRenderer {
  constructor() {
    // GUI
    this.gui = new GUI({ width: 300 });

    // DOM
    this.canvas = document.querySelector('canvas.webgl');
    this.presetTrackEl = null;
    this.presetViewportEl = null;
    this.prevBtn = null;
    this.nextBtn = null;
    this.announceEl = null;

    // Scene
    this.scene = new THREE.Scene();

    // Sizes
    this.sizes = { width: window.innerWidth, height: window.innerHeight };

    // Clock
    this.clock = new THREE.Clock();

    // Presets
    this.presets = this.createPresets();
    this.currentPresetIndex = 0;
    this.transition = null;

    // Drag/swipe
    this.isPointerDown = false;
    this.startX = 0;
    this.currentTranslate = 0;
    this.dragDelta = 0;

    // Init
    this.initCamera();
    this.initGeometry();
    this.initRenderer();
    this.initControls();
    this.initEventListeners();
    this.initGUI();
    this.initPresetUI();
    this.startAnimationLoop();
  }

  // ---------- Presets ----------
  createPresets() {
    return presetData;
  }

  // ---------- Three.js setup ----------
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
      },
    });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
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
    window.addEventListener('resize', () => this.handleResize());
  }

  initGUI() {
    // keep a compact set of controls
    const animationFolder = this.gui.addFolder('Animation');
    animationFolder.close();
    animationFolder
      .add(this.material.uniforms.uAnimationSpeed, 'value')
      .min(0)
      .max(0.5)
      .step(0.01)
      .name('Speed');

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

    const grainFolder = this.gui.addFolder('Grain');
    grainFolder.close();
    grainFolder
      .add(this.material.uniforms.uGrainIntensity, 'value')
      .min(0)
      .max(0.2)
      .step(0.01)
      .name('Intensity');

    const vignetteFolder = this.gui.addFolder('Vignette');
    vignetteFolder.close();
    vignetteFolder
      .add(this.material.uniforms.uVignetteStrength, 'value')
      .min(0)
      .max(3.0)
      .step(0.1)
      .name('Strength');

    // palette controls (compact)
    const paletteFolder = this.gui.addFolder('Palette');
    paletteFolder.close();
    const a = this.material.uniforms.uPaletteA.value;
    const b = this.material.uniforms.uPaletteB.value;
    const c = this.material.uniforms.uPaletteC.value;
    const d = this.material.uniforms.uPaletteD.value;

    const paletteAFolder = paletteFolder.addFolder('A - Offset');
    paletteAFolder.close();
    paletteAFolder.add(a, 'x').min(0).max(1).step(0.01).name('R');
    paletteAFolder.add(a, 'y').min(0).max(1).step(0.01).name('G');
    paletteAFolder.add(a, 'z').min(0).max(1).step(0.01).name('B');

    const paletteBFolder = paletteFolder.addFolder('B - Amplitude');
    paletteBFolder.close();
    paletteBFolder.add(b, 'x').min(0).max(1).step(0.01).name('R');
    paletteBFolder.add(b, 'y').min(0).max(1).step(0.01).name('G');
    paletteBFolder.add(b, 'z').min(0).max(1).step(0.01).name('B');

    const paletteCFolder = paletteFolder.addFolder('C - Frequency');
    paletteCFolder.close();
    paletteCFolder.add(c, 'x').min(0).max(2).step(0.01).name('R');
    paletteCFolder.add(c, 'y').min(0).max(2).step(0.01).name('G');
    paletteCFolder.add(c, 'z').min(0).max(2).step(0.01).name('B');

    const paletteDFolder = paletteFolder.addFolder('D - Phase');
    paletteDFolder.close();
    paletteDFolder.add(d, 'x').min(0).max(1).step(0.01).name('R');
    paletteDFolder.add(d, 'y').min(0).max(1).step(0.01).name('G');
    paletteDFolder.add(d, 'z').min(0).max(1).step(0.01).name('B');
  }

  // ---------- PRESSET UI ----------
  initPresetUI() {
    // DOM refs
    this.presetTrackEl = document.getElementById('preset-track');
    this.presetViewportEl = document.querySelector('.preset-viewport');
    this.prevBtn = document.getElementById('prev');
    this.nextBtn = document.getElementById('next');
    this.announceEl = document.getElementById('preset-status');

    // restore last
    const saved = window.localStorage.getItem('frostCanvasPresetIndex');
    if (saved !== null) {
      const i = parseInt(saved, 10);
      if (!Number.isNaN(i) && i >= 0 && i < this.presets.length)
        this.currentPresetIndex = i;
    }

    // render chips
    this.renderPresetChips();
    // apply initial preset
    this.applyPresetImmediate(this.presets[this.currentPresetIndex]);
    // position track
    this.updateTrackPosition(true);

    // buttons
    this.prevBtn.addEventListener('click', () => {
      const idx =
        (this.currentPresetIndex - 1 + this.presets.length) %
        this.presets.length;
      this.switchToPreset(idx);
      this.focusChip(idx);
    });
    this.nextBtn.addEventListener('click', () => {
      const idx = (this.currentPresetIndex + 1) % this.presets.length;
      this.switchToPreset(idx);
      this.focusChip(idx);
    });

    // keyboard navigation (global)
    window.addEventListener('keydown', (e) => {
      if (
        document.activeElement &&
        (document.activeElement.tagName === 'INPUT' ||
          document.activeElement.tagName === 'TEXTAREA')
      )
        return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const delta = e.key === 'ArrowLeft' ? -1 : 1;
        const idx =
          (this.currentPresetIndex + delta + this.presets.length) %
          this.presets.length;
        this.switchToPreset(idx);
        this.focusChip(idx);
      }
    });

    // pointer drag (swipe)
    this.addSwipeHandlers();
  }

  // convert Vector3 to rgb string
  rgbFromVec3(v) {
    const x = Math.round((v.x ?? v[0]) * 255);
    const y = Math.round((v.y ?? v[1]) * 255);
    const z = Math.round((v.z ?? v[2]) * 255);
    return `rgb(${x}, ${y}, ${z})`;
  }

  renderPresetChips() {
    if (!this.presetTrackEl) return;
    this.presetTrackEl.innerHTML = '';
    this.presets.forEach((p, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'preset-chip';
      btn.setAttribute('role', 'option');
      btn.setAttribute('aria-selected', 'false');
      btn.dataset.index = String(i);
      btn.title = p.description || p.name;
      btn.tabIndex = 0;

      const sw = document.createElement('span');
      sw.className = 'preset-swatch';
      const a = p.uniforms.uPaletteA;
      const b = p.uniforms.uPaletteB;
      const c = p.uniforms.uPaletteC;
      const colA = this.rgbFromVec3(a);
      const colB = this.rgbFromVec3(b);
      const colC = this.rgbFromVec3(c);
      sw.style.background = `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.06), transparent 12%), linear-gradient(135deg, ${colA}, ${colB} 55%, ${colC})`;

      const meta = document.createElement('div');
      meta.className = 'preset-meta';
      const name = document.createElement('div');
      name.className = 'preset-name';
      name.textContent = p.name;
      const desc = document.createElement('div');
      desc.className = 'preset-desc';
      desc.textContent = p.description || '';

      meta.appendChild(name);
      meta.appendChild(desc);
      btn.appendChild(sw);
      btn.appendChild(meta);

      // click -> switch
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.index);
        this.switchToPreset(idx);
        btn.focus({ preventScroll: true });
      });

      btn.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          btn.click();
        }
      });

      this.presetTrackEl.appendChild(btn);
    });

    // after render, mark active/side and position track
    this.updateChipClasses();
    this.updateTrackPosition(true);
  }

  updateChipClasses() {
    if (!this.presetTrackEl) return;
    const chips = Array.from(this.presetTrackEl.children);
    chips.forEach((c, i) => {
      c.classList.remove('active', 'side');
      c.setAttribute('aria-selected', 'false');
      if (i === this.currentPresetIndex) {
        c.classList.add('active');
        c.setAttribute('aria-selected', 'true');
      } else if (
        i === (this.currentPresetIndex - 1 + chips.length) % chips.length ||
        i === (this.currentPresetIndex + 1) % chips.length
      ) {
        c.classList.add('side');
      }
    });
  }

  focusChip(idx) {
    if (!this.presetTrackEl) return;
    const btn = this.presetTrackEl.querySelector(
      `.preset-chip[data-index='${idx}']`
    );
    if (btn) btn.focus({ preventScroll: true });
  }

  // compute & set track translate so current item is centered with half-visible neighbors
  updateTrackPosition(skipAnimation = false) {
    if (!this.presetTrackEl || !this.presetViewportEl) return;

    // read CSS variables and item dims
    const style = getComputedStyle(this.presetViewportEl);
    // item width (computed from CSS var on root)
    const rootStyle = getComputedStyle(document.documentElement);
    const itemW = parseFloat(rootStyle.getPropertyValue('--item-w')) || 260;
    const gap = parseFloat(rootStyle.getPropertyValue('--gap')) || 12;
    const halfW = itemW / 2;

    // compute desired translate: we want the track to shift so that the current item appears centered inside the viewport
    // viewport center is implicitly at halfW from left edge of viewport (because width = item + 2*halfW)
    // translateX = -index*(itemW + gap) + halfW
    const baseX = -this.currentPresetIndex * (itemW + gap) + halfW;

    // apply transition if not skipping (drag handling will bypass)
    if (skipAnimation) {
      this.presetTrackEl.style.transition = 'none';
    } else {
      this.presetTrackEl.style.transition =
        'transform 480ms cubic-bezier(.22,.9,.28,1)';
    }

    // set transform
    this.presetTrackEl.style.transform = `translateX(${baseX}px)`;
    this.currentTranslate = baseX;
    // update classes
    this.updateChipClasses();

    // restore transition after applying immediate
    if (skipAnimation) {
      // force layout and restore transition for next moves
      // eslint-disable-next-line no-unused-expressions
      this.presetTrackEl.getBoundingClientRect();
      this.presetTrackEl.style.transition =
        'transform 480ms cubic-bezier(.22,.9,.28,1)';
    }
  }

  // ---------- switching logic ----------
  switchToPreset(index, transitionDuration = 0.9) {
    const clamped = Math.max(0, Math.min(index, this.presets.length - 1));
    if (clamped === this.currentPresetIndex && !this.transition) {
      // no-op
      return;
    }
    const target = this.presets[clamped];
    this.currentPresetIndex = clamped;
    window.localStorage.setItem('frostCanvasPresetIndex', String(clamped));
    this.announcePresetChange(target);

    if (transitionDuration > 0)
      this.startPresetTransition(target, transitionDuration);
    else this.applyPresetImmediate(target);

    // visually center track
    this.updateTrackPosition(false);
  }

  announcePresetChange(preset) {
    if (!this.announceEl) return;
    this.announceEl.textContent = `Preset changed to ${preset.name}`;
  }

  applyPresetImmediate(preset) {
    const u = this.material.uniforms;
    Object.keys(preset.uniforms).forEach((k) => {
      const v = preset.uniforms[k];
      if (v instanceof THREE.Vector3) u[k].value.copy(v);
      else u[k].value = v;
    });
    this.transition = null;
    this.updateChipClasses();
    this.updateTrackPosition(true);
  }

  startPresetTransition(preset, durationSec = 0.9) {
    const start = {};
    const end = {};
    const keys = Object.keys(preset.uniforms);
    keys.forEach((k) => {
      const cur = this.material.uniforms[k].value;
      const targetVal = preset.uniforms[k];
      if (cur instanceof THREE.Vector3 || targetVal instanceof THREE.Vector3) {
        start[k] = cur.clone();
        end[k] =
          targetVal instanceof THREE.Vector3
            ? targetVal.clone()
            : new THREE.Vector3(targetVal, targetVal, targetVal);
      } else {
        start[k] = Number(cur);
        end[k] = Number(targetVal);
      }
    });

    this.transition = {
      start,
      end,
      duration: Math.max(0.04, durationSec),
      startedAt: this.clock.getElapsedTime(),
    };
  }

  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // ---------- swipe / drag logic ----------
  addSwipeHandlers() {
    if (!this.presetViewportEl || !this.presetTrackEl) return;

    const vp = this.presetViewportEl;
    const track = this.presetTrackEl;

    // pointer down
    vp.addEventListener('pointerdown', (e) => {
      this.isPointerDown = true;
      this.startX = e.clientX;
      this.dragDelta = 0;
      // disable transition while dragging
      track.style.transition = 'none';
      vp.setPointerCapture(e.pointerId);
    });

    vp.addEventListener('pointermove', (e) => {
      if (!this.isPointerDown) return;
      const dx = e.clientX - this.startX;
      this.dragDelta = dx;
      // apply drag offset on top of base translate
      track.style.transform = `translateX(${this.currentTranslate + dx}px)`;
    });

    vp.addEventListener('pointerup', (e) => {
      if (!this.isPointerDown) return;
      this.isPointerDown = false;
      vp.releasePointerCapture(e.pointerId);

      const threshold =
        (parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            '--item-w'
          )
        ) || 260) * 0.22;
      if (this.dragDelta > threshold) {
        // swipe right => previous
        const idx =
          (this.currentPresetIndex - 1 + this.presets.length) %
          this.presets.length;
        this.switchToPreset(idx);
      } else if (this.dragDelta < -threshold) {
        // swipe left => next
        const idx = (this.currentPresetIndex + 1) % this.presets.length;
        this.switchToPreset(idx);
      } else {
        // snap back
        this.updateTrackPosition(false);
      }
      this.dragDelta = 0;
    });

    // cancel (pointerleave)
    vp.addEventListener('pointercancel', () => {
      if (!this.isPointerDown) return;
      this.isPointerDown = false;
      this.dragDelta = 0;
      this.updateTrackPosition(false);
    });
  }

  // ---------- Resize ----------
  handleResize() {
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.material.uniforms.uResolution.value.set(
      this.sizes.width,
      this.sizes.height
    );

    // recalc full-screen plane
    const distance = this.camera.position.z;
    const vFov = (this.camera.fov * Math.PI) / 180;
    const planeHeight = 2 * Math.tan(vFov / 2) * distance;
    const planeWidth = planeHeight * this.camera.aspect;
    this.geometry.dispose();
    this.geometry = new THREE.PlaneGeometry(planeWidth, planeHeight, 32, 32);
    this.mesh.geometry = this.geometry;

    // reposition track after layout changes
    this.updateTrackPosition(true);
  }

  // ---------- animation loop ----------
  animate() {
    const elapsed = this.clock.getElapsedTime();
    this.material.uniforms.uTime.value = elapsed;

    if (this.transition) {
      const now = elapsed;
      const elapsedTransition = now - this.transition.startedAt;
      let t = Math.min(1.0, elapsedTransition / this.transition.duration);
      const eased = this.easeOutCubic(t);

      Object.keys(this.transition.start).forEach((k) => {
        const s = this.transition.start[k];
        const e = this.transition.end[k];
        if (s instanceof THREE.Vector3 && e instanceof THREE.Vector3) {
          const lerped = new THREE.Vector3().lerpVectors(s, e, eased);
          this.material.uniforms[k].value.copy(lerped);
        } else {
          const lerped = s + (e - s) * eased;
          this.material.uniforms[k].value = lerped;
        }
      });

      if (t >= 1.0) this.transition = null;
    }

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(() => this.animate());
  }

  startAnimationLoop() {
    this.animate();
  }
}

// initialize
const shaderRenderer = new ShaderRenderer();
export default shaderRenderer;
