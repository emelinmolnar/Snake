let previousTimeStamp = 0;
const snakeSpeed = 5;
const snakeBody = [{x: 11, y: 11}];
const gameBoard = document.getElementById("gameBoard");
let direction = {x: 0, y: 0}; //the direction the snake will be going.
let lastDirection = {x: 0, y: 0}; //the last direction the snake had.
let food = {x: 10, y: 1}; //initial place for food
let lastPlace = {x:11, y: 11}; //last place the snake has been.
let score = 0;
//let foodPosition = randomFoodPosition();


//loop function
function loop(currentTime) {
    if(checkGameOver() == true) {
        document.getElementById("gameOver").classList.remove("hidden");
        score = 0;
        return;
    }
    window.requestAnimationFrame(loop);
    const seconds = (currentTime - previousTimeStamp) / 1000;
    if(seconds < 1 / snakeSpeed) return;
    previousTimeStamp = currentTime;
    updateGame();
    drawSnake();
    drawFood();
    snakeOverFood();
    
}
 window.requestAnimationFrame(loop);


//Update snake Function
function updateGame() {
    const direction = getDirection(); //get the direction of the snake
    for(let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = {...snakeBody[i]}; //a new object entirely
    }
    snakeBody[0].x += direction.x; //the head of the snake
    snakeBody[0].y += direction.y; //the head of the snake
    
}





//Draw Snake Function
function drawSnake() {
    gameBoard.innerHTML = ''; //sets all content to nothing.
    snakeBody.forEach(item => {
        const snakePiece = document.createElement("div");
        snakePiece.style.gridRowStart = item.y;
        snakePiece.style.gridColumnStart = item.x;
        snakePiece.classList.add("snake");
        gameBoard.appendChild(snakePiece);
    });
}

function drawFood() {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
}

function extendSnake() {
    snakeBody.push(lastPlace);
}

function raiseScore() {
    document.getElementById("score").textContent = "Score: " + score;
    score++;
    document.getElementById("score").textContent = "Score: " + score;
}

function snakeOverFood () {
    if (snakeBody[0].x == food.x && snakeBody[0].y == food.y){ //the head of the snake is on the food
        //Extend the Snake
        extendSnake();
        raiseScore();
        food = generateFood();
    }
}


window.addEventListener('keydown', event => {
    switch(event.key) {
        case 'ArrowUp':
            if(lastDirection.y !== 0) 
                break
            direction = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            if(lastDirection.y !== 0) 
                break
            direction = {x: 0, y: 1};
            break;
        case 'ArrowLeft':
            if(lastDirection.x !== 0) 
                break
            direction = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            if(lastDirection.x !== 0) 
                break
            direction = {x: 1, y: 0};
            break;
    }
});

function checkGameOver() {
    if(outsideOfMatrix()) {
        return true;
    }
    for(let i = 1; i < snakeBody.length; i++) {
        if(snakeBody[0].x === snakeBody[i].x && snakeBody[0].y === snakeBody[i].y) {
            return true;
        }
    }
    return false;
}

function outsideOfMatrix() {
    return snakeBody[0].x < 1 || snakeBody[0].x > 21 || snakeBody[0].y < 1 || snakeBody[0].y > 21;
}


function generateFood() {
    let newFoodPosition;
    while(newFoodPosition == null || onSnake(newFoodPosition)) { //if the food generated is on the snake, generate another.
        newFoodPosition = randomFoodPosition();
    }
    return newFoodPosition;
}

function randomFoodPosition() {
    return {
        x: Math.floor(Math.random() * 21) + 1,
        y: Math.floor(Math.random() * 21) + 1
    };
}

function getDirection (){
    lastDirection = direction;
    return direction;
}

function onSnake(position) {
    return snakeBody.some(segment => {  //.some -> if one of the items in the array passes the function, it returns true.
        return segment.x === position.x && segment.x === position.y;
    });
}