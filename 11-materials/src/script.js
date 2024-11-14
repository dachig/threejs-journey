import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

const gui = new GUI();
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();
const matCapTexture = textureLoader.load("/textures/matcaps/6.png");
matCapTexture.colorSpace = THREE.SRGBColorSpace;
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
gradientTexture.colorSpace = THREE.SRGBColorSpace;

const colorTexture = textureLoader.load("/textures/door/color.jpg"); // Creating the specific texture with the image source
colorTexture.colorSpace = THREE.SRGBColorSpace; // This is new syntax to ensure the correct RGB is rendered correctly
const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
alphaTexture.colorSpace = THREE.SRGBColorSpace;
const heightTexture = textureLoader.load("/textures/door/height.jpg");
heightTexture.colorSpace = THREE.SRGBColorSpace;
const ambientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace;
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
normalTexture.colorSpace = THREE.SRGBColorSpace;
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// MeshBasicMaterial
// const material = new THREE.MeshBasicMaterial();
// material.map = colorTexture;
// material.color = new THREE.Color("green");
// material.transparent = true;
// material.opacity = 0.3;
// material.side = THREE.DoubleSide;

// MeshNormalMaterial
// const material = new THREE.MeshNormalMaterial();

// MeshMatMaterial
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matCapTexture;

// MeshDepthMaterial
// const material = new THREE.MeshDepthMaterial();

// MeshLambertMaterial // This one uses lighting. See below for light
// const material = new THREE.MeshLambertMaterial();

// MeshPhongMaterial // Same as above, but better?
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x8888ff);

// MeshToonMaterial
// const material = new THREE.MeshToonMaterial();
// gradientTexture.magFilter = THREE.NearestFilter; // This one gives it the minecraft look, when it magnifies the pixel instead of letting the mipmapping stretch the pixels out
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// MeshStandardMaterial // Standard and most reliable way to create realistic scenes
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1;
// material.roughness = 1;
// material.map = colorTexture;
// material.aoMap = ambientOcclusionTexture; // Forced shadows in crevasces
// material.aoMapIntensity = 1; // Intensity of these shadows; default = 1
// material.displacementMap = heightTexture; // Gives height to the mesh, aka details
// material.displacementScale = 0.1; // Intensity of said height
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.normalMap = normalTexture; // Gives awesome detail even though you might have low vertexes
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = alphaTexture;

// MeshPhysicalMaterial // Heaviest performing material, so be careful
const material = new THREE.MeshPhysicalMaterial();
material.metalness = 0;
material.roughness = 0;
// material.map = colorTexture;
// material.aoMap = ambientOcclusionTexture; // Forced shadows in crevasces
// material.aoMapIntensity = 1; // Intensity of these shadows; default = 1
// material.displacementMap = heightTexture; // Gives height to the mesh, aka details
// material.displacementScale = 0.1; // Intensity of said height
// material.metalnessMap = metalnessTexture;
// material.roughnessMap = roughnessTexture;
// material.normalMap = normalTexture; // Gives awesome detail even though you might have low vertexes
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = alphaTexture;
// Clearcoat
material.clearcoat = 1; // coats the mesh with a thin layer of epoxy-like layer
material.clearcoatRoughness = 0;
gui.add(material, "clearcoat").min(0).max(1).step(0.00001);
gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.00001);
// Sheen
material.sheen = 1; // gives it a fabric and fuzzy-like glow when seeing sharp angles on the mesh
material.sheenRoughness = 0.25;
material.sheenColor.set(1, 1, 1);
gui.add(material, "sheen").min(0).max(1).step(0.00001);
gui.add(material, "sheenRoughness").min(0).max(1).step(0.00001);
gui.addColor(material, "sheenColor");
// Iridescence
material.iridescence = 1; // Less important feature, adds a sort of soapy rainbow-like effect
material.iridescenceIOR = 1;
material.iridescenceThicknessRange = [100, 800];
gui.add(material, "iridescence").min(0).max(1).step(0.00001);
gui.add(material, "iridescenceIOR").min(0).max(2.333).step(0.00001); // More than 2.333 is UNREALISTIC
// Transmission // Wikipedia list of refractive indices !!!
material.transmission = 1; // Makes mesh translucent
material.ior = 1.5; // gives the mesh a glow and zooms the background in like a magnifying glass
material.thickness = 0.5; // magnifies the background even more
gui.add(material, "transmission").min(0).max(1).step(0.00001);
gui.add(material, "ior").min(1).max(10).step(0.00001);
gui.add(material, "thickness").min(0).max(1).step(0.00001);

gui.add(material, "metalness").min(0).max(1).step(0.00001);
gui.add(material, "roughness").min(0).max(1).step(0.00001);
gui.add(material, "wireframe");

// Mesh Group // Adding multiple meshes to a scene as a group
const group = new THREE.Group();
scene.add(group);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(), material);
sphere.position.set(-2, 0, 0);

group.add(sphere);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
plane.position.set(0, 0, 0);
group.add(plane);

const torus = new THREE.Mesh(new THREE.TorusGeometry(), material);
torus.position.set(3, 0, 0);
group.add(torus);

// Lights
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff, 30);
// scene.add(pointLight);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;

// Environment Map
const rgbeLoader = new RGBELoader();
rgbeLoader.load("/textures/environmentMap/2k.hdr", (e) => {
  e.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = e;
  scene.environment = e;
});

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
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  sphere.rotation.x = 0.1 * elapsedTime;
  sphere.rotation.y = 0.15 * elapsedTime;
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
