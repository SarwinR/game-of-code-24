import * as THREE from 'three';

// Create the scene
const scene = new THREE.Scene();

// Create a camera, which determines what we'll see when we render the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

// Create a renderer and attach it to our document
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a geometry and a material then combine these into a mesh
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

cube.position.set(0, 0, 5);
// Add the cube to the scene
scene.add(cube);

// Create a plane geometry for the ground
const groundGeometry = new THREE.PlaneGeometry(100, 100);

// Create a basic material for the ground
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

// Combine the geometry and material into a mesh
const ground = new THREE.Mesh(groundGeometry, groundMaterial);

// Rotate the ground to be horizontal and move it down a bit
ground.rotation.x = - Math.PI / 2;
ground.position.y = -1;

// Add the ground to the scene
scene.add(ground);

// Handle keyboard input
function handleKeyDown(event) {
  const key = event.key;

  switch (key) {
    case 'a':
      cube.position.x -= 0.1; // Move the cube to the left
      break;
    case 'd':
      cube.position.x += 0.1; // Move the cube to the right
      break;
    case 'w':
      cube.position.z -= 0.1; // Move the cube forward
      break;
    case 's':
      cube.position.z += 0.1; // Move the cube backward
      break;
  }
}

// Listen for keyboard events
window.addEventListener('keydown', handleKeyDown);

// Create a loop that will cause the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second)
function animate() {
  requestAnimationFrame(animate);

  // Rotate the cube for some basic animation
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

  // Render the scene from the perspective of the camera
  renderer.render(scene, camera);
}

// Run the animation loop
animate();