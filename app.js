const grid = document.querySelector('.grid')
const button = document.getElementById('btn')
const scoreDisplay = document.getElementById('score')
const squareStack = []
let snake = [2,1,0]
let direction = 1
let width = 10
let appleIndex = 0
let score = 0
let snakeSpeed = 1000
let timerId = 0
let speed = 1.0

function createDiv() {
    // Create elements
    // Create 100s of these elements
    for(let i = 0; i < 100;i++) {
    const squares = document.createElement('div')
    
    console.log(squares)

    // Add styling to these elements
    squares.classList.add('squares')
    // Put the element into the main element

    grid.appendChild(squares)
    // Create an array of squares
    squareStack.push(squares)
    }
}
createDiv()

snake.forEach(index => squareStack[index].classList.add('snake'))

function startRestart() {
    // //remove the snake
    // snake.forEach(index => squareStack[index].classList.remove('snake'))
    // //remove the apple
    // squareStack[appleIndex].classList.remove('apple')

    // clearInterval(timerId)
    // snake = [2,1,0]
    // score = 0
    // //re add new score to browser
    // scoreDisplay.textContent = score
    
    // snakeSpeed = 1000
    // direction = 1
    // applePool()
    // //readd the class of snake to our new Snake
    // snake.forEach(index => squareStack[index].classList.add('snake'))
    // //Snake speed in terms of seconds 
    let timerId = setInterval(move, snakeSpeed)
}

function move() {
    if (
        (snake[0] + width >= width*width && direction === width) ||  //if snake has hit bottom
        (snake[0] % width === width-1 && direction === 1) ||  //if snake has hit right wall
        (snake[0] % width === 0 && direction === -1) ||  //if snake has hit left wall
        (snake[0] - width < 0 && direction === -width) ||  //if snake has hit top
        squareStack[snake[0] + direction].classList.contains('snake')
    )

    // Stop moving the snake
    return clearInterval(timerId)

    // Remove last element from our snake array
    let tail = snake.pop()
    // Remove styling from last element
    squareStack[tail].classList.remove('snake')
    // Add square in direction we are heading
    snake.unshift(snake[0] + direction)

    //deal with snake head gets apple
    if (squareStack[snake[0]].classList.contains('apple')) {

        //remove the class of apple
        squareStack[snake[0]].classList.remove('apple')

        //grow our snake by adding class of snake to it
        squareStack[tail].classList.add('snake')
        
        //grow our snake array
        snake.push(tail)
        
        //generate new apple
        applePool()
        
        //add one to the score
        score++

        //display our score
        scoreDisplay.textContent = score

        //speed up our snake
        clearInterval(timerId)
        snakeSpeed = snakeSpeed * speed
        timerId = setInterval(move, snakeSpeed)
    }

    // Add styling so we can see it
    squareStack[snake[0]].classList.add('snake')
}


function applePool() {
    do {
        appleIndex = Math.floor(Math.random() * squareStack.length)
    } while (squareStack[appleIndex].classList.contains('snake'))
    squareStack[appleIndex].classList.add('apple')
}

applePool()

// Passing event.keycode parameter as 'e'
function control(e) {
    if (e.keyCode === 39) {
        console.log('right pressed')
        direction = 1
    } else if (e.keyCode === 38) {
        console.log('up pressed')
        direction = -width
    } else if (e.keyCode === 37) {
        console.log('left pressed')
        direction = -1
    } else if (e.keyCode === 40) {
        console.log('down pressed')
        direction = +width
    }
}
document.addEventListener('keyup', control)
button.addEventListener('click', startRestart)

