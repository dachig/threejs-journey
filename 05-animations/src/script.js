import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// CLOCK
const clock = new THREE.Clock();

// gsap
gsap.to(mesh.position, { x: 2, duration: 1, delay: 1 });
gsap.to(mesh.position, { x: 0, duration: 1, delay: 2 });


// Animations
const tick = () => {
  // CLOCK
  //const elapsedTime = clock.getElapsedTime();
  //console.log(elapsedTime);

  // Update Objects
  //mesh.position.x = Math.sin(elapsedTime); // This makes the cube go in a circle on the x-axis
  //mesh.position.y = Math.cos(elapsedTime); // This makes the cube go in a circle on the x-axis
  //camera.lookAt(mesh.position); // Looks at the cube position

  // Render
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
