document.addEventListener('DOMContentLoaded', function () {
    const gridSize = 9;
    const solveButton = document.getElementById("solve-btn");
    solveButton.addEventListener('click', solveSudoku);

    const sudokuGrid = document.getElementById("sudoku-grid");
    
    // Create the Sudoku grid by adding rows and cells to the table.
    for (let row = 0; row < gridSize; row++) {
        const newRow = document.createElement("tr");
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className = "cell";
            input.id = `cell-${row}-${col}`;
            cell.appendChild(input);
            newRow.appendChild(cell);
        }
        sudokuGrid.appendChild(newRow);
    }
});

// This asynchronous function is called when the "Solve" button is clicked.
async function solveSudoku() {
    const gridSize = 9;
    const sudokuArray = [];

    // Populate the sudokuArray with the values entered in the Sudoku grid.
    for (let row = 0; row < gridSize; row++) {
        sudokuArray[row] = [];
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cellValue = document.getElementById(cellId).value;
            sudokuArray[row][col] = cellValue !== "" ? parseInt(cellValue) : 0;
        }
    }

    // Add a "user-input" class to cells with initial user input values.
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);

            if (sudokuArray[row][col] !== 0) {
                cell.classList.add("user-input");
            }
        }
    }

    // Call the solveSudokuHelper function to solve the Sudoku puzzle.
    if (solveSudokuHelper(sudokuArray)) {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cellId = `cell-${row}-${col}`;
                const cell = document.getElementById(cellId);

                
                if (!cell.classList.contains("user-input")) {
                    cell.value = sudokuArray[row][col];
                    cell.classList.add("solved");
                    await sleep(20); 
                }
            }
        }
    } else {
        alert("No solution exists for the given Sudoku puzzle.");
    }
}

// This recursive function is used to solve the Sudoku puzzle.
function solveSudokuHelper(board) {
    const gridSize = 9;

    // Loop through each cell in the Sudoku grid.
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValidMove(board, row, col, num)) {
                        board[row][col] = num;

                        
                        if (solveSudokuHelper(board)) {
                            return true; 
                        }

                        board[row][col] = 0; 
                    }
                }
                return false; 
            }
        }
    }

    return true; 
}

// This function checks if a number can be placed in a cell without violating Sudoku rules.
function isValidMove(board, row, col, num) {
    const gridSize = 9;

    // Check if the number already exists in the same row or column
    for (let i = 0; i < gridSize; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false; 
        }
    }

    
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

     // Check if the number already exists in the 3x3 subgrid
    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) {
                return false; 
            }
        }
    }

    return true; 
}

// This function introduces a delay in milliseconds.
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}