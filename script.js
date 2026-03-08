const rows = 6, cols = 7;
let board = [], currentPlayer = 'red', gameActive = true;

const boardElement = document.getElementById('board');
const turnElement = document.getElementById('turn');

function init() {
  boardElement.innerHTML = '';
  board = Array(rows).fill().map(() => Array(cols).fill(null));
  gameActive = true;
  currentPlayer = 'red';
  turnElement.innerText = "Player 1's Turn (Red)";
  
  // Board ke slots banana
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let cell = document.createElement('div');
      cell.className = 'cell';
      cell.id = `cell-${r}-${c}`;
      cell.onclick = () => dropPiece(c);
      boardElement.appendChild(cell);
    }
  }
}

function dropPiece(c) {
  if (!gameActive) return;
  // Piece ko neechay se upar drop karna
  for (let r = rows - 1; r >= 0; r--) {
    if (!board[r][c]) {
      board[r][c] = currentPlayer;
      document.getElementById(`cell-${r}-${c}`).classList.add(currentPlayer);
      
      if (checkWin(r, c)) {
        turnElement.innerText = `${currentPlayer.toUpperCase()} WINS! 🎉`;
        gameActive = false;
        return;
      }
      
      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      turnElement.innerText = `Player ${currentPlayer === 'red' ? '1 (Red)' : '2 (Yellow)'}'s Turn`;
      return;
    }
  }
}

function checkWin(r, c) {
  // Check horizontal, vertical, and diagonals
  const directions = [[0,1], [1,0], [1,1], [1,-1]];
  for (let [dr, dc] of directions) {
    let count = 1;
    for (let dir of [-1, 1]) {
      let nr = r + dir*dr, nc = c + dir*dc;
      while (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === currentPlayer) {
        count++;
        nr += dir*dr; nc += dir*dc;
      }
    }
    if (count >= 4) return true;
  }
  return false;
}

function resetGame() { init(); }
init();