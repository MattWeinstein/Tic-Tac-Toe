let board 
let turn 

let playerOneName
let playerTwoName
let playerOne
let domLocation = document.querySelector('h3')
let blocks = document.querySelectorAll('.block')

document.querySelector('#start').addEventListener('click',checkIfValue)

function checkIfValue(){
  playerOneName = document.querySelector('#playerOneInput').value
  playerTwoName = document.querySelector('#playerTwoInput').value
  playerOneName && playerTwoName? startGame():alert('Please enter player names')

}

function startGame(){
  playerOne = true
  blocks.forEach(element=>element.addEventListener('click',updateBoard));
  blocks.forEach(element => element.innerText='')
  domLocation.innerText=`It is ${playerOneName}s Turn`;
  board = ['0', '1', '2', '3', '4', '5', '6', '7', '8']
  turn = 1  
}

// function UpdateBoard changes the DOM tic tac toe board and runs the update player function
function updateBoard(ev){
  turn++
  if(playerOne){
    board[ev.target.id[6]]='X'
 document.querySelector(`#${ev.target.id}`).innerText = 'X'; document.querySelector(`#${ev.target.id}`).removeEventListener('click',updateBoard)
  } else{
    board[ev.target.id[6]]='O'
    document.querySelector(`#${ev.target.id}`).innerText = 'O';  document.querySelector(`#${ev.target.id}`).removeEventListener('click',updateBoard)
  }

  updatePlayer()
}


function checkIfTie(){
    if(turn == 10){
    domLocation.innerText=`It is a tie!`
    return true
    }
}
//Update player function switches between players 1 and 2, checks if there is a winner, and inserts it into the DOM
function updatePlayer(){
  if(!isThereAWinner() && !checkIfTie()){
    playerOne = playerOne ? false : true
    if(playerOne){
      domLocation.innerText=`It is ${playerOneName}s Turn`
    } else{
    domLocation.innerText=`It is ${playerTwoName}s Turn`
    }
    } else{ 
    if(isThereAWinner()==='X'){
      domLocation.innerText=`${playerOneName} is the winner!`
    } else if(isThereAWinner()==='O'){
      domLocation.innerText=`${playerTwoName} is the winner!`
    }  blocks.forEach(element=>element.removeEventListener('click',updateBoard))
 addNewGameButton()
}
}

function addNewGameButton(){
  let newButton = document.createElement('button')
  newButton.setAttribute('id','startOver')
  newButton.innerText='Play New Game'
  domLocation.appendChild(newButton)
  document.querySelector('#startOver').addEventListener('click',startGame)
}


function isThereAWinner(){
  a1 = board[0]
  a2 = board[1]
  a3 = board[2]
  b1 = board[3]
  b2 = board[4]
  b3 = board[5]
  c1 = board[6]
  c2 = board[7]
  c3 = board[8]
  
  // Horizontal winners
  if(a1===a2 && a2===a3){
    return a1
  } else if(b1===b2 && b2===b3){
    return b1
  }else if(c1===c2 && c2===c3){
    return c1
  }
  // Diagonal winners
  if(a1===b2&&b2===c3){
    return a1
  }else if(a3===b2&&b2===c1){
    return a3
  }
  //Vertical winners
  if(a1===b1&& b1===c1){
    return a1
  } else if(a2===b2&&b2===c2){
    return a2
  } else if(a3===b3&&b3===c3){
    return a3
  }
  return false
}