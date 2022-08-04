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
        const playerImage = document.createElement('img')
        playerImage.src = gameplayManagement.activePlayer.image
        playerImage.alt = `An avatar of ${gameplayManagement.activePlayer.name}`
        cell.append(playerImage)
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

  // Function to randomly select player
  function randomPlayerStart() {
    const num = Math.floor((Math.random() * 2) + 1)
    if (num === 1) {
      return playerA
    } else {
      return playerB
    }
  }

  let players = [
    {
      id: 1,
      name: 'Rick',
      marker: 'rick',
      catchphrase: 'Aids',
      image: 'images/rick.jpeg' 
    },
    {
      id: 2,
      name: 'Morty',
      marker: 'morty',
      catchphrase: 'Oh jeez',
      image: 'images/morty.png'
    },
    {
      id: 3,
      name: 'Summer',
      marker: 'summer',
      catchphrase: "Let's lick tits",
      image: 'images/summer.jpeg'
    },
    {
      id: 4,
      name: 'Jerry',
      marker: 'jerry',
      catchphrase: 'I think I can crawl through a tube',
      image: 'images/jerry.png'
    },
    {
      id: 5,
      name: 'Ants In My Eyes Johnson',
      marker: 'ants',
      catchphrase: "Everything's black!",
      image: 'images/antsinmyeyes.jpeg'
    },
    // {
    //   name: 'Chair Waiter',
    //   marker: 'chairwaiter',
    //   catchphrase: 'Aids!'
    // },
    // {
    //   name: 'Alan Rails',
    //   marker: 'alanrails',
    //   catchphrase: 'I could have just used a ghost train'
    // },
    // {
    //   name: 'Einstein Rick',
    //   marker: 'einstein',
    //   catchphrase: 'Aids!'
    // },
    // {
    //   name: 'Fishhead Rick',
    //   marker: 'fishheadrick',
    //   catchphrase: 'Aids!'
    // },
    // {
    //   name: 'Fishhead Morty',
    //   marker: 'fishheadmorty',
    //   catchphrase: 'Aids!'
    // },
    // {
    //   name: 'Baby Legs',
    //   marker: 'babylegs',
    //   catchphrase: 'Ooh I learned a valuable lesson here today'
    // },
    // {
    //   name: 'Beth',
    //   marker: 'beth',
    //   catchphrase: 'Aids!'
    // },
    // {
    //   name: 'Amber Heard',
    //   marker: 'amberturd',
    //   catchphrase: 'Aids!'
    // },
    // {
    //   name: 'Big Morty',
    //   marker: 'bigmorty',
    //   catchphrase: 'Ah, Bubblah'
    // },
    // {
    //   name: 'Bird Person',
    //   marker: 'birdperson',
    //   catchphrase: "Don't be gross Tammy"
    // },
    // {
    //   name: 'Blamphs',
    //   marker: 'plumbus',
    //   catchphrase: 'Are you using this Fleeb juice'
    // },
    // {
    //   name: 'Evil Morty', 
    //   marker: 'evilmorty',
    //   catchphrase: 'This seems like a good time for a drink, and a cold, calculated speech with sinister overtones'
    // },
    // {
    //   name: 'Blim Blam',
    //   marker: 'blimblam',
    //   catchphrase: 'Best door ever'
    // },
    // {
    //   name: 'Bobby Moynihan',
    //   marker: 'bobby',
    //   catchphrase: 'Aids!'
    // },
    // {
    //   name: 'Dumb Ass Bug',
    //   marker: 'dumbassbug',
    //   catchphrase: "I'm just a dumb-ass bug"
    // },
    // {
    //   name: 'Chris',
    //   marker: 'chris',
    //   catchphrase: "Peace among worlds"
    // },
    // {
    //   name: 'Concerto',
    //   marker: 'concerto',
    //   catchphrase: "Peace among worlds"
    // },
    // {
    //   name: 'Cool Rick',
    //   marker: 'coolrick',
    //   catchphrase: "What can I say? I'm cool Rick"
    // },
    // {
    //   name: 'Cop Morty',
    //   marker: 'copmorty',
    //   catchphrase: "Nothing's wrong with putting your faith in a Morty."
    // },
    // {
    //   name: 'Cousin Nicky',
    //   marker: 'cousinnicky',
    //   catchphrase: "I'm walkin' here"
    // },
    // {
    //   name: 'Crocubot',
    //   marker: 'crocubot',
    //   catchphrase: "You fell into a vat of redundancy"
    // },
    // {
    //   name: 'Daron Jefferson',
    //   marker: 'daron',
    //   catchphrase: "The cone-nipple people will rule this world"
    // },
  ]

  function rando(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
  }

  function playerSelect() {
    const player = players[rando(0, players.length)]
    const index = players.findIndex((ele => ele.id === player.id))
    players.splice(index, 1)
    return player
  }

  const playerA = playerSelect()
  const playerB = playerSelect()


  // Decide which player starts game and announce on the DOM
  const activePlayer = randomPlayerStart()

  // Required selecters
  const wrapper = document.querySelector('#bodyWrapper')
  const playerName = document.querySelector('#player-name')

  const banner = document.createElement('div')
  const bannerText = document.createElement('h3')
  banner.append(bannerText)
  banner.id = 'banner'

  const test = document.querySelector('#intro')
  const subHead = document.querySelector('#subHead')
  const gameboard = document.querySelector('#gameBoard')

  // Announce game players
  bannerText.innerText = `It's ${playerA.name} taking on ${playerB.name}`
  wrapper.append(banner)
  
  setTimeout(() => {
    banner.style.display = 'none'
    test.style.display = 'flex'
    wrapper.style.background = 'rgba(23,45,56,.8)'
    playerName.innerText = `${activePlayer.name}, you're up first `
  }, 4000)
  
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
        announceWinningPlayer(this.activePlayer)
      }
    })
  }

  function announceWinningPlayer (player) {
    muteBoard()
    resetGame()
    subHead.style.display = 'none'
    banner.style.display = 'flex'
    bannerText.innerText = `${player.catchphrase}! ${player.name} wins!`
    wrapper.append(banner)
  }

  function alertNextPlayer() {
    this.activePlayer === playerA ? playerName.innerText = playerB.name : playerName.innerText = playerA.name
  }

  function nextPlayer() {
    this.activePlayer === playerA ? this.activePlayer = playerB : this.activePlayer = playerA
  }

  function tieGame() {
    subHead.style.display = 'none'
    banner.style.display = 'flex'
    banner.innerText = 'Tie game!'
    wrapper.append(banner)
    resetGame()
  }

  function muteBoard() {
    Array.from(gameboard.children).forEach((cell) => {
      cell.style.pointerEvents = 'none'
    })
  }

  function resetGame() {
    const resetButton = document.createElement('button')
    gameboard.style.opacity = '.7'
    resetButton.id = 'reset'
    resetButton.textContent = 'Play Again?'
    banner.append(resetButton)
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

