import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

// Debug UI
const gui = new GUI({
  width: 350,
  title: "Awesome Debug UI",
  closeFolders: false,
});
// gui.hide(); // Hides the Debug UI
window.addEventListener("keydown", (event) => {
  if (event.key == "h" || event.key == "H") {
    gui.show(gui._hidden); // Open GUI and closes it if it's already open
  }
});

const debugObject = {}; // First step to creating debug GUI tweaks
const cubeTweaks = gui.addFolder("My Cube"); // Adds folder to organise all tweaks for said folder.
//Make sure to call cubeTweaks.add instead of gui.add

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

debugObject.color = "#9c63ca"; // Second step
debugObject.subdivisions = 2;

const geometry = new THREE.BoxGeometry(
  1,
  1,
  1,
  debugObject.subdivisions,
  debugObject.subdivisions,
  debugObject.subdivisions
);
const material = new THREE.MeshBasicMaterial({
  color: debugObject.color,
  wireframe: true,
}); // Third step, set color to the debugObject
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

cubeTweaks.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");
cubeTweaks.add(mesh, "visible");
cubeTweaks.add(mesh.material, "wireframe");
cubeTweaks.addColor(debugObject, "color").onChange(() => {
  // Step 4
  // Specific addColor syntax
  material.color.set(debugObject.color);
});

debugObject.spin = () => {
  // This is the function to create an onClick animation in the GUI with gsap
  gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2 });
};

cubeTweaks.add(debugObject, "spin");

cubeTweaks // This is the function to create a subdivision changer
  .add(debugObject, "subdivisions")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(() => {
    mesh.geometry.dispose(); // destroys old mesh from GPU for enhanced performance
    mesh.geometry = new THREE.BoxGeometry(
      1,
      1,
      1,
      debugObject.subdivisions,
      debugObject.subdivisions,
      debugObject.subdivisions
    );
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
