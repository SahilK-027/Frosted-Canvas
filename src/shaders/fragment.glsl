// uniforms
uniform float uTime;
uniform vec2 uResolution;
uniform float uNoiseScale;
uniform float uNoiseStrength;
uniform float uAnimationSpeed;
uniform float uGrainIntensity;
uniform float uVignetteStrength;
uniform vec3 uPaletteA;
uniform vec3 uPaletteB;
uniform vec3 uPaletteC;
uniform vec3 uPaletteD;

// Varying
varying vec2 vUv;

//
// Simplex Noise
//
// Description : Array and textureless GLSL 2D simplex noise function.
//      Author : Ian McEwan, Ashima Arts.
//  Maintainer : stegu
//     Lastmod : 20110822 (ijm)
//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.
//               Distributed under the MIT License. See LICENSE file.
//               https://github.com/ashima/webgl-noise
//               https://github.com/stegu/webgl-noise
//
vec3 mod289(vec3 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec2 mod289(vec2 x) {
    return x - floor(x * (1.0 / 289.0)) * 289.0;
}
vec3 permute(vec3 x) {
    return mod289(((x * 34.0) + 10.0) * x);
}
float snoise(vec2 v)
{
    const vec4 C = vec4(0.211324865405187,
            0.366025403784439,
            -0.577350269189626,
            0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

// Cosine-based palette function
//
// https://iquilezles.org/articles/palettes/
//
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}

void main()
{
    vec2 uv = vUv;

    // Responsive scale based on screen size
    float minDimension = min(uResolution.x, uResolution.y);
    float scale = max(0.5, minDimension / 1000.0) * uNoiseScale;

    // Animate the noise layers
    float timeScale = uTime * uAnimationSpeed;

    // Create flowing, organic gradient base
    float noise1 = snoise((uv + vec2(timeScale * 0.2, timeScale * 0.15)) * 2.0 * scale) * 0.5;
    float noise2 = snoise((uv + vec2(-timeScale * 0.18, timeScale * 0.22)) * 4.0 * scale) * 0.25;
    float noise3 = snoise((uv + vec2(timeScale * 0.25, -timeScale * 0.12)) * 8.0 * scale) * 0.125;

    // Combine noise layers for complex distortion
    float combinedNoise = noise1 + noise2 + noise3;

    // Create a static gradient input
    float t = uv.x * 0.5 + uv.y * 0.5 + combinedNoise * uNoiseStrength;

    // Use palette uniforms
    vec3 color = palette(t, uPaletteA, uPaletteB, uPaletteC, uPaletteD);

    // Add fine grain for frosted glass texture
    float grain = snoise(vUv * 1000.0 * scale + timeScale * 2.0) * uGrainIntensity;
    color += grain;

    // Add vignette for depth
    float vignette = 1.0 - length(uv - 0.5) * uVignetteStrength;
    color *= mix(0.8, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
}
