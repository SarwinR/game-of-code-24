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

document.addEventListener("keypress", (event) => {
  if (event.key === "m") {
    isMoving = !isMoving;
    if (!isMoving) {
      console.log("Character stopped moving.");
      speechBubble.textContent = "Character stopped moving.";
    } else {
      speechBubble.textContent = "I am the evil character!";
      moveCharacter();
    }
  }
});

function showFloatingMessage() {
  speechBubble.classList.remove("hidden");
  setTimeout(() => {
    speechBubble.classList.add("hidden");
  }, 10000);
}

moveCharacter();
