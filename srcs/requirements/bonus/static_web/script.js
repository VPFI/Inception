const title = document.getElementById("title");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class Snake {
	constructor() {
		this.size = 1;
		this.body = [{x: 50, y: 50}];
		this.head = this.body[0];
		this.direction = {x: 0, y: 0};
		this.speed = 0.5;
	}
	grow(last) {
		this.body.push({x: last.x, y: last.y});
		this.size++;
	}
}

var		inGame = false;
var		moving = false;
const	bodySize = 10;
const	bodyColor = "green";
const	headColor = "white";
const	foodSize = 5;
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
		let x = Math.floor(Math.random() * 300);
		let y = Math.floor(Math.random() * 300);
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
		gameLoop();
	}
}

function	printFood() {
	ctx.fillStyle = foodColor;
	food.forEach((elem) => {
		ctx.fillRect(elem.x, elem.y, foodSize, foodSize);
	});
}

function	printSnake() {
	ctx.fillStyle = headColor;
	snake.body.forEach((elem) => {
		ctx.fillRect(elem.x, elem.y, bodySize, bodySize);
		ctx.fillStyle = bodyColor;
	});
}

function	clamp(num, min, max) {
	return Math.min(Math.max(num, min), max);
  };

function	checkCollisions(lastElem) {
	if (checkBounds()) {
		return true;
	}
	if (Math.abs(food[0].x - snake.head.x) < bodySize &&
		Math.abs(food[0].y - snake.head.y) < bodySize) {
			food.pop();
			snake.grow(lastElem);
	}
	if (!food.length)
		populateFood(1);
	return false;
}

function	checkBounds() {
	if (snake.head.x > (300 - bodySize) || snake.head.x <= 0)
		return true;
	if (snake.head.y > (300 - bodySize) || snake.head.y <= 0)
		return true;
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

function	gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	updateSnake();
	drawFrame();

	requestAnimationFrame(gameLoop);
}