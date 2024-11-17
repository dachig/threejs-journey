import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();
// FLOORTEXTURES
const floorAlphaTexture = textureLoader.load("/floor/alpha.jpg");
const floorARMTexture = textureLoader.load(
  "/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.jpg"
);
floorARMTexture.repeat.set(8, 8); // How many times i want the texture to apply on each axis
floorARMTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
floorARMTexture.wrapT = THREE.RepeatWrapping; // Enable this repetition
const floorColorTexture = textureLoader.load(
  "/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.jpg"
);
floorColorTexture.repeat.set(8, 8); // How many times i want the texture to apply on each axis
floorColorTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
floorColorTexture.wrapT = THREE.RepeatWrapping; // Enable this repetition
floorColorTexture.colorSpace = THREE.SRGBColorSpace;
const floorDisplacementTexture = textureLoader.load(
  "/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.jpg"
);
floorDisplacementTexture.repeat.set(8, 8); // How many times i want the texture to apply on each axis
floorDisplacementTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
floorDisplacementTexture.wrapT = THREE.RepeatWrapping; // Enable this repetition
const floorNormalTexture = textureLoader.load(
  "/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.jpg"
);
floorNormalTexture.repeat.set(8, 8); // How many times i want the texture to apply on each axis
floorNormalTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
floorNormalTexture.wrapT = THREE.RepeatWrapping; // Enable this repetition

//WALLTEXTURES
const wallColorTexture = textureLoader.load(
  "/wall/stone_brick_wall_001_1k/stone_brick_wall_001_diff_1k.jpg"
);
wallColorTexture.colorSpace = THREE.SRGBColorSpace;
wallColorTexture.repeat.set(2, 2); // How many times i want the texture to apply on each axis
wallColorTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
wallColorTexture.wrapT = THREE.RepeatWrapping; // Enable this repetition
const wallARMTexture = textureLoader.load(
  "/wall/stone_brick_wall_001_1k/stone_brick_wall_001_arm_1k.jpg"
);
wallARMTexture.repeat.set(2, 2); // How many times i want the texture to apply on each axis
wallARMTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
wallARMTexture.wrapT = THREE.RepeatWrapping; // Enable this repetition
const wallNormalTexture = textureLoader.load(
  "/wall/stone_brick_wall_001_1k/stone_brick_wall_001_nor_gl_1k.jpg"
);
wallNormalTexture.repeat.set(2, 2); // How many times i want the texture to apply on each axis
wallNormalTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
wallNormalTexture.wrapT = THREE.RepeatWrapping; // Enable this repetition

//ROOFTEXTURES
const roofColorTexture = textureLoader.load(
  "/roof/roof_07_1k/roof_07_diff_1k.jpg"
);
roofColorTexture.colorSpace = THREE.SRGBColorSpace;
roofColorTexture.repeat.set(3, 1); // How many times i want the texture to apply on each axis
roofColorTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
const roofARMTexture = textureLoader.load(
  "/roof/roof_07_1k/roof_07_arm_1k.jpg"
);
roofARMTexture.repeat.set(3, 1); // How many times i want the texture to apply on each axis
roofARMTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
const roofNormalTexture = textureLoader.load(
  "/roof/roof_07_1k/roof_07_nor_gl_1k.jpg"
);
roofNormalTexture.repeat.set(3, 1); // How many times i want the texture to apply on each axis
roofNormalTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition

//BUSHESTEXTURES
const bushColorTexture = textureLoader.load(
  "/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg"
);
bushColorTexture.colorSpace = THREE.SRGBColorSpace;
bushColorTexture.repeat.set(3, 1); // How many times i want the texture to apply on each axis
bushColorTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
const bushARMTexture = textureLoader.load(
  "/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg"
);
bushARMTexture.repeat.set(3, 1); // How many times i want the texture to apply on each axis
bushARMTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
const bushNormalTexture = textureLoader.load(
  "/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg"
);
bushNormalTexture.repeat.set(3, 1); // How many times i want the texture to apply on each axis
bushNormalTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition

//GRAVESTEXTURES
const graveColorTexture = textureLoader.load(
  // NO NEED FOOR WRAP(S/T) WHEN VALUES LOWER THAN 1
  "/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg"
);
graveColorTexture.colorSpace = THREE.SRGBColorSpace;
graveColorTexture.repeat.set(0.3, 0.4); // How many times i want the texture to apply on each axis
const graveARMTexture = textureLoader.load(
  // NO NEED FOOR WRAP(S/T) WHEN VALUES LOWER THAN 1
  "/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg"
);
graveARMTexture.repeat.set(0.3, 0.4); // How many times i want the texture to apply on each axis
const graveNormalTexture = textureLoader.load(
  // NO NEED FOOR WRAP(S/T) WHEN VALUES LOWER THAN 1
  "/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg"
);
graveNormalTexture.repeat.set(0.3, 0.4); // How many times i want the texture to apply on each axis

//DOORTEXTURES
const doorColorTexture = textureLoader.load("./door/color.jpg");
const doorAlphaTexture = textureLoader.load("./door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./door/height.jpg");
const doorNormalTexture = textureLoader.load("./door/normal.jpg");
const doorMetalnessTexture = textureLoader.load("./door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("./door/roughness.jpg");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;
/**
/**
 * House
 */

// House Container
const house = new THREE.Group();
scene.add(house);

// Walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    roughness: wallARMTexture,
    aoMap: wallARMTexture,
    aoMapIntensity: 4,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  })
);
walls.position.y = 1.25;
house.add(walls);
gui
  .add(walls.material, "displacementBias")
  .min(-1)
  .max(1)
  .step(0.001)
  .name("wallsDisplacement");

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
    roughness: 1,
  })
);
roof.position.y = 2.5 + 0.75;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// Door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 50, 50),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture,
    color: "grey",
  })
);
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

// Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: "#ccffcc",
  map: bushColorTexture,
  roughness: bushARMTexture,
  aoMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
  roughness: 1,
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(0.8, 0.2, 2.2);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.position.set(1.4, 0.1, 2.1);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.position.set(-0.8, 0.2, 2.2);
bush3.scale.set(0.5, 0.5, 0.5);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.set(-1, 0.05, 2.7);
bush4.scale.set(0.2, 0.2, 0.2);
bush4.rotation.x = -0.75;

house.add(bush1, bush2, bush3, bush4);

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  roughness: graveARMTexture,
  aoMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture,
  roughness: 1,
});

const graves = new THREE.Group();
scene.add(graves);

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 4 + Math.random() * 4;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(graveGeometry, graveMaterial);

  grave.position.x = x;
  grave.position.z = z;
  grave.position.y = Math.random() * 0.4;

  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;

  graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture, // increase plane vertices so displacement works
    displacementScale: 0.3,
    displacementBias: -0.2,
  })
);
gui
  .add(floor.material, "displacementBias")
  .min(-1)
  .max(1)
  .step(0.001)
  .name("floorDisplacement");
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);
/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275); // Ambient light is super nice to add realism to light bouncing effect. Otherwise it's too dark.
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 1);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Door light
const doorLight = new THREE.PointLight("#ff7d46", 5);
doorLight.position.set(0,2.2,2.2)
house.add(doorLight);

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
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 8;
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
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
