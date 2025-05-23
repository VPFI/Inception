const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Snake {
	constructor() {
		this.size = 1;
		this.body = [{x: (canvas.width / 2) - bodySize, y: (canvas.height / 2)}];
		this.head = this.body[0];
		this.direction = {x: 0, y: 0};
		this.speed = 1;
	}
	grow(last) {
		this.body.push({x: last.x, y: last.y});
		this.size++;
	}
}

var		inGame = false;
var		moving = false;
const	targetTime = 1000 / 30;
var		lastTime = performance.now();
const	bodySize = 10;
const	bodyColor = "#94b19e";
const	headColor = "#79dc1d";
const	foodSize = 10;
const	foodColor = "red";
var		food = [];

const snake = new Snake();


function	moveTitle() {
	title.style.top = "25px";
	title.style.opacity = 1;
}

window.addEventListener("keydown", (e) => {
	if (inGame == true) {
		return ;
	} else if (e.key == "Enter") {
		inGame = true;
		canvas.focus();
		title.style.opacity = 0;
		subtitle.style.opacity = 0;
		setTimeout(moveTitle, 300);
		setTimeout(startGame, 300);
	}
});

canvas.addEventListener("keydown", (e) => {
	if (moving === false) {
		moving = true
	};
	switch (e.key) {
		case "ArrowUp":
			snake.direction = {x: 0, y: -1};
			break;
		case "ArrowDown":
			snake.direction = {x: 0, y: 1};
			break;
		case "ArrowLeft":
			snake.direction = {x: -1, y: 0};
			break;
		case "ArrowRight":
			snake.direction = {x: 1, y: 0};
			break;
		
		default:
			break;
	}
});

function	populateFood(amount) {
	for (let i = 0; i < amount; ++i) {
		let x = Math.floor(Math.random() * canvas.width);
		let y = Math.floor(Math.random() * canvas.height);
		let newMeal = {x: x, y: y};
		food.push(newMeal);
	}
}

function	startGame() {
	if (inGame === false) {
		return ;
	}
	else {
		populateFood(1);
		snake.grow({x: canvas.width / 2, y: canvas.height / 2});
		snake.grow({x: (canvas.width / 2) + bodySize, y: canvas.height / 2});
		gameLoop();
	}
}

function	printFood() {
	ctx.fillStyle = foodColor;
	food.forEach((elem) => {
		ctx.fillRect(elem.x, elem.y, foodSize, foodSize);
	});
}

// function	printSnake() {
// 	ctx.fillStyle = bodyColor;
// 	ctx.strokeStyle = "white";
// 	for (let i = snake.size - 1; i > 0; i--) {
// 		ctx.fillRect(snake.body[i].x, snake.body[i].y, bodySize, bodySize);
// 		ctx.strokeRect(snake.body[i].x, snake.body[i].y, bodySize, bodySize)
// 	}
// 	ctx.fillStyle = headColor;
// 	ctx.fillRect(snake.head.x, snake.head.y, bodySize, bodySize);
// }

function printSnake() {
	ctx.strokeStyle = "white";
	ctx.lineWidth = 1;

	for (let i = 1; i < snake.body.length; i++) {
		ctx.fillStyle = bodyColor;
		ctx.beginPath();
		ctx.roundRect(snake.body[i].x, snake.body[i].y, bodySize, bodySize, 4);
		ctx.fill();
		ctx.stroke();
	}
	ctx.shadowColor = headColor;
	ctx.shadowBlur = 15;
	ctx.fillStyle = headColor;
	ctx.beginPath();
	ctx.roundRect(snake.head.x, snake.head.y, bodySize, bodySize, 4);
	ctx.fill();
	ctx.shadowBlur = 0;
}

function	clamp(num, min, max) {
	return Math.min(Math.max(num, min), max);
  };

function	checkCollisions(lastElem) {
	if (checkBounds()) {
		return true;
	}
	if (Math.abs(food[0].x - snake.head.x) < foodSize &&
		Math.abs(food[0].y - snake.head.y) < foodSize) {
			food.pop();
			snake.grow(lastElem);
	}
	if (!food.length)
		populateFood(1);
	return false;
}

function	checkBounds() {
	if (snake.head.x > (canvas.width - bodySize)) snake.head.x = bodySize;
    else if (snake.head.y > (canvas.height - bodySize)) snake.head.y = bodySize;
    else if (snake.head.x < 0) snake.head.x = canvas.width - bodySize;
    else if (snake.head.y < 0) snake.head.y = canvas.height - bodySize;
	return false;
}

function	moveHead() {
	snake.head.x += (snake.direction.x * bodySize * snake.speed);
	snake.head.y += (snake.direction.y * bodySize * snake.speed);
}

function	moveBody() {
	for (let i = snake.size - 1; i > 0; i--) {
			snake.body[i] = {...snake.body[i - 1]};
	}
}

function gameOver() {
    inGame = false;
    moving = false;
    alert("Game Over!");
}

function	updateSnake() {
	if (moving === false) return ;
	var	lastElem = {...snake.body[snake.body.length - 1]};
	moveBody();
	moveHead();
	if (checkCollisions(lastElem)) {
		gameOver();
	}
}

function	drawFrame() {
	printFood();
	printSnake();
}

function gameLoop(currentTime) {
	const deltaTime = currentTime - lastTime;

	if (deltaTime >= targetTime) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		updateSnake();
		drawFrame();
		lastTime = currentTime - (deltaTime % targetTime);
	}

	requestAnimationFrame(gameLoop);
}
