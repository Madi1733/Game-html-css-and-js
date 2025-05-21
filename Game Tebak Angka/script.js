const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
  const guess = parseInt(document.getElementById('guessInput').value);
  const message = document.getElementById('message');
  attempts++;

  if (isNaN(guess) || guess < 1 || guess > 100) {
    message.textContent = "Masukkan angka antara 1 dan 100!";
    message.style.color = "orange";
    return;
  }

  const difference = Math.abs(secretNumber - guess);

  if (guess === secretNumber) {
    message.textContent = `🎉 Benar! Kamu menebak dalam ${attempts} percobaan.`;
    message.style.color = "green";
  } else {
    let feedback = guess < secretNumber ? "Terlalu rendah!" : "Terlalu tinggi!";

    if (difference <= 5) {
      feedback += " 🔥 Hampir benar!";
    }

    message.textContent = feedback;
    message.style.color = "red";
  }
}
