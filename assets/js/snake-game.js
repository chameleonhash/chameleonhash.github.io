const canvas = document.getElementById('snakeGame');
const context = canvas.getContext('2d');
const box = 20;
let snake = [];
snake[0] = { x: 10 * box, y: 10 * box };
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};
let d;
document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode == 37 && d != 'RIGHT') d = 'LEFT';
    if (event.keyCode == 38 && d != 'DOWN') d = 'UP';
    if (event.keyCode == 39 && d != 'LEFT') d = 'RIGHT';
    if (event.keyCode == 40 && d != 'UP') d = 'DOWN';
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i == 0) ? 'green' : 'white';
        context.fillRect(snake[i].x, snake[i].y, box, box);
        context.strokeStyle = 'black';
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (d == 'LEFT') snakeX -= box;
    if (d == 'UP') snakeY -= box;
    if (d == 'RIGHT') snakeX += box;
    if (d == 'DOWN') snakeY += box;
    if (snakeX == food.x && snakeY == food.y) {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    snake.unshift(newHead);
}

let game = setInterval(draw, 100);
