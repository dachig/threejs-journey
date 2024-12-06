import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import { Sky } from "three/addons/objects/Sky.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const names = [
  "Sophia Johnson",
  "Liam Brown",
  "Olivia Davis",
  "Noah Wilson",
  "Emma Martinez",
  "Ava Taylor",
  "Isabella White",
  "Mason Harris",
  "Mia Lewis",
  "Lucas Clark",
  "Ethan Walker",
  "Charlotte Young",
  "James Hall",
  "Amelia Allen",
  "Alexander King",
  "Evelyn Scott",
  "Michael Green",
  "Abigail Adams",
  "Benjamin Baker",
  "Ella Nelson",
  "Dachi Giorgobiani",
  "Jackson Carter",
  "Scarlett Ramirez",
  "Logan Mitchell",
  "Harper Perez",
  "Sebastian Roberts",
  "Sofia Turner",
  "Daniel Phillips",
  "Aria Campbell",
  "Elijah Parker",
];

/**
 * Base
 */
// Debug
// const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Textures
const textureLoader = new THREE.TextureLoader();
// FLOORTEXTURES
const floorAlphaTexture = textureLoader.load("/floor/alpha.webp");
const floorARMTexture = textureLoader.load(
  "/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp"
);
floorARMTexture.repeat.set(8, 8); // How many times i want the texture to apply on each axis
floorARMTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
floorARMTexture.wrapT = THREE.RepeatWrapping; // Enable this repetition
const floorColorTexture = textureLoader.load(
  "/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp"
);
floorColorTexture.repeat.set(8, 8); // How many times i want the texture to apply on each axis
floorColorTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
floorColorTexture.wrapT = THREE.RepeatWrapping; // Enable this repetition
floorColorTexture.colorSpace = THREE.SRGBColorSpace;
const floorDisplacementTexture = textureLoader.load(
  "/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp"
);
floorDisplacementTexture.repeat.set(8, 8); // How many times i want the texture to apply on each axis
floorDisplacementTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
floorDisplacementTexture.wrapT = THREE.RepeatWrapping; // Enable this repetition
const floorNormalTexture = textureLoader.load(
  "/floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp"
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
  "/bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp"
);
bushColorTexture.colorSpace = THREE.SRGBColorSpace;
bushColorTexture.repeat.set(3, 1); // How many times i want the texture to apply on each axis
bushColorTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
const bushARMTexture = textureLoader.load(
  "/bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp"
);
bushARMTexture.repeat.set(3, 1); // How many times i want the texture to apply on each axis
bushARMTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition
const bushNormalTexture = textureLoader.load(
  "/bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp"
);
bushNormalTexture.repeat.set(3, 1); // How many times i want the texture to apply on each axis
bushNormalTexture.wrapS = THREE.RepeatWrapping; // Enable this repetition

//GRAVESTEXTURES
const graveColorTexture = textureLoader.load(
  // NO NEED FOOR WRAP(S/T) WHEN VALUES LOWER THAN 1
  "/grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp"
);
graveColorTexture.colorSpace = THREE.SRGBColorSpace;
graveColorTexture.repeat.set(0.3, 0.4); // How many times i want the texture to apply on each axis
const graveARMTexture = textureLoader.load(
  // NO NEED FOOR WRAP(S/T) WHEN VALUES LOWER THAN 1
  "/grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp"
);
graveARMTexture.repeat.set(0.3, 0.4); // How many times i want the texture to apply on each axis
const graveNormalTexture = textureLoader.load(
  // NO NEED FOOR WRAP(S/T) WHEN VALUES LOWER THAN 1
  "/grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp"
);
graveNormalTexture.repeat.set(0.3, 0.4); // How many times i want the texture to apply on each axis

//DOORTEXTURES
const doorColorTexture = textureLoader.load("./door/color.webp");
const doorAlphaTexture = textureLoader.load("./door/alpha.webp");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./door/ambientOcclusion.webp"
);
const doorHeightTexture = textureLoader.load("./door/height.webp");
const doorNormalTexture = textureLoader.load("./door/normal.webp");
const doorMetalnessTexture = textureLoader.load("./door/metalness.webp");
const doorRoughnessTexture = textureLoader.load("./door/roughness.webp");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

//FONTTEXTURE
const matCapFontTexture = textureLoader.load("/fonts/matcaps/2.png");
matCapFontTexture.colorSpace = THREE.SRGBColorSpace;

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
// gui
//   .add(walls.material, "displacementBias")
//   .min(-1)
//   .max(1)
//   .step(0.001)
//   .name("wallsDisplacement");

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

  const fontLoader = new FontLoader();
  fontLoader.load("/fonts/Melted Monster_Regular.json", (font) => {
    const textGeometry = new TextGeometry(names[i], {
      font: font,
      size: 0.05,
      depth: 0.02,
      curveSegments: 5,
    });
    const material = new THREE.MeshMatcapMaterial({
      matcap: matCapFontTexture,
    });
    const text = new THREE.Mesh(textGeometry, material);
    text.position.x = x;
    text.position.z = z + 0.1;
    text.position.y = grave.position.y;
    text.rotation.x = grave.rotation.x;
    text.rotation.y = grave.rotation.y;
    text.rotation.z = grave.rotation.z;
    textGeometry.center();
    scene.add(text);
  });

  graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(22, 22, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    opacity: 1,
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
// gui
//   .add(floor.material, "displacementBias")
//   .min(-1)
//   .max(1)
//   .step(0.001)
//   .name("floorDisplacement");
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
doorLight.position.set(0, 2.2, 2.2);
house.add(doorLight);

// Ghosts (Lights)
const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0000", 6);
scene.add(ghost1, ghost2, ghost3);

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
controls.minDistance = 5;
controls.maxDistance = 15;
controls.maxPolarAngle = Math.PI / 2.2;
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Cast and receive shadows
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
walls.receiveShadow = true;

roof.castShadow = true;

floor.receiveShadow = true;

for (const grave of graves.children) {
  grave.castShadow = true;
  grave.receiveShadow = true;
}

// Mapping the camera to fix light camera for the shadows
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

// Sky
const sky = new Sky();
sky.scale.set(100, 100, 100);
sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.038, -0.95);
scene.add(sky);

// Fog
scene.fog = new THREE.FogExp2("#02343F", 0.1);
/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  //Ghost animation

  const ghost1Angle = elapsedTime * 0.2;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y =
    Math.sin(ghost1Angle) *
    Math.sin(ghost1Angle * 2.34) *
    Math.sin(ghost1Angle * 3.45);
  const ghost2Angle = -elapsedTime * 0.35;
  ghost2.position.x = Math.cos(ghost2Angle) * 6;
  ghost2.position.z = Math.sin(ghost2Angle) * 6;
  ghost2.position.y =
    Math.sin(ghost2Angle) *
    Math.sin(ghost2Angle * 2.34) *
    Math.sin(ghost2Angle * 3.45);
  const ghost3Angle = elapsedTime * 0.3;
  ghost3.position.x = Math.cos(ghost3Angle) * 8;
  ghost3.position.z = Math.sin(ghost3Angle) * 8;
  ghost3.position.y =
    Math.sin(ghost3Angle) *
    Math.sin(ghost3Angle * 2.34) *
    Math.sin(ghost3Angle * 3.45);

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
