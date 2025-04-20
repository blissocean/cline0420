const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{x: 9 * box, y: 10 * box}];
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};
let direction;
let score = 0;

document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.keyCode == 37 && direction != 'RIGHT') direction = 'LEFT';
    else if (event.keyCode == 38 && direction != 'DOWN') direction = 'UP';
    else if (event.keyCode == 39 && direction != 'LEFT') direction = 'RIGHT';
    else if (event.keyCode == 40 && direction != 'UP') direction = 'DOWN';
}

function drawGame() {
    // 绘制背景
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制蛇
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? 'green' : 'lightgreen';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    
    // 绘制食物
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
    
    // 移动蛇
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    if (direction == 'LEFT') snakeX -= box;
    if (direction == 'UP') snakeY -= box;
    if (direction == 'RIGHT') snakeX += box;
    if (direction == 'DOWN') snakeY += box;
    
    // 检测是否吃到食物
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }
    
    // 创建新的蛇头
    let newHead = {x: snakeX, y: snakeY};
    
    // 游戏结束条件
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height 
        || collision(newHead, snake)) {
        clearInterval(game);
        alert('游戏结束! 得分: ' + score);
    }
    
    snake.unshift(newHead);
    
    // 显示分数
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('分数: ' + score, 10, 20);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(drawGame, 100);