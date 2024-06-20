let TILE_SIZE;

let currentLevel = 0;

let startingPosition = { x: 1, y: 1 };
let endingPosition = { x: 5, y: 4 };
const grid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

grid[endingPosition.y][endingPosition.x] = 2;

let current_player_position = { x: 1, y: 1 };

function gameOver() {
  displayMessage("system", "Game Over!");
  setupPlayer();
}

function gameWin() {
  displayMessage("system", "Congratulations! You have completed the level!");
  if (currentLevel < 1) {
    loadLevel("./levels/javascript_lesson/config.json", currentLevel);
    disableChat();
    setupPlayer();
    displayMessage("system", "oh no! You Completed it. WHATEVER you do, never press F12. It will ruin everything. Do not run the command enableChat()");
  }
  else
  {
    displayMessage("system", "You have completed all levels!");
  }
}

const playerImages = {
  front: "levels\\javascript_lesson\\assets\\images\\human_robot\\front.png",
  left: "levels\\javascript_lesson\\assets\\images\\human_robot\\left.png",
  right: "levels\\javascript_lesson\\assets\\images\\human_robot\\right.png",
  back: "levels\\javascript_lesson\\assets\\images\\human_robot\\back.png",
};

var player = document.getElementById("character");

function canMove(x, y) {
  return grid[y][x] === 1 || grid[y][x] === 2 ? true : false;
}

document.addEventListener("DOMContentLoaded", () => {
  const gridOverlay = document.getElementById("grid-overlay");
  const leftPanel = document.getElementById("left-panel");

  function createGrid() {
    const leftPanelWidth = leftPanel.clientWidth;
    const leftPanelHeight = leftPanel.clientHeight;

    const numCols = grid[0].length;
    const numRows = grid.length;

    TILE_SIZE = Math.min(leftPanelWidth / numCols, leftPanelHeight / numRows);

    gridOverlay.style.width = `${numCols * TILE_SIZE}px`;
    gridOverlay.style.height = `${numRows * TILE_SIZE}px`;
    gridOverlay.style.gridTemplateColumns = `repeat(${numCols}, ${TILE_SIZE}px)`;
    gridOverlay.style.gridTemplateRows = `repeat(${numRows}, ${TILE_SIZE}px)`;

    // Clear any existing grid tiles
    while (gridOverlay.firstChild) {
      gridOverlay.removeChild(gridOverlay.firstChild);
    }

    for (let y = 0; y < numRows; y++) {
      for (let x = 0; x < numCols; x++) {
        const tile = document.createElement("div");

        tile.classList.add("grid-tile");
        if (grid[y][x] === 1) {
          tile.classList.add("blocked");
        } else if (grid[y][x] === 2) {
          tile.classList.add("end");
        }
        tile.style.width = `${TILE_SIZE}px`;
        tile.style.height = `${TILE_SIZE}px`;
        gridOverlay.appendChild(tile);
      }
    }

    setupPlayer();
  }

  createGrid();

  window.addEventListener("resize", createGrid);
});

function setupPlayer() {
  const playerSize = TILE_SIZE * 0.6;

  // set player size
  player.style.width = `${playerSize}px`;
  player.style.height = `${playerSize}px`;

  current_player_position = startingPosition;

  // set player position
  const offsetX = (TILE_SIZE - playerSize) / 2;
  const offsetY = (TILE_SIZE - playerSize) / 2;

  player.style.left = `${current_player_position.x * TILE_SIZE + offsetX}px`;
  player.style.top = `${current_player_position.y * TILE_SIZE + offsetY}px`;
}

function movePlayer(direction) {
  // get future position
  let x = current_player_position.x;
  let y = current_player_position.y;
  let playerImage = '';

  switch (direction) {
    case "left":
      x -= 1;
      playerImage = playerImages.left;
      break;
    case "right":
      x += 1;
      playerImage = playerImages.right;
      break;
    case "up":
      y -= 1;
      playerImage = playerImages.back;
      break;
    case "down":
      y += 1;
      playerImage = playerImages.front;
      break;
  }

  if (canMove(x, y)) {
    current_player_position = { x, y };

    const playerSize = TILE_SIZE * 0.6;
    const offsetX = (TILE_SIZE - playerSize) / 2;
    const offsetY = (TILE_SIZE - playerSize) / 2;

    player.style.left = `${x * TILE_SIZE + offsetX}px`;
    player.style.top = `${y * TILE_SIZE + offsetY}px`;

    if (player) {
      player.src = playerImage;
    }

    if (x === endingPosition.x && y === endingPosition.y) {
      currentLevel++;
      gameWin();
      return "win";
    }
  } else {
    gameOver();
    return "gameover";
  }
}

window.movePlayer = movePlayer; // Make movePlayer function accessible globally
window.canMove = canMove; // Make canMove function accessible globally
