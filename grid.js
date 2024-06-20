// grid.js
const TILE_SIZE = 50; // Size of each grid tile

const grid = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function canMove(x, y) {
  const gridX = Math.floor(x / TILE_SIZE);
  const gridY = Math.floor(y / TILE_SIZE);
  return grid[gridY] && grid[gridY][gridX] === 1;
}

document.addEventListener("DOMContentLoaded", () => {
  const gridOverlay = document.getElementById("grid-overlay");
  const leftPanel = document.getElementById("left-panel");

  function createGrid() {
    const leftPanelWidth = leftPanel.clientWidth;
    const leftPanelHeight = leftPanel.clientHeight;
    const numCols = Math.ceil(leftPanelWidth / TILE_SIZE);
    const numRows = Math.ceil(leftPanelHeight / TILE_SIZE);

    gridOverlay.style.width = `${leftPanelWidth}px`;
    gridOverlay.style.height = `${leftPanelHeight}px`;
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
        if (grid[y] && grid[y][x] === 0) {
          tile.classList.add("blocked");
        }
        gridOverlay.appendChild(tile);
      }
    }
  }

  createGrid();

  // Recreate the grid when the window is resized
  window.addEventListener("resize", createGrid);
});
