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
const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x9B7653 });

// Combine the geometry and material into a mesh
const ground = new THREE.Mesh(groundGeometry, groundMaterial);

// Rotate the ground to be horizontal and move it down a bit
ground.rotation.x = - Math.PI / 2;
ground.position.y = -1;

// Add the ground to the scene
scene.add(ground);



// Create a secondary scene
const portalScene = new THREE.Scene();

// Create a secondary camera
const portalCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
portalCamera.position.z = 5;

// Create a cube in the secondary scene
const portalCube = new THREE.Mesh(geometry, material);
portalScene.add(portalCube);

// Create a render target to render the secondary scene to
const renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

// Create a geometry for the portal
const portalGeometry = new THREE.BoxGeometry(2, 2, 0.1);

// Create a portal in the main scene using the render target as a texture
const portalMaterial = new THREE.MeshBasicMaterial({ map: renderTarget.texture });
const portal = new THREE.Mesh(portalGeometry, portalMaterial);

// Set the position of the portal
portal.position.set(0, 2, 0);

// Add the portal to the scene
scene.add(portal);

// In the animation loop, render the secondary scene to the render target
function animate() {
  requestAnimationFrame(animate);

  // Render the secondary scene to the render target
  renderer.setRenderTarget(renderTarget);
  renderer.render(portalScene, portalCamera);
  renderer.setRenderTarget(null);

  // Render the main scene as usual
  renderer.render(scene, camera);
}

// Run the animation loop
animate();



// // Handle keyboard input
// function handleKeyDown(event) {
//   const key = event.key;

//   switch (key) {
//     case 'a':
//       cube.position.x -= 0.1; // Move the cube to the left
//       break;
//     case 'd':
//       cube.position.x += 0.1; // Move the cube to the right
//       break;
//     case 'w':
//       cube.position.z -= 0.1; // Move the cube forward
//       break;
//     case 's':
//       cube.position.z += 0.1; // Move the cube backward
//       break;
//   }
// }

// Listen for keyboard events
// window.addEventListener('keydown', handleKeyDown);

// Create a loop that will cause the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second)