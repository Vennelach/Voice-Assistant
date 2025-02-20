const wordsWithHints = {
    "JAVASCRIPT": "A popular programming language for web development",
    "PYTHON": "A widely-used high-level programming language",
    "CODING": "The process of writing instructions for computers",
    "DEVELOPER": "A person who creates software applications",
    "HANGMAN": "A classic word-guessing game",
    "ALGORITHM": "A step-by-step procedure to solve a problem",
    "DATABASE": "A structured set of data stored electronically",
    "FUNCTION": "A reusable block of code in programming"
};

let selectedWord, guessedLetters, wrongGuesses, score = 0;
let highScore = localStorage.getItem("highScore") || 0;
const wordDisplay = document.getElementById("word-display");
const hintDisplay = document.getElementById("hint");
const keyboard = document.getElementById("keyboard");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

function drawHangman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 280);
    ctx.lineTo(250, 280);
    if (wrongGuesses > 0) ctx.lineTo(150, 250);
    if (wrongGuesses > 1) ctx.moveTo(150, 250), ctx.lineTo(150, 50);
    if (wrongGuesses > 2) ctx.lineTo(200, 50);
    if (wrongGuesses > 3) ctx.lineTo(200, 80);
    if (wrongGuesses > 4) ctx.arc(200, 100, 20, 0, Math.PI * 2);
    if (wrongGuesses > 5) ctx.moveTo(200, 120), ctx.lineTo(200, 180);
    ctx.stroke();
}

function updateWordDisplay() {
    wordDisplay.textContent = selectedWord.split('').map(letter => guessedLetters.includes(letter) ? letter : "_").join(" ");
    if (!wordDisplay.textContent.includes("_")) {
        score += 10;
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
        }
        scoreDisplay.textContent = "Score: " + score;
        highScoreDisplay.textContent = "High Score: " + highScore;
        setTimeout(resetGame, 2000);
    }
}

function handleGuess(letter) {
    if (guessedLetters.includes(letter) || wrongGuesses >= 6) return;
    guessedLetters.push(letter);
    
    if (!selectedWord.includes(letter)) {
        wrongGuesses++;
        drawHangman();
        if (wrongGuesses >= 6) {
            message.textContent = "Game Over! The word was: " + selectedWord;
            score = 0;
            setTimeout(resetGame, 2000);
        }
    }
    updateWordDisplay();
    scoreDisplay.textContent = "Score: " + score;
}

function resetGame() {
    selectedWord = Object.keys(wordsWithHints)[Math.floor(Math.random() * Object.keys(wordsWithHints).length)];
    guessedLetters = [];
    wrongGuesses = 0;
    hintDisplay.textContent = "Hint: " + wordsWithHints[selectedWord];
    message.textContent = "";
    updateWordDisplay();
    drawHangman();
}

"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(letter => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => handleGuess(letter));
    keyboard.appendChild(button);
});

resetGame();
