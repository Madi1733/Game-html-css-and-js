const words = {
  easy: ["cat", "dog", "sun", "tree", "book", "car", "pen", "cup", "fish", "hat"],
  medium: ["javascript", "function", "variable", "object", "array", "programming", "keyboard", "developer", "browser", "syntax"],
  hard: ["asynchronous", "polymorphism", "encapsulation", "inheritance", "abstraction", "synchronization", "initialization", "declaration", "optimization", "concurrency"]
};

const wordDisplay = document.getElementById("wordDisplay");
const inputBox = document.getElementById("inputBox");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const wpmDisplay = document.getElementById("wpm");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const difficultySelect = document.getElementById("difficulty");

let currentWord = "";
let score = 0;
let time = 60;
let timerInterval;
let startTime;
let totalTypedWords = 0;

function getRandomWord(difficulty) {
  const list = words[difficulty];
  return list[Math.floor(Math.random() * list.length)];
}

function renderWord(word, typed) {
  // Highlight tiap huruf benar/ salah
  wordDisplay.innerHTML = "";
  for (let i = 0; i < word.length; i++) {
    const span = document.createElement("span");
    span.textContent = word[i];
    if (typed[i] == null) {
      // belum diketik
    } else if (typed[i] === word[i]) {
      span.classList.add("correct");
    } else {
      span.classList.add("incorrect");
    }
    wordDisplay.appendChild(span);
  }
}

function showNewWord() {
  const difficulty = difficultySelect.value;
  currentWord = getRandomWord(difficulty);
  renderWord(currentWord, "");
  inputBox.value = "";
  inputBox.focus();
}

function startGame() {
  score = 0;
  time = 60;
  totalTypedWords = 0;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = time;
  wpmDisplay.textContent = 0;
  inputBox.disabled = false;
  startBtn.disabled = true;
  resetBtn.disabled = false;
  difficultySelect.disabled = true;

  showNewWord();
  startTime = Date.now();

  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    time = 60 - elapsed;
    timeDisplay.textContent = time;

    if (time <= 0) {
      endGame();
    }
  }, 200);
}

function endGame() {
  clearInterval(timerInterval);
  inputBox.disabled = true;
  startBtn.disabled = false;
  resetBtn.disabled = true;
  difficultySelect.disabled = false;
  wordDisplay.textContent = `Waktu habis! Skor: ${score}, Kecepatan: ${calculateWPM()} WPM`;
}

function calculateWPM() {
  // WPM = (kata benar / menit)
  const minutes = (60 - time) / 60;
  if (minutes === 0) return 0;
  return Math.round(score / minutes);
}

inputBox.addEventListener("input", () => {
  const typed = inputBox.value;
  renderWord(currentWord, typed);

  if (typed.toLowerCase() === currentWord.toLowerCase()) {
    score++;
    totalTypedWords++;
    scoreDisplay.textContent = score;
    wpmDisplay.textContent = calculateWPM();
    showNewWord();
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  inputBox.disabled = true;
  startBtn.disabled = false;
  resetBtn.disabled = true;
  difficultySelect.disabled = false;
  timeDisplay.textContent = 60;
  scoreDisplay.textContent = 0;
  wpmDisplay.textContent = 0;
  wordDisplay.textContent = "";
  inputBox.value = "";
});

startBtn.addEventListener("click", startGame);
