class Automata {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.fillWithData(this.make2DArray(rows, cols));
    this.nextGrid = this.make2DArray(rows, cols);
  }
  fillWithData(grid) {
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[0].length; j++) {
        grid[i][j] = Math.floor(Math.random() * Math.floor(2));
      }
    }
    return grid;
  }
  make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
      arr[i] = new Array(rows);
    }
    return arr;
  }
  next() {
    const { grid, nextGrid } = this.computeNextState(this);
    this.grid = grid;
    this.nextGrid = nextGrid;
    return { grid, nextGrid };
  }
  computeNextState(state) {
    //  0 -> 3 live -> 1
    // 1 -> < 2 live || > 3 live -> 0
    const { grid, nextGrid } = state;
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid[0].length; j++) {
        let neighbors = this.computeNeighbors(grid, i, j);
        if (neighbors === 3 && grid[i][j] === 0) {
          nextGrid[i][j] = 1;
        } else if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
          nextGrid[i][j] = 0;
        } else {
          nextGrid[i][j] = grid[i][j];
        }
      }
    }
    return { grid: nextGrid, nextGrid: grid };
  }
  computeNeighbors(grid, x, y) {
    let sum = 0;
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        sum +=
          grid[(x + i + grid.length) % grid.length][
            (y + j + grid[0].length) % grid[0].length
          ];
      }
    }
    sum -= grid[x][y];
    return sum;
  }
}

export default Automata;
