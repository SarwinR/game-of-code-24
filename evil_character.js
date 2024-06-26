const evilContainer = document.getElementById("evil_container");
const evilCharacter = document.getElementById("evil_character");
const speechBubble = document.getElementById("speech_bubble");
let isMoving = true;

function getRandomPosition() {
  const x = Math.floor(Math.random() * (window.innerWidth - 50));
  const y = Math.floor(Math.random() * (window.innerHeight - 50));
  return { x, y };
}

function moveCharacter() {
  if (!isMoving) return;

  const { x, y } = getRandomPosition();
  evilContainer.style.transform = `translate(${x}px, ${y}px)`;

  const randomTimeout = Math.random() * 5000 + 1000; // Move every 1 to 6 seconds
  setTimeout(moveCharacter, randomTimeout);
}

function showFloatingMessage(message) {
  speechBubble.textContent = message;
}

moveCharacter();