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
  // const playerA = playerFactory('Rick', 'O')
  // const playerB = playerFactory('Chair Waiter', 'S')

  // Function to randomly select player
  function randomPlayerStart() {
    const num = Math.floor((Math.random() * 2) + 1)
    if (num === 1) {
      return playerA
    } else {
      return playerB
    }
  }

  const players = [
    {
      name: 'Rick',
      marker: 'rick',
      catchphrase: 'Aids'
    },
    {
      name: 'Morty',
      marker: 'morty',
      catchphrase: 'Oh jeez'
    },
    {
      name: 'Summer',
      marker: 'summer',
      catchphrase: "Let's lick tits"
    },
    {
      name: 'Jerry',
      marker: 'jerry',
      catchphrase: 'I think I can crawl through a tube'
    },
    {
      name: 'Ants In My Eyes Johnson',
      marker: 'ants',
      catchphrase: "Everything's black!"
    },
    {
      name: 'Chair Waiter',
      marker: 'chairwaiter',
      catchphrase: 'Aids!'
    },
    {
      name: 'Alan Rails',
      marker: 'alanrails',
      catchphrase: 'I could have just used a ghost train'
    },
    {
      name: 'Einstein Rick',
      marker: 'einstein',
      catchphrase: 'Aids!'
    },
    {
      name: 'Fishhead Rick',
      marker: 'fishheadrick',
      catchphrase: 'Aids!'
    },
    {
      name: 'Fishhead Morty',
      marker: 'fishheadmorty',
      catchphrase: 'Aids!'
    },
    {
      name: 'Baby Legs',
      marker: 'babylegs',
      catchphrase: 'Ooh I learned a valuable lesson here today'
    },
    {
      name: 'Beth',
      marker: 'beth',
      catchphrase: 'Aids!'
    },
    {
      name: 'Amber Heard',
      marker: 'amberturd',
      catchphrase: 'Aids!'
    },
    {
      name: 'Big Morty',
      marker: 'bigmorty',
      catchphrase: 'Ah, Bubblah'
    },
    {
      name: 'Bird Person',
      marker: 'birdperson',
      catchphrase: 'Aids'
    },
    {
      name: 'Blamphs',
      marker: 'plumbus',
      catchphrase: 'Are you using this Fleeb juice'
    },
    {
      name: 'Evil Morty', 
      marker: 'evilmorty',
      catchphrase: 'Aids!'
    },
    {
      name: 'Blim Blam',
      marker: 'blimblam',
      catchphrase: 'Best door ever'
    },
    {
      name: 'Bobby Moynihan',
      marker: 'bobby',
      catchphrase: 'Aids!'
    },
    {
      name: 'Dumb Ass Bug',
      marker: 'dumbassbug',
      catchphrase: "I'm just a dumb-ass bug"
    },
    {
      name: 'Chris',
      marker: 'chris',
      catchphrase: "Peace among worlds"
    },
    {
      name: 'Concerto',
      marker: 'concerto',
      catchphrase: "Peace among worlds"
    },
    {
      name: 'Cool Rick',
      marker: 'coolrick',
      catchphrase: "What can I say? I'm cool Rick"
    },
    {
      name: 'Cop Morty',
      marker: 'copmorty',
      catchphrase: "Nothing's wrong with putting your faith in a Morty."
    },
    {
      name: 'Cousin Nicky',
      marker: 'cousinnicky',
      catchphrase: "I'm walkin' here"
    },
    {
      name: 'Crocubot',
      marker: 'crocubot',
      catchphrase: "You fell into a vat of redundancy"
    },
    {
      name: 'Daron Jefferson',
      marker: 'dale',
      catchphrase: "The cone-nipple people will rule this world"
    },
  ]

  function rando(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  function playerSelect() {
    return players[rando(0, players.length)]
  }


  const playerA = playerSelect()
  let playerB = playerSelect()
  if (playerA === playerB) { playerB = playerSelect() }

  // Decide which player starts game and announce on the DOM
  let activePlayer = randomPlayerStart()
  const initialGreeting = `${activePlayer.name}, you're up first `
  let playerName = document.querySelector('#player-name')
  // playerName.innerText = initialGreeting

  const containerMain = document.querySelector('#bodyWrapper')
  const versusTitle = document.createElement('h3')
  versusTitle.id = 'versusInfo'
  versusTitle.innerText = `It's ${playerA.name} taking on ${playerB.name}`
  containerMain.append(versusTitle)
  
  setTimeout(() => {
    versusTitle.style.display = 'none'
    const test = document.querySelector('#intro')
    const wrapper = document.querySelector('#bodyWrapper')
    test.style.display = 'flex'
    wrapper.style.background = 'rgba(23,45,56,.8)'
    playerName.innerText = initialGreeting
  }, 2000)
  

  // Initial game state
  let remainingCells = 9
  let announceWinner = false
  
  // Winning conditions
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
    winningCombinations.forEach((item) => {
      if(gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker) {
        this.announceWinner = true
        const subHead = document.querySelector('#subHead')
        subHead.innerText = `${this.activePlayer.catchphrase}! ${this.activePlayer.name} wins!`
        muteBoard()
        resetGame()
      }
    })
  }

  function alertNextPlayer() {
    this.activePlayer === playerA ? playerName.innerText = playerB.name : playerName.innerText = playerA.name
  }

  function nextPlayer() {
    this.activePlayer === playerA ? this.activePlayer = playerB : this.activePlayer = playerA
  }

  function tieGame() {
    const subHead = document.querySelector('#subHead')
    subHead.innerText = 'Tie game!'
    resetGame()
  }

  function muteBoard() {
    const cells = document.querySelector('#gameBoard')
    Array.from(cells.children).forEach((cell) => {
      cell.style.pointerEvents = 'none'
    })
  }

  function resetGame() {
    const resetButton = document.createElement('button')
    const container = document.querySelector('#bodyWrapper')
    const gameboard = document.querySelector('#gameBoard')
    gameboard.style.opacity = '.7'

    resetButton.id = 'reset'
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

