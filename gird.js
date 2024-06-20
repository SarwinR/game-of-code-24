document.addEventListener("DOMContentLoaded", () => {
    const gridOverlay = document.getElementById("grid-overlay");

    // Define the grid with 0s and 1s
    const grid = [
      [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
      [1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
      [1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
      [1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0, 1, 1]
    ];

    // Create grid cells based on the grid array
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("grid-cell");
        cellDiv.classList.add(cell === 1 ? "passable" : "blocked");
        cellDiv.dataset.row = rowIndex;
        cellDiv.dataset.col = colIndex;
        gridOverlay.appendChild(cellDiv);
      });
    });

    // Add click event listener to toggle cell state
    gridOverlay.addEventListener("click", (event) => {
      const target = event.target;
      if (target.classList.contains("grid-cell")) {
        const row = target.dataset.row;
        const col = target.dataset.col;
        if (grid[row][col] === 1) {
          grid[row][col] = 0;
          target.classList.remove("passable");
          target.classList.add("blocked");
        } else {
          grid[row][col] = 1;
          target.classList.remove("blocked");
          target.classList.add("passable");
        }
      }
    });
  });