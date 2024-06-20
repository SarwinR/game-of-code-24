// grid.js
let TILE_SIZE; // Size of each grid tile will be dynamically calculated

const grid = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1, 1, 0],
  [0, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

let player_position = { x: 1, y: 1 };

function canMove(x, y) {
  return grid[y][x] == 1;
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

    gridOverlay.style.width = `${leftPanelWidth}px`;
    gridOverlay.style.height = `${leftPanelHeight}px`;
    gridOverlay.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
    gridOverlay.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;

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
        }
        gridOverlay.appendChild(tile);
      }
    }

    setupPlayer();
  }

  createGrid();

  // Recreate the grid when the window is resized
  window.addEventListener("resize", createGrid);
});

const player = document.getElementById("character");

function setupPlayer() {
  const player = document.getElementById("character");
  // set plater size
  player.style.width = `${TILE_SIZE}px`;
  player.style.height = `${TILE_SIZE}px`;

  // set player position
  player.style.left = `${player_position.x * TILE_SIZE}px`;
  player.style.top = `${player_position.y * TILE_SIZE}px`;
}
function movePlayer(direction) {
  const player = document.getElementById("character");
  const left = parseInt(player.style.left, 10);
  const top = parseInt(player.style.top, 10);

  // get future position
  let x = player_position.x;
  let y = player_position.y;

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
    player_position = { x, y };
    player.style.left = `${x * TILE_SIZE}px`;
    player.style.top = `${y * TILE_SIZE}px`;
  } else {
    console.log("You can't move there!");
  }
}

window.canMove = canMove; // Make canMove function accessible globally
