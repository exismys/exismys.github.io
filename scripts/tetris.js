document.addEventListener('DOMContentLoaded', ()=>{
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button');
    const leftButton = document.querySelector('#left-button');
    const rightButton = document.querySelector('#right-button');
    const upButton = document.querySelector('#up-button');
    const width = 10;
    let nextRandom = 0;
    let timerId;
    let score = 0;

    const color = ['red', 'orange', 'green', 'blue', 'purple'];

 //The Tetrominoes
 const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1]
  ]

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1]
  ]

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]
  let currentPosition = 4;
  let currentRotation = 0;
  let random = Math.floor(Math.random()*theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];

  //draw the first rotation in the first tetromino
  function draw(){
      current.forEach(index => {
          squares[currentPosition + index].classList.add('tetromino')
          squares[currentPosition + index].style.backgroundColor = color[random];
      })
  }
  //draw()

  function undraw(){
      current.forEach(index => {
          squares[currentPosition + index].classList.remove('tetromino')
          squares[currentPosition+index].style.backgroundColor = '';
      })
  }

  //timerId = setInterval(moveDown, 300)

  function control(e){
      if(e.keyCode === 37){
          moveLeft();
      }
      if (e.keyCode === 38){
          rotate();
      }
      if(e.keyCode === 39){
          moveRight();
      }
      if(e.keyCode === 40){
          //speedup
      }
  }


  document.addEventListener('keyup', control);
  leftButton.addEventListener('click', ()=>{
      moveLeft();
  })
  upButton.addEventListener('click', ()=>{
    rotate();
  })
  rightButton.addEventListener('click', ()=>{
    moveRight();
  })

  function moveDown(){
      undraw()
      currentPosition += width
      draw()
      freeze()
  }

  function freeze(){
      if(current.some(index => squares[currentPosition +index + width].classList.contains('taken'))){
          current.forEach(index => squares[currentPosition + index].classList.add('taken'))
          current.forEach(index => squares[index+currentPosition].style.backgroundColor = color[random]);
          //start a new tetromino falling
          random = nextRandom;
          nextRandom = Math.floor(Math.random()*theTetrominoes.length);
          current = theTetrominoes[random][currentRotation];
          currentPosition = 4;
          displayShape();
          addScore();
          gameOver();
      }
  }

  function moveLeft(){
      undraw()
      const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
      if (!isAtLeftEdge){
          currentPosition -= 1
      }
      if (current.some(index => squares[currentPosition+index].classList.contains('taken'))){
          currentPosition += 1;
      }
      draw()
  }

  function moveRight(){
      undraw()
      const isAtRightEdge = current.some(index => (currentPosition+index) % width === width-1);
      if (!isAtRightEdge){
          currentPosition++;
      }
      if (current.some(index => squares[currentPosition+index].classList.contains('taken'))){
          currentPosition--;
      }
      draw()
  }

  function rotate(){
      undraw();
      currentRotation++;
      if (currentRotation === 4){
          currentRotation = 0;
      }
      current = theTetrominoes[random][currentRotation];
      draw();
  }

  //show up tatromino in tiny grid
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4;
  let displayIndex = 0;
  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2], /* lTetromino */
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1], /* zTetromino */
    [1, displayWidth, displayWidth + 1, displayWidth + 2], /* tTetromino */
    [0, 1, displayWidth, displayWidth + 1], /* oTetromino */
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1] /* iTetromino */
  ]

  //display the tetromino in the mini grid display
  function displayShape()
  {
      displaySquares.forEach(square => {
          square.classList.remove('tetromino');
          square.style.backgroundColor = '';
          //display.width(index = 10*2).filesystem.
      })
      upNextTetrominoes[nextRandom].forEach(index => {
          displaySquares[displayIndex + index].classList.add('tetromino');
          displaySquares[displayIndex + index].style.backgroundColor = color[nextRandom];
      })
  }

  //button functionality
  startBtn.addEventListener('click', () => {
      if(timerId){
          clearInterval(timerId);
          timerId = null;
      } else{
          draw()
          nextRandom = Math.floor(Math.random()*theTetrominoes.length);
          timerId = setInterval(moveDown, 500);
          displayShape();
      }
  })

  //add score
  function addScore(){
      for (let i = 0; i <= 199; i += width){
          const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
          if(row.every(cell => squares[cell].classList.contains('taken'))){
              score += 10;
              scoreDisplay.innerHTML = score;
              row.forEach(index => squares[index].classList.remove('taken'));
              row.forEach(index => squares[index].classList.remove('tetromino'));
              row.forEach(index => squares[index].style.backgroundColor = '');
              const removedSquared = squares.splice(i, width);
              squares = removedSquared.concat(squares);
              squares.forEach(cell => grid.appendChild(cell));

          }
      }
  }

  function gameOver()
  {
      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
          scoreDisplay.innerHTML = 'end';
          clearInterval(timerId);
      }
  }
})