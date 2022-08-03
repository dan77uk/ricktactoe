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
        console.log(cell)
      })
    })

  return {
    board
  }
})()

const gameplayManagement = (() => {

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

})()