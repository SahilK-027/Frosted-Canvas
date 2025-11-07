# Using Frosted Canvas via CDN

If you don't want to use npm, you can use Frosted Canvas directly in the browser via CDN.

## Using unpkg

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

  <!-- Import Three.js -->
  <script type="importmap">
    {
      "imports": {
        "three": "https://unpkg.com/three@0.181.0/build/three.module.js",
        "three/": "https://unpkg.com/three@0.181.0/"
      }
    }
  </script>

  <!-- Import Frosted Canvas -->
  <script type="module">
    import FrostCanvas from 'https://unpkg.com/frosted-canvas/dist/frosted-canvas.es.js';
    
    new FrostCanvas('#background', {
      preset: 0
    });
  </script>
</body>
</html>
```

## Using jsDelivr

```html
<script type="module">
  import FrostCanvas from 'https://cdn.jsdelivr.net/npm/frosted-canvas/dist/frosted-canvas.es.js';
  
  new FrostCanvas('#background');
</script>
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Frosted Canvas CDN Example</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: system-ui, -apple-system, sans-serif;
    }

    .hero {
      width: 100%;
      height: 100vh;
      position: relative;
    }

    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: white;
      z-index: 10;
    }

    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    button {
      margin: 10px;
      padding: 10px 20px;
      border: 1px solid rgba(255,255,255,0.3);
      background: rgba(255,255,255,0.1);
      color: white;
      border-radius: 8px;
      cursor: pointer;
      backdrop-filter: blur(10px);
    }
  </style>
</head>
<body>
  <div class="hero" id="bg">
    <div class="content">
      <h1>Frosted Canvas</h1>
      <p>No build tools required</p>
      <div>
        <button onclick="frost.setPreset(0)">Sunset</button>
        <button onclick="frost.setPreset(1)">Ocean</button>
        <button onclick="frost.setPreset(2)">Forest</button>
      </div>
    </div>
  </div>

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
    
    window.frost = new FrostCanvas('#bg', {
      preset: 0,
      autoResize: true
    });
  </script>
</body>
</html>
```

Note: Make sure to replace the version numbers with the actual published version.
