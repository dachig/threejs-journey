import * as THREE from "three";
import GUI from "lil-gui";

/**
 * Debug
 */
const gui = new GUI();

const parameters = {
  materialColor: "#ffeded",
};

gui.addColor(parameters, "materialColor").onChange(() => {
  material.color.set(parameters.materialColor);
});

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//TEXTURES
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
gradientTexture.magFilter = THREE.NearestFilter;

//OBJECTS
const objectsDistance = 4;
const material = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: gradientTexture,
});

const torus = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);
const cone = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
  material
);
scene.add(torus, cone, torusKnot);

torus.position.x = 2;
cone.position.x = -2;
torusKnot.position.x = 2;


torus.position.y = -objectsDistance * 0;
cone.position.y = -objectsDistance * 1;
torusKnot.position.y = -objectsDistance * 2;

const sectionMeshes = [torus, cone, torusKnot];

//LIGHT
const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

//PARTICLES
const count = 600;
const positions = new Float32Array(count);

for (let i = 0; i < count; i++) {
  const i3 = i * 3;
  positions[i3] = (Math.random() - 0.5) * 10;
  positions[i3 + 1] =
    objectsDistance * 0.5 -
    Math.random() * objectsDistance * sectionMeshes.length;
  positions[i3 + 2] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);
const particlesMaterial = new THREE.PointsMaterial({
  color: parameters.materialColor,
  sizeAttenuation: true,
  size: 0.03,
});
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

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
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;

//CAMERAGROUP
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
cameraGroup.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//SCROLL
let scrollY = window.scrollY;
window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});
//CURSOR
const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = event.clientY / sizes.height - 0.5;
});

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  camera.position.y = (-scrollY / sizes.height) * objectsDistance;

  const parallaxX = cursor.x;
  const parallaxY = -cursor.y;
  cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 0.05;
  cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 0.05;

  for (const mesh of sectionMeshes) {
    mesh.rotation.x = elapsedTime * 0.2;
    mesh.rotation.y = elapsedTime * 0.1;
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
