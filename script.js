const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Button to start the game
const startButton = document.getElementById('startButton');

const targetZone = { x: 250, y: 300, width: 100, height: 20 };
const circleRadius = 20;
let circleY = 0; // Start at top of canvas
let speed = 2;
let score = 0;
let gameActive = false; // Game is not active initially

function drawTargetZone() {
  ctx.fillStyle = 'red';
  ctx.fillRect(targetZone.x, targetZone.y, targetZone.width, targetZone.height);
}

function drawCircle() {
  console.log('Drawing circle at Y position:', circleY); // Debugging
  ctx.beginPath();
  ctx.arc(300, circleY, circleRadius, 0, Math.PI * 2); // x = 300 (center), y = circleY
  ctx.fillStyle = 'blue'; // Circle color
  ctx.fill();
  ctx.closePath();
}

function checkHit() {
  return (
    circleY + circleRadius > targetZone.y &&
    circleY - circleRadius < targetZone.y + targetZone.height
  );
}

function gameOver() {
  gameActive = false;
  canvas.classList.add('game-over');
  ctx.font = '30px Arial';
  ctx.fillStyle = 'black';
  ctx.fillText(`Game Over! Your score: ${score}`, 100, 200);
  startButton.style.display = 'block'; // Show the start button again when game ends
}

function updateGame() {
  if (gameActive) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    drawTargetZone(); // Draw the target zone
    drawCircle(); // Draw the moving circle

    circleY += speed; // Move the circle down

    // Check if the circle goes off the screen (game over condition)
    if (circleY - circleRadius > canvas.height) {
      gameOver();
    }

    // Loop the animation
    requestAnimationFrame(updateGame);
  }
}

function handleKeyPress(event) {
  if (event.code === 'Space' && gameActive) {
    if (checkHit()) {
      score++;
      circleY = 0; // Reset the circle position
      speed += 0.5; // Increase speed to make the game harder
    } else {
      gameOver();
    }
  }
}

function startGame() {
  circleY = 0;
  speed = 2;
  score = 0;
  gameActive = true;
  canvas.classList.remove('game-over');
  startButton.style.display = 'none'; // Hide the start button once game starts
  updateGame();
}

// Event listener for the button to start the game
startButton.addEventListener('click', startGame);

// Event listener for keypresses
document.addEventListener('keydown', handleKeyPress);
