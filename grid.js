document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("grid-overlay");
  const ctx = canvas.getContext("2d");
  const leftPanel = document.getElementById("left-panel");

  const grid = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  function drawGrid() {
    const panelWidth = leftPanel.clientWidth;
    const panelHeight = leftPanel.clientHeight;

    const rows = grid.length;
    const cols = grid[0].length;

    const tileWidth = panelWidth / cols;
    const tileHeight = panelHeight / rows;

    canvas.width = panelWidth;
    canvas.height = panelHeight;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.strokeRect(col * tileWidth, row * tileHeight, tileWidth, tileHeight);

        if (grid[row][col] === 0) {
          ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
          ctx.fillRect(col * tileWidth, row * tileHeight, tileWidth, tileHeight);
        }
      }
    }

    window.tileWidth = tileWidth;
    window.tileHeight = tileHeight;
  }

  function isMoveValid(x, y) {
    const col = Math.floor(x / window.tileWidth);
    const row = Math.floor(y / window.tileHeight);
    return grid[row] && grid[row][col] === 1;
  }

  drawGrid();
  window.addEventListener("resize", drawGrid);

  window.isMoveValid = isMoveValid; // Make the function accessible globally
});
