const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20; // Size of snake segments
const canvasSize = 400;
let score = 0;

let snake = [];
snake[0] = { x: 9 * box, y: 10 * box };

let food = {
  x: Math.floor(Math.random() * (canvasSize / box)) * box,
  y: Math.floor(Math.random() * (canvasSize / box)) * box
};

let direction = null;

// Listen for arrow keys
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
  const key = event.keyCode;
  if (key === 37 && direction !== 'RIGHT') direction = 'LEFT';
  else if (key === 38 && direction !== 'DOWN') direction = 'UP';
  else if (key === 39 && direction !== 'LEFT') direction = 'RIGHT';
  else if (key === 40 && direction !== 'UP') direction = 'DOWN';
}

// Collision with walls or self
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) return true;
  }
  if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) return true;
  return false;
}

// Draw everything
function draw() {
  // Clear canvas
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? 'lime' : 'green';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);

  // Move snake
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === 'LEFT') snakeX -= box;
  if (direction === 'UP') snakeY -= box;
  if (direction === 'RIGHT') snakeX += box;
  if (direction === 'DOWN') snakeY += box;

  // Eat food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    document.getElementById('score').innerText = score;
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
  } else {
    snake.pop();
  }

  let newHead = { x: snakeX, y: snakeY };

  if (collision(newHead, snake)) {
    clearInterval(game);
    alert('Game Over! Your score: ' + score);
  }

  snake.unshift(newHead);
}

// Restart button
document.getElementById('restartBtn').addEventListener('click', () => {
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = null;
  score = 0;
  document.getElementById('score').innerText = score;
  food = {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box
  };
  clearInterval(game);
  game = setInterval(draw, 100);
});

let game = setInterval(draw, 100);
