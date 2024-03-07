let bigFoodArr = {};
let bigFood = 4;
let showFoodNum=4;
let bigFoodTrue = false;
let stopGame = false;
let stopTime = 0;
let remainingTime = 2000;
let bigFoodElement;
let showSpeed=document.getElementById('show-speed')
let showFood=document.getElementById('show-food')
// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
let hiscoreval;
let hiscoreBox = document.getElementById("hiscoreBox")
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('music.mp3');
let board = document.getElementById('board')
let continueGame = true;
let speed = 12;
let speedEffect = Math.round((12 / speed) * 2000);
let remainder = Math.round(((12 / speed) * 2000) % 100)
let roundRemainder = remainder < 49 ? 0 : 100
speedEffect = speedEffect - remainder + roundRemainder
let speedCon = document.getElementById('speed');

function setSpeed() {
    speed=parseInt(speedCon.value)
    if (speedCon.value === "") {
        alert("Enter a speed number if you want to set it")
    }else if(typeof speed===typeof 4 && speedCon.value<8 && speedCon.value>=0){
        alert("Please Enter number greater than 8")
    }else if (speedCon.value < 21 && speedCon.value > 8) {
        if (speedCon.value <= 15) {
            alert("It's easy.Set speed high and make some fun")
        } else {
            alert("Hard but not difficult.")
        }
        speed = parseInt(speedCon.value)
        showSpeed.innerHTML=`Your speed is ${speed}`
        speedEffect = Math.round((12 / speed) * 2000);
        remainder = Math.round(((12 / speed) * 2000) % 100)
        roundRemainder = remainder < 49 ? 0 : 100
        speedEffect = speedEffect - remainder + roundRemainder
        speedCon.value = ""

    }else if (speedCon.value > 20 && speedCon.value < 26) {
        let setSpeedConfirm = confirm("It's high!Do you want to set it")
        if (setSpeedConfirm) {
            speed = parseInt(speedCon.value)
            showSpeed.innerHTML=`Your speed is ${speed}`
            speedEffect = Math.round((12 / speed) * 2000);
            remainder = Math.round(((12 / speed) * 2000) % 100)
            roundRemainder = remainder < 49 ? 0 : 100
            speedEffect = speedEffect - remainder + roundRemainder
        }
        speedCon.value = ""
    }else  if (speedCon.value > 25) {
        alert("Enter speed less then 26")
        speedCon.value = ""
    }
}

let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
];

let food = { x: 13, y: 15 };

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}
// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake, headBody) {
    if (headBody) {
        return true
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true
        }
    }

    //              Expermiment iej aifjoajfkdjf 
    if (snakeArr[0].x === 2) {
        if (inputDir.x === -1) {
            return true
        }
    }
    if (snakeArr[0].x === 18) {
        if (inputDir.x === 1) {
            return true
        }
    }
    if (snakeArr[0].y === 2) {
        if (inputDir.y === -1) {
            return true
        }
    }
    if (snakeArr[0].y === 18) {
        if (inputDir.y === 1) {
            return true
        }
    }
    return false;
}

function check(snake, headBody, headBorder) {
    if (isCollide(snake, headBody, headBorder)) {
        showFoodNum=4
        showFood.innerHTML="Big Food After 4 Score"
        speedCon.value = ""
        bigFoodArr = {};
        bigFood = 4;
        bigFoodTrue = false;
        stopGame = false;
        stopTime = 0;
        gameOverSound.play();
        musicSound.pause();
        alert("Game Over. Press any key to play again!");
        inputDir = { x: 0, y: 0 };
        snakeArr = [{ x: 13, y: 15 }];
        let foodX = Math.floor(Math.random() * 18)
        let foodY = Math.floor(Math.random() * 18)
        food = { x: ((foodX < 2) ? 2 : foodX), y: ((foodY < 2) ? 2 : foodY) };
        foodCheck(snakeArr)
        score = 0;
        scoreBox.innerHTML = "Score: " + score
    } else {
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] };
        }
        snakeArr[0].x += inputDir.x;
        snakeArr[0].y += inputDir.y;
    }
}

