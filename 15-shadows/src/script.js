import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

// Textures Baked Shadow applied to the plane material
const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load("/textures/bakedShadow.jpg");
bakedShadow.colorSpace = THREE.SRGBColorSpace;
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg");
simpleShadow.colorSpace = THREE.SRGBColorSpace;

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0); //
gui.add(ambientLight, "intensity").min(0).max(3).step(0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0); //
directionalLight.position.set(2, 2, -1);
gui.add(directionalLight, "intensity").min(0).max(3).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
scene.add(directionalLight);

directionalLight.castShadow = true; // Enables the light to cast shadow on objects
directionalLight.shadow.mapSize.width = 1024; // Improves sharpness on shadow
directionalLight.shadow.mapSize.height = 1024; // Improves sharpness on shadow

directionalLight.shadow.camera.near = 1; // Way more optimized render for the camera
directionalLight.shadow.camera.far = 6;

directionalLight.shadow.camera.left = -2; // Amplitude is now reduced to have an even better render
directionalLight.shadow.camera.bottom = -2; // the scene the light camera now takes render of in shadow map
directionalLight.shadow.camera.top = 2; // is now very small and highly optimized
directionalLight.shadow.camera.right = 2;

directionalLight.shadow.radius = 10; // adjusts blur on the shadow // PCFSoftShadowMap blur doesnt work on this

const directionalLightCameraHelper = new THREE.CameraHelper( // Define camera helper to see exactly what's going on
  directionalLight.shadow.camera
);
scene.add(directionalLightCameraHelper); // Doing this we can see that a lot of useless space gets rendered in the camera
directionalLightCameraHelper.visible = false;

// Spot light
const spotLight = new THREE.SpotLight(0xffffff, 0, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.position.set(0, 2, 2);
scene.add(spotLight);
scene.add(spotLight.target);

spotLight.shadow.mapSize.width = 1024; // Improves sharpness on shadow
spotLight.shadow.mapSize.height = 1024; // Improves sharpness on shadow

spotLight.angle = Math.PI / 6; // Angle of the spotlight. fov doesnt work

spotLight.shadow.camera.near = 1; // Way more optimized render for the camera
spotLight.shadow.camera.far = 5;

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(spotLightCameraHelper);
spotLightCameraHelper.visible = false;

// Point light
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.castShadow = true;
pointLight.position.set(-1, 1, 0);
scene.add(pointLight);

pointLight.shadow.mapSize.width = 1024; // Improves sharpness on shadow
pointLight.shadow.mapSize.height = 1024; // Improves sharpness on shadow

pointLight.shadow.camera.near = 0.1; // Way more optimized render for the camera
spotLight.shadow.camera.far = 5;
pointLight;

// PointLight uses six renders and finishes on the last one facing downward as perspective camera
const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
scene.add(pointLightCameraHelper);
pointLightCameraHelper.visible = false;

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true; //
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  // new THREE.MeshBasicMaterial({ map: bakedShadow }) // Static baked material
  material
);
plane.receiveShadow = true; //

plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;

scene.add(sphere, plane);

const sphereShadow = new THREE.Mesh( // Place a new plane under with the shadow texture as a material on it.
  new THREE.PlaneGeometry(1.5, 1.5),
  new THREE.MeshBasicMaterial({
    color: 0x000000,
    alphaMap: simpleShadow,
    transparent: true,
  })
);
sphereShadow.rotation.x = -Math.PI * 0.5; // center the dynamic shadow under the sphere
sphereShadow.position.y = plane.position.y + 0.01; // z-fighting --> + 0.01

scene.add(sphereShadow);
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
camera.position.z = 2;
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

renderer.shadowMap.enabled = true; // Enables shadow rendering
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // sharper result, less performant
/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update the sphere and make it bounce in a circle
  sphere.position.x = Math.cos(elapsedTime);
  sphere.position.z = Math.sin(elapsedTime);
  sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

  // Update the shadow based on sphere movement
  sphereShadow.position.x = sphere.position.x;
  sphereShadow.position.z = sphere.position.z;
  sphereShadow.material.opacity = 1 - sphere.position.y;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
