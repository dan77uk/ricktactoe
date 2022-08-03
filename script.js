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