function foodCheck(snakeArr) {
    for (let i = 0; i < snakeArr.length; i++) {
        if (food.x === snakeArr[i].x && food.y === snakeArr[i].y) {
            let foodX = Math.floor(Math.random() * 18)
            let foodY = Math.floor(Math.random() * 18)
            food = { x: ((foodX < 2) ? 2 : foodX), y: ((foodY < 2) ? 2 : foodY) };
            foodCheck(snakeArr)
        }
    }
    if (food.x === bigFoodArr.x && food.y === bigFoodArr.y) {
        let foodX = Math.floor(Math.random() * 18)
        let foodY = Math.floor(Math.random() * 18)
        food = { x: ((foodX < 2) ? 2 : foodX), y: ((foodY < 2) ? 2 : foodY) };
        foodCheck(snakeArr)
    }
}
foodCheck(snakeArr)
function bigFoodCheck(snakeArr) {
    for (let i = 0; i < snakeArr.length; i++) {
        if (bigFoodArr.x === snakeArr[i].x && bigFoodArr.y === snakeArr[i].y) {
            let bigFoodX = Math.floor(Math.random() * 18)
            let bigFoodY = Math.floor(Math.random() * 18)
            bigFoodArr = { x: ((bigFoodX < 2) ? 2 : bigFoodX), y: ((bigFoodY < 2) ? 2 : bigFoodY) };
            bigFoodCheck(snakeArr)
        }
    }
    if (food.x === bigFoodArr.x && food.y === bigFoodArr.y) {
        let foodX = Math.floor(Math.random() * 18)
        let foodY = Math.floor(Math.random() * 18)
        food = { x: ((foodX < 2) ? 2 : foodX), y: ((foodY < 2) ? 2 : foodY) };
        bigFoodCheck(snakeArr)
    }
}

//creating border
function gameEngine() {
    // Moving the snake
    if (continueGame) {
        if (snakeArr[0].y === bigFoodArr.y && snakeArr[0].x === bigFoodArr.x) {
            let bigScore = Math.round(((remainingTime - stopTime) / 200))
            score += (bigScore < 2 ? 2 : bigScore)
            scoreBox.innerHTML = "Score: " + score;
            showFoodNum+=(bigScore < 2 ? 2 : bigScore)
            showFood.innerHTML=`Big food after ${showFoodNum} Score`
            foodSound.play();
            bigFoodArr = {}
            bigFoodTrue = false;
            stopGame = false
            stopTime = 0;
        }

        if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
            foodSound.play();
            score += 1;
            if (score > hiscoreval) {
                hiscoreval = score;
                localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
                hiscoreBox.innerHTML = "High Score: " + hiscoreval;
            }
            scoreBox.innerHTML = "Score: " + score;
            if (snakeArr.length > 2) {
                let xEle = parseInt(snakeArr[snakeArr.length - 1].x) - parseInt(snakeArr[snakeArr.length - 2].x)
                let yEle = parseInt(snakeArr[snakeArr.length - 1].y) - parseInt(snakeArr[snakeArr.length - 2].y)
                snakeArr.push({ x: xEle + snakeArr[snakeArr.length - 1].x, y: yEle + snakeArr[snakeArr.length - 1].y })
            } else {
                snakeArr.push({ x: snakeArr[0].x - inputDir.x, y: snakeArr[0].y - inputDir.y });
            }
            foodCheck(snakeArr)
        }
        if (bigFoodTrue) {
            stopTime += 100
            if(stopTime===2000){
                bigFoodArr = {};
                bigFoodTrue = false;
                stopTime = 0;
            }
        }

        check(snakeArr, null, null)

        board.innerHTML = "";

        // Part 2: Display the snake and Food
        // Display the snake


        snakeArr.forEach((e, index) => {
            let snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = e.y;
            snakeElement.style.gridColumnStart = e.x;

            if (index === 0) {
                snakeElement.classList.add('head');
            }
            else {
                snakeElement.classList.add('snake');
            }
            board.appendChild(snakeElement);
        });

        if (bigFood === snakeArr.length - 1) {
            bigFoodTrue = true;
            let bigFoodX = Math.floor(Math.random() * 18)
            let bigFoodY = Math.floor(Math.random() * 18)
            bigFoodArr = { x: ((bigFoodX < 2) ? 2 : bigFoodX), y: ((bigFoodY < 2) ? 2 : bigFoodY) };
            bigFoodCheck(snakeArr)
            bigFood += 4
            showFoodNum+=4;
            showFood.innerHTML=`Big Food After ${showFoodNum} Score`
        }
        if (bigFoodArr != {}) {
            bigFoodElement = document.createElement('div');
            bigFoodElement.style.gridRowStart = bigFoodArr.y;
            bigFoodElement.style.gridColumnStart = bigFoodArr.x;
            bigFoodElement.classList.add('yellow')
            board.appendChild(bigFoodElement);
        }
        // Display the food
        let foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);




        for (let i = 0; i < 19; i++) {

            // borderElement1 Coding
            let borderElement1 = document.createElement('div');
            borderElement1.style.gridRowStart = 1;
            borderElement1.style.gridColumnStart = i + 1;
            borderElement1.classList.add('grid')
            board.appendChild(borderElement1);
            //   borderElement1 Border Codin
            if (i <= 18) {
                for (let i2 = 1; i2 < 9; i2++) {
                    let borderElement1border = document.createElement('div')
                    borderElement1border.classList.add('black')
                    borderElement1border.style.gridRowStart = 8;
                    if (i === 0) {
                        borderElement1border.style.gridColumnStart = 8;
                    } else if (i === 18) {
                        borderElement1border.style.gridColumnStart = 1;
                    } else {
                        borderElement1border.style.gridColumnStart = i2;
                    }

                    borderElement1.appendChild(borderElement1border)
                }
            }



            // borderElement2 Coding

            let borderElement2 = document.createElement('div');
            borderElement2.style.gridRowStart = i + 1;
            borderElement2.style.gridColumnStart = 1;
            borderElement2.classList.add('grid')
            board.appendChild(borderElement2);

            // borderElement 2 Border Coding
            if (i <= 18) {
                for (let i3 = 1; i3 < 9; i3++) {
                    if (!(i === 0)) {
                        let borderElement2border = document.createElement('div')
                        borderElement2border.style.gridColumnStart = 8;
                        borderElement2border.classList.add('black')
                        if (i === 18) {
                            borderElement2border.style.gridRowStart = 1;
                            borderElement2.appendChild(borderElement2border)
                        } else {
                            borderElement2border.style.gridRowStart = i3;
                            borderElement2.appendChild(borderElement2border)
                        }
                    }
                }

            }

            // borderElement3 Coding
            let borderElement3 = document.createElement('div');
            borderElement3.style.gridRowStart = i + 1;
            borderElement3.style.gridColumnStart = 19;
            borderElement3.classList.add('grid')
            board.appendChild(borderElement3);

            // borderElement3 Border Coding
            if (i <= 18) {
                if (!(i === 0)) {
                    if (i === 18) {
                        let borderElement3border = document.createElement('div')
                        borderElement3border.style.gridRowStart = 1;
                        borderElement3border.style.gridColumnStart = 1;
                        borderElement3.appendChild(borderElement3border)
                        borderElement3border.classList.add('black')
                    } else {
                        for (let i4 = 1; i4 < 9; i4++) {
                            let borderElement3border = document.createElement('div')
                            borderElement3border.style.gridRowStart = i4;
                            borderElement3border.style.gridColumnStart = 1;
                            borderElement3border.classList.add('black')
                            borderElement3.appendChild(borderElement3border)
                        }
                    }
                }

            }
            // borderElement4 Coding

            let borderElement4 = document.createElement('div');
            borderElement4.style.gridRowStart = 19;
            borderElement4.style.gridColumnStart = i + 1;
            borderElement4.classList.add('grid')
            board.appendChild(borderElement4);

            // borderElement Border4 Coding
            if (i <= 18 && !(i === 0)) {
                if (!(i === 0)) {
                    if (i === 18) {
                        let borderElement4border = document.createElement('div')
                        borderElement4border.style.gridRowStart = 1;
                        borderElement4border.style.gridColumnStart = 1;
                        borderElement4border.classList.add('black')
                        borderElement4.appendChild(borderElement4border)
                    } else {
                        for (let i5 = 1; i5 < 9; i5++) {
                            let borderElement4border = document.createElement('div')
                            borderElement4border.style.gridRowStart = 1;
                            borderElement4border.style.gridColumnStart = i5;
                            borderElement4border.classList.add('black')
                            borderElement4.appendChild(borderElement4border)
                        }
                    }
                }
            }
        }
    }
}

