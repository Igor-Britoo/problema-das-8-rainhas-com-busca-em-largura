class ChessBoard {
  constructor() {
    this.matrix = this.initializeBoard();
  }

  initializeBoard() {
    let matrix = [];
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) {
        row.push('_');
      }
      matrix.push(row);
    }
    return matrix;
  }

  printBoard() {
    for (let row of this.matrix) {
      console.log(row.join(' '));
    }
  }

  markAttackedPositions(row, column) {
    // Mark horizontally and vertically
    for (let i = 0; i < 8; i++) {
      this.matrix[row][i] = 'X';
      this.matrix[i][column] = 'X';
    }

    // Mark diagonally (up-right direction)
    for (let i = row - 1, j = column + 1; i >= 0 && j < 8; i--, j++) {
      this.matrix[i][j] = 'X';
    }

    // Mark diagonally (down-right direction)
    for (let i = row + 1, j = column + 1; i < 8 && j < 8; i++, j++) {
      this.matrix[i][j] = 'X';
    }

    // Mark diagonally (up-left direction)
    for (let i = row - 1, j = column - 1; i >= 0 && j >= 0; i--, j--) {
      this.matrix[i][j] = 'X';
    }

    // Mark diagonally (down-left direction)
    for (let i = row + 1, j = column - 1; i < 8 && j >= 0; i++, j--) {
      this.matrix[i][j] = 'X';
    }
  }

  isPositionAvailable(row, column) {
    if (this.matrix[row][column] === 'X' || this.matrix[row][column] === 'Q') {
      return false;
    }
    return true;
  }

  insertQueen(row, column) {
    if (
      column >= 0 &&
      column <= 7 &&
      row >= 0 &&
      row <= 7 &&
      this.isPositionAvailable(row, column)
    ) {
      this.markAttackedPositions(row, column);
      this.matrix[row][column] = 'Q';
    } else {
      console.log('Invalid position');
    }
  }

  getAvailablePositionsAtRow(rowNumber) {
    let availablePositions = [];
    for (let i = 0; i < 8; i++) {
      if (this.isPositionAvailable(rowNumber, i)) {
        availablePositions.push(i);
      }
    }
    return availablePositions;
  }

  insertQueenByRowPositionList(rowPositionList){
    let columnPosition = 0
    for (let rowPosition of rowPositionList) {
      this.insertQueen(columnPosition, rowPosition)
      columnPosition += 1
    }
  }
}

// Define BFS function to solve the 8 queens problem
function bfs() {
  let queue = [[]]; // Start with an empty state (root node)
  let solutions = [];
  let nodesCreatedCount = 1; // Start with 1 node (root)
  let nodesVisitedCount = 0; // Start with 0 because did not visit the root yet

  while (queue.length > 0) {
    let currentState = queue.shift(); // Take the first state from the queue
    let currentRow = currentState.length;
    nodesVisitedCount++;
    
    console.log("Exploring state:", currentState); // Log the state being explored
    
    if (currentRow === 8) {
      // If we've placed 8 queens, it's a solution
      solutions.push(currentState);
      continue;
      //break;
    }
    
    // Get available positions for the current state and row
    let board = new ChessBoard();
    board.insertQueenByRowPositionList(currentState);
    let availablePositions = board.getAvailablePositionsAtRow(currentRow);
    
    board.printBoard()
    console.log()

    // For each available position, add it to the current state and enqueue
    for (let position of availablePositions) {
      let newState = currentState.slice(); // Copy the current state
      newState.push(position); // Add the new queen position
      queue.push(newState); // Enqueue the new state
      nodesCreatedCount++
    }
  }

  return {solutions, nodesCreatedCount, nodesVisitedCount};
}

// Call BFS function and print solutions
let { solutions, nodesCreatedCount, nodesVisitedCount } = bfs();

console.log("Number of solutions: " + solutions.length);
console.log("Number of nodes created: " + nodesCreatedCount);
console.log("Number of nodes visited: " + nodesVisitedCount + '\n');

for (let solution of solutions) {
  let board = new ChessBoard();
  board.insertQueenByRowPositionList(solution);
  
  console.log("Exploring solution:", solution)
  board.printBoard();
  console.log();
}