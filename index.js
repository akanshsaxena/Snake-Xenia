const container = document.getElementsByClassName('container');
const squares = [];
const direction = ["-y", "y", "-x", "+x"];
let ends = [];
let body = [375, 374, 373, 372, 371, 370, 369, 368, 367, 366];
let lastNode
let counter = 1
let createRandomDots
let newRandom
let oldRandom
let score = 0
let futureIndex

const scoreId = document.getElementById('score')
class SnakeEnd{
  constructor(startIndex, currentIndex, currentDirection, path){
    this.startIndex = startIndex;
    this.currentIndex = currentIndex;
    this.currentDirection = currentDirection;
    this.path = [path];
  }
}

ends = [
  new SnakeEnd(376, 376, direction[3], 376),
  new SnakeEnd(365, 365 , direction[3], 365)
];
function addBlocks(){
  startBtn[0].style.display = "none"
  scoreId.textContent = `Score: ${score}`

  // createRandomDots
    for(let i=0 ; i< 784; i++){
      const div = document.createElement('div');

      if(i<ends[0].startIndex+1 && i>ends[1].startIndex-1){
        if(i===ends[0].startIndex){
          div.classList.add('snake-head');
        }
        else if(i===ends[1].startIndex){
          div.classList.add('snake-tail');
        }
        else{
          div.classList.add('snake-body');
        }
      }
      else{
          div.classList.add('base');
      }
      container[0].appendChild(div);
      squares.push(div)
    }

    oldRandom = generateRandom()
    squares[oldRandom].classList.remove('base')
    squares[oldRandom].classList.add('dots')
    createRandomDots = setInterval(function() {
      squares[oldRandom].classList.remove('dots')
      squares[oldRandom].classList.remove('big-dots')
      squares[oldRandom].classList.add('base')
      newRandom = generateRandom()
      oldRandom = newRandom
      if(counter%5==0){
          squares[newRandom].classList.remove('base')
          squares[newRandom].classList.add('big-dots')
      }
      else{
        squares[newRandom].classList.remove('base')
        squares[newRandom].classList.add('dots')
      }
      counter++
    } , 10000)
}


function move(e){
   squares[ends[0].currentIndex].classList.remove('snake-head')
    switch(e.keyCode) {
        case 40:
        console.log('pressed down')
        futureIndex = ends[0].currentIndex+28
        if(!squares[futureIndex].classList.contains('snake-tail') && !squares[futureIndex].classList.contains('snake-body')){
          squares[futureIndex].classList.add('snake-head')
          addBodyPart(futureIndex)
          ends[0].currentIndex = futureIndex
          ends[0].path.push(ends[0].currentIndex)
          console.log(ends[0].path)
          moveBody()
        }
        break
        case 38:
        console.log('pressed up')
        futureIndex = ends[0].currentIndex-28
        if(!squares[futureIndex].classList.contains('snake-tail') && !squares[futureIndex].classList.contains('snake-body')){
          squares[futureIndex].classList.add('snake-head')
          addBodyPart(futureIndex)
          ends[0].currentIndex = futureIndex
          ends[0].path.push(ends[0].currentIndex)
          moveBody()
        }
        break
        case 37:
        console.log('pressed left')
        futureIndex = ends[0].currentIndex-1
        if(!squares[futureIndex].classList.contains('snake-tail') && !squares[futureIndex].classList.contains('snake-body')){
          squares[futureIndex].classList.add('snake-head')
          addBodyPart(futureIndex)
          ends[0].currentIndex = futureIndex
          ends[0].path.push(ends[0].currentIndex)
          moveBody()
        }
        break
        case 39:
        console.log('pressed right')
        futureIndex = ends[0].currentIndex+1
        if(!squares[futureIndex].classList.contains('snake-tail') && !squares[futureIndex].classList.contains('snake-body')){
          squares[futureIndex].classList.add('snake-head')
          addBodyPart(futureIndex)
          ends[0].currentIndex = futureIndex
          ends[0].path.push(ends[0].currentIndex)
          moveBody()
        }
        break
    }
}

function moveBody(path){
  for(let i=0;i<body.length;i++){
    squares[ends[0].path[0+i]].classList.add('snake-body')
    squares[ends[0].path[0]].classList.add('base')
    squares[body[i]].classList.remove('snake-body')
    lastNode = body[i]
    body[i]=ends[0].path[0]
  }
  ends[0].path.shift()
  console.log(ends[1].currentIndex)
  squares[ends[1].currentIndex].classList.remove('snake-tail')
  squares[ends[1].currentIndex].classList.add('base')
  ends[1].currentIndex = lastNode
  squares[ends[1].currentIndex].classList.add('snake-tail')
}

function addBodyPart(futureIndex){
  if(squares[futureIndex].classList.contains('dots')){
    if(body[body.length-1]-ends[1].currentIndex===1 ){
      body.push(body[body.length-1]+1)
      squares[futureIndex].classList.remove('dots')
      squares[futureIndex].classList.add('base')
      score+=5
    }
    else if(ends[1].currentIndex-body[body.length-1]===(-1)){
      body.push(body[body.length-1]-1)
      squares[futureIndex].classList.remove('dots')
      squares[futureIndex].classList.add('base')
      score+=5
    }
    else if(ends[1].currentIndex-body[body.length-1]===28 ){
      body.push(body[body.length-1]+28)
      squares[futureIndex].classList.remove('dots')
      squares[futureIndex].classList.add('base')
      score+=5
    }
    else if(ends[1].currentIndex-body[body.length-1]===(-28) ){
      body.push(body[body.length-1]-28)
      squares[futureIndex].classList.remove('dots')
      squares[futureIndex].classList.add('base')
      score+=5
    }
  }
  else if(squares[futureIndex].classList.contains('big-dots')){
      if(body[body.length-1]-ends[1].currentIndex===1 ){
        body.push(body[body.length-1]+1)
        squares[futureIndex].classList.remove('big-dots')
        squares[futureIndex].classList.add('base')
        score+=10
      }
      else if(ends[1].currentIndex-body[body.length-1]===(-1)){
        body.push(body[body.length-1]-1)
        squares[futureIndex].classList.remove('big-dots')
        squares[futureIndex].classList.add('base')
        score+=10
      }
      else if(ends[1].currentIndex-body[body.length-1]===28 ){
        body.push(body[body.length-1]+28)
        squares[futureIndex].classList.remove('big-dots')
        squares[futureIndex].classList.add('base')
        score+=10
      }
      else if(ends[1].currentIndex-body[body.length-1]===(-28) ){
        body.push(body[body.length-1]-28)
        squares[futureIndex].classList.remove('big-dots')
        squares[futureIndex].classList.add('base')
        score+=10
      }
  }
  scoreId.textContent = `Score: ${score}`
}


function generateRandom(){
  let random = Math.floor(Math.random()*784)
  if(squares[random].classList.contains('base')){
    console.log(random)
    return random
  }
  else{
    generateRandom()
  }
}


document.addEventListener('keyup', move);

let startBtn = document.getElementsByClassName('start')
startBtn[0].addEventListener('click', addBlocks);
