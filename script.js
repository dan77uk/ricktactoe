// Create player objects factory function
const playerFactory = (name, marker) => {
  return {
    name,
    marker
  }
}

const gameBoard = (() => { 

  // Create empty array for new game
  let board = Array(9).fill('')

  // Create and display squares on the DOM for each array index
  let cells = document.querySelector("#gameBoard")
  board.forEach(() => {
    const cell = document.createElement("div")
    cell.className = "square"
    cells.appendChild(cell)
  })

  // Add event listeners to each cell/square on board
  Array.from(cells.children)
    .forEach((cell, index) => {
      cell.addEventListener('click', () => {

        // Update DOM board
        cell.classList.add(gameplayManagement.activePlayer.marker)

        // Remove event listener from completed cell/square and reduce remaining available cells
        cell.style.pointerEvents = 'none'
        gameplayManagement.remainingCells -= 1

        // Update board array
        board[index] = gameplayManagement.activePlayer.marker

        // Check if game has a winner | select next player if false, anounce winner if true
        gameplayManagement.checkWinner()

        if(gameplayManagement.announceWinner === false) { // If there is no winner
          if(gameplayManagement.remainingCells > 0) { // If there are still squares to play
            gameplayManagement.alertNextPlayer()
            gameplayManagement.nextPlayer()
          } else if (gameplayManagement.remainingCells < 1) { // If there are no squares left to play, announce tie game
            gameplayManagement.tieGame()
          }
        }
      })
    })

  return { board }
})()

const gameplayManagement = (() => {

  // Create two players
  const rick = playerFactory('Rick', 'O')
  const morty = playerFactory('Morty', 'X')

  function randomPlayerStart() {
    const num = Math.floor((Math.random() * 2) + 1)
    if (num === 1) {
      return rick
    } else {
      return morty
    }
  }

  // Decide which player starts game and announce on the DOM
  let activePlayer = randomPlayerStart()
  const initialGreeting = `${activePlayer.name}, you're up first`
  let playerName = document.querySelector('#player-name')
  playerName.innerText = initialGreeting

  let remainingCells = 9
  let announceWinner = false
  
  const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ]

  function checkWinner() {
    winningCombinations.forEach((item, index) => {
      if(gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker) {
        this.announceWinner = true
        const subHead = document.querySelector('#subHead')
        subHead.innerText = `${this.activePlayer.name} wins!`
        muteBoard()
        resetGame()
      }
    })
  }

  function alertNextPlayer() {
    this.activePlayer === rick ? playerName.innerText = morty.name : playerName.innerText = rick.name
  }

  function nextPlayer() {
    this.activePlayer === rick ? this.activePlayer = morty : this.activePlayer = rick
  }

  function tieGame() {
    const subHead = document.querySelector('#subHead')
    subHead.innerText = 'Tie game!'
  }

  function muteBoard() {
    const cells = document.querySelector('#gameBoard')
    Array.from(cells.children).forEach((cell) => {
      cell.style.pointerEvents = 'none'
    })
  }

  function resetGame() {
    const resetButton = document.createElement('button')
    const container = document.querySelector('#intro')
    resetButton.textContent = 'Play Again?'
    container.append(resetButton)
    resetButton.addEventListener('click', () => {
      window.location.reload(false)
    })
  }

  return {
    activePlayer,
    remainingCells,
    announceWinner,
    alertNextPlayer,
    nextPlayer,
    checkWinner,
    tieGame,
  }
})()

