let board = document.querySelector(".board");
let fps = 10;
let food = new Audio("music/food.mp3");
let move = new Audio("music/move.mp3");
let music = new Audio("music/music.mp3");
let gameover = new Audio("music/gameover.mp3");
let snakeArr = [{ x: 13, y: 5 }];
let foodArr = { x: 5, y: 5 };

let velocity = { x: 0, y: 0 };
setInterval(() => {
    main();
}, (1000 / fps));
//main function

function main() {
    board.innerHTML = "";
    //gameOver
    if (gameOver()) {
        gameover.play();
        alert("gameOver");
        console.log(snakeArr);
        velocity = { x: 0, y: 0 }; // Reset velocity as an object
        snakeArr = [{ x: 13, y: 5 }];
    }

    //update snake and food

    if (foodArr.x == snakeArr[0].x && foodArr.y == snakeArr[0].y) {
        food.play();
        foodArr.x = Math.floor(Math.random() * (18)) + 1;
        foodArr.y = Math.floor(Math.random() * (18)) + 1;
        snakeArr.unshift({
            x: (snakeArr[0].x + velocity.x),
            y: (snakeArr[0].y + velocity.y)
        });
        console.log(snakeArr);
        console.log(velocity.x);
        console.log(snakeArr);
    }
    //move snake

    // for (let i = 1; i < snakeArr.length-1; i++) {
    //     snakeArr[i].x = snakeArr[i + 1].x;
    //     snakeArr[i].y = snakeArr[i + 1].y;

    // }
    for (let i = snakeArr.length - 1; i > 0; i--) {
        snakeArr[i].x = snakeArr[i - 1].x;
        snakeArr[i].y = snakeArr[i - 1].y;
    }
//     for (let i = 1; i < snakeArr.length; i++) {
//     snakeArr[i].x = snakeArr[i - 1].x;
//     snakeArr[i].y = snakeArr[i - 1].y;
// }


    snakeArr[0].x += velocity.x;
    snakeArr[0].y += velocity.y;


    //dislay snake

    snakeArr.forEach((snakePart, index) => {
        let snake_p = document.createElement("div");
        snake_p.style.gridColumnStart = snakePart.x;
        snake_p.style.gridRowStart = snakePart.y;
        if (index == 0) {
            snake_p.classList.add("snake_head");
        }
        else {
            // console.log(snake_p);
            snake_p.classList.add("snake_body")
        }
        snake_p.innerText = index;
        board.append(snake_p);
    })
    let food_element = document.createElement("div");
    food_element.style.gridColumnStart = foodArr.x;
    food_element.style.gridRowStart = foodArr.y;
    food_element.classList.add("snake_food")
    // console.log(food_element);
    board.append(food_element);

}
//gameOver
function gameOver() {
    if (snakeArr[0].x < 1 || snakeArr[0].x > 18 || snakeArr[0].y < 1 || snakeArr[0].y > 18) {
        return true;
    }
    for (let i = 1; i < snakeArr.length; i++) {
        if (snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y) {
            return true;
        }
    }
    return false;
}
//main logic to move the snake
document.addEventListener("keydown", (e) => {
    velocity = { x: 0, y: 0 };
    // console.log(e.key);
    move.play();
    switch (e.key) {
        case "ArrowUp": {
            velocity.x = 0;
            velocity.y = -1;
        }
            break;
        case "ArrowDown": {
            velocity.x = 0;
            velocity.y = 1;
        }
            break;
        case "ArrowLeft": {
            velocity.x = -1;
            velocity.y = 0;
        }
            break;
        case "ArrowRight": {
            velocity.x = 1;
            velocity.y = 0;
        }
            break;
    }
})
