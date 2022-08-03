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

        // Remove event listener from completed cell/square
        cell.style.pointerEvents = 'none'

        // Update board array
        board[index] = gameplayManagement.activePlayer.marker
      })
    })

  return {
    board
  }
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

  return {
    activePlayer
  }

})()