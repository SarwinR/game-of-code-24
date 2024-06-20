let TILE_SIZE; // Size of each grid tile will be dynamically calculated

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
  alert("Haha you fell down");
  setupPlayer();
}

function canMove(x, y) {
  return grid[y][x] === 1;
}

document.addEventListener("DOMContentLoaded", () => {
  const gridOverlay = document.getElementById("grid-overlay");
  const leftPanel = document.getElementById("left-panel");

  function createGrid() {
    const leftPanelWidth = leftPanel.clientWidth;
    const leftPanelHeight = leftPanel.clientHeight;

    const numCols = grid[0].length; // Number of columns based on grid data
    const numRows = grid.length; // Number of rows based on grid data

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

  // Recreate the grid when the window is resized
  window.addEventListener("resize", createGrid);
});

function setupPlayer() {
  const player = document.getElementById("character");
  // set player size
  player.style.width = `${TILE_SIZE}px`;
  player.style.height = `${TILE_SIZE}px`;

  current_player_position = startingPosition;

  // set player position
  player.style.left = `${current_player_position.x * TILE_SIZE}px`;
  player.style.top = `${current_player_position.y * TILE_SIZE}px`;
}

function movePlayer(direction) {
  const player = document.getElementById("character");

  // get future position
  let x = current_player_position.x;
  let y = current_player_position.y;

  switch (direction) {
    case "left":
      x -= 1;
      break;
    case "right":
      x += 1;
      break;
    case "up":
      y -= 1;
      break;
    case "down":
      y += 1;
      break;
  }

  if (canMove(x, y)) {
    current_player_position = { x, y };
    player.style.left = `${x * TILE_SIZE + 4}px`;
    player.style.top = `${y * TILE_SIZE + 4}px`;

    if (x === endingPosition.x && y === endingPosition.y) {
      alert("You won!");
      return "win";
    }
  } else {
    gameOver();
    return "gameover";
  }
}

window.movePlayer = movePlayer; // Make movePlayer function accessible globally
window.canMove = canMove; // Make canMove function accessible globally
