import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// Textures
const loadingManager = new THREE.LoadingManager(); // This way you can keep track of the loading states for multiple textures if you pass it as a parameter to said texture
// loadingManager.onStart = () => {
//   console.log("on Start");
// };
// loadingManager.onLoad = () => {
//   console.log("on Load ");
// };
// loadingManager.onProgress = () => {
//   console.log("on Progress");
// };
// loadingManager.onError = () => {
//   console.log("on Error");
// };
const textureLoader = new THREE.TextureLoader(loadingManager); // Create one loader to create multiples textures
//const colorTexture = textureLoader.load("/textures/door/color.jpg"); // Creating the specific texture with the image source
const colorTexture = textureLoader.load("/textures/minecraft.png"); // Creating the specific texture with the image source

colorTexture.colorSpace = THREE.SRGBColorSpace; // This is new syntax to ensure the correct RGB is rendered correctly
// const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
// alphaTexture.colorSpace = THREE.SRGBColorSpace;
// const heightTexture = textureLoader.load("/textures/door/height.jpg");
// heightTexture.colorSpace = THREE.SRGBColorSpace;
// const ambientOcclusionTexture = textureLoader.load(
//   "/textures/door/ambientOcclusion.jpg"
// );
// ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace;
// const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
// metalnessTexture.colorSpace = THREE.SRGBColorSpace;
// const normalTexture = textureLoader.load("/textures/door/normal.jpg");
// normalTexture.colorSpace = THREE.SRGBColorSpace;
// const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");
// roughnessTexture.colorSpace = THREE.SRGBColorSpace;

// Texture Transformations
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// colorTexture.offset.x = 0.25;

// colorTexture.rotation = Math.PI / 4;
// colorTexture.center.x = 0.5; // pivot point of the rotation from above
// colorTexture.center.y = 0.5; // is now centered

colorTexture.generateMipmaps = false; // When using minFilter and NearestFilter together, we can disable mipmapping. Improves GPU performance.
colorTexture.minFilter = THREE.NearestFilter; // minFilter blurs the image
colorTexture.magFilter = THREE.NearestFilter; // magFilter sharpens the image
// NearestFilter is best for performance. Handy for objects in the distance

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  map: colorTexture, // You map the texture on all sides of the mesh
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