// Main logic starts here

window.requestAnimationFrame(main);

window.addEventListener('keydown', (e) => {

    if (e.key === "w" || e.key === "ArrowUp") {
        continueGame = true
        if (snakeArr.length >= 2 && inputDir.y === 1) {
            inputDir = { x: 0, y: 0 };
            check(snakeArr, true, null)
        } else {
            moveSound.play();
            musicSound.play();
            inputDir.x = 0;
            inputDir.y = -1;
        }
    } else if (e.key === "s" || e.key === "ArrowDown") {
        continueGame = true
        if (snakeArr.length >= 2 && inputDir.y === -1) {
            inputDir = { x: 0, y: 0 };
            check(snakeArr, true, null)
        } else {
            moveSound.play();
            musicSound.play();
            inputDir.x = 0;
            inputDir.y = 1;
        }
    } else if (e.key === "a" || e.key === "ArrowLeft") {
        continueGame = true
        if (snakeArr.length >= 2 && inputDir.x === 1) {
            continueGame = true
            inputDir = { x: 0, y: 0 };
            check(snakeArr, true, null)
        } else {
            moveSound.play();
            musicSound.play();
            inputDir.x = -1;
            inputDir.y = 0;
        }
    } else if (e.key === "d" || e.key === "ArrowRight") {
        continueGame = true
        if (snakeArr.length >= 2 && inputDir.x === -1) {
            inputDir = { x: 0, y: 0 };
            check(snakeArr, true, null)
        } else {
            moveSound.play();
            musicSound.play();
            inputDir.x = 1;
            inputDir.y = 0;
        }
    } else if (e.key === 'Pause' || e.key === 'Break' || e.key === 'p') {
        e.preventDefault();
        musicSound.pause();
        continueGame = false
    }
})
