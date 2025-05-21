const puzzleEl = document.getElementById("puzzle");
const shuffleBtn = document.getElementById("shuffle-btn");
const messageEl = document.getElementById("message");

let tiles = [];
let emptyIndex = 8; // posisi kotak kosong awal

function initPuzzle() {
  tiles = [...Array(8).keys()].map(i => i + 1);
  tiles.push(null);
  emptyIndex = 8;
  render();
  messageEl.textContent = "";
}

function render() {
  puzzleEl.innerHTML = "";
  tiles.forEach((num, idx) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    if(num === null) {
      tile.classList.add("empty");
      tile.textContent = "";
    } else {
      tile.textContent = num;
      tile.addEventListener("click", () => moveTile(idx));
    }
    puzzleEl.appendChild(tile);
  });
}

function moveTile(idx) {
  if(canMove(idx)) {
    tiles[emptyIndex] = tiles[idx];
    tiles[idx] = null;
    emptyIndex = idx;
    render();
    if(checkWin()) {
      messageEl.textContent = "Selamat! Kamu berhasil menyusun puzzle.";
    }
  }
}

function canMove(idx) {
  const emptyRow = Math.floor(emptyIndex / 3);
  const emptyCol = emptyIndex % 3;
  const idxRow = Math.floor(idx / 3);
  const idxCol = idx % 3;

  const rowDiff = Math.abs(emptyRow - idxRow);
  const colDiff = Math.abs(emptyCol - idxCol);

  return (rowDiff + colDiff === 1);
}

function shuffle() {
  for(let i=0; i<1000; i++) {
    const neighbors = getNeighbors(emptyIndex);
    const rand = neighbors[Math.floor(Math.random() * neighbors.length)];
    tiles[emptyIndex] = tiles[rand];
    tiles[rand] = null;
    emptyIndex = rand;
  }
  render();
  messageEl.textContent = "";
}

function getNeighbors(idx) {
  const row = Math.floor(idx / 3);
  const col = idx % 3;
  const neighbors = [];
  if(row > 0) neighbors.push(idx - 3);
  if(row < 2) neighbors.push(idx + 3);
  if(col > 0) neighbors.push(idx - 1);
  if(col < 2) neighbors.push(idx + 1);
  return neighbors;
}

function checkWin() {
  for(let i=0; i<8; i++) {
    if(tiles[i] !== i+1) return false;
  }
  return true;
}

shuffleBtn.addEventListener("click", shuffle);

initPuzzle();
