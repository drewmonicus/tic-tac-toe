const initGame = (() => {
  const squares = document.querySelectorAll(".square");
  let turns = 0;
  let playerOneUser, playerTwoUser;
  let currentPlayer;

  function createUser(name, mark) {
    const inputs = [];
    let points = 0;
    const givePoints = () => points++;
    const showPoints = () => points;
    return {
      name,
      mark,
      inputs,
      showPoints,
      givePoints,
    };
  }

  const handleClick = (() => {
    const startButton = document.querySelector(".play-btn");
    const titleScreen = document.querySelector(".title-screen");
    startButton.addEventListener("click", () => {
      titleScreen.style.display = "none";
      initPlayers();
      displayGame();
      currentPlayer = playerOneUser;
      updateCurrentPlayer(currentPlayer);
    });

    squares.forEach((square) => {
      square.addEventListener("click", () => {
        if (square.textContent === "") {
          square.textContent = currentPlayer.mark;
          const squareIndex = parseInt(square.dataset.cell);
          squarePressLog(squareIndex);
          const win = checkWin();
          if (turns === 9) {
            resetGame();
          }
          if (win) {
            turns = 0;
            resetGame();
          } else {
            currentPlayer =
              currentPlayer === playerOneUser ? playerTwoUser : playerOneUser;
            updateCurrentPlayer(currentPlayer);
          }
        }
      });
    });
  })();

  const squarePressLog = (squareCell) => {
    currentPlayer.inputs.push(squareCell);
  };

  const updateCurrentPlayer = (player) => {
    const gameScreen = document.querySelector(".game-screen");
    const currentPlayerInfo = document.querySelector(".current-player-info");

    if (currentPlayerInfo) {
      currentPlayerInfo.remove();
    }

    const nameMark = document.createElement("div");
    nameMark.classList.add("current-player-info");
    if (player.name === "") {
      nameMark.innerHTML = `${player.mark}'s turn (${player.mark})`;
    } else {
      nameMark.innerHTML = `${player.name.toUpperCase()}'s turn (${
        player.mark
      })`;
    }
    gameScreen.prepend(nameMark);
  };

  const displayGame = () => {
    const gameScreen = document.querySelector(".game-screen");
    gameScreen.style.display = "flex";
  };

  const initPlayers = () => {
    const player1Input = document.querySelector("#player1");
    const player2Input = document.querySelector("#player2");

    const player1 = document.querySelector(".player1");
    const player2 = document.querySelector(".player2");

    playerOneUser = createUser(player1Input.value, "X");
    playerTwoUser = createUser(player2Input.value, "O");

    const player1Name = document.createElement("h1");
    player1Name.classList.add("player1Name");
    player1Name.textContent = `${playerOneUser.name.toUpperCase()}`;
    player1.prepend(player1Name);

    const player2Name = document.createElement("h1");
    player2Name.classList.add("player2Name");
    player2Name.textContent = playerTwoUser.name.toUpperCase();
    player2.prepend(player2Name);
  };

  const resetGame = () => {
    playerOneUser.inputs = [];
    playerTwoUser.inputs = [];
    squares.forEach((square) => {
      square.textContent = "";
    });
  };

  const checkWin = () => {
    const player1Score = document.querySelector(".p1Score");
    const player2Score = document.querySelector(".p2Score");
    const winConditions = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    const playerOneInputs = playerOneUser.inputs.slice().sort((a, b) => a - b);
    const playerTwoInputs = playerTwoUser.inputs.slice().sort((a, b) => a - b);

    const isWinningCondition = (playerInputs) => {
      return winConditions.some((condition) =>
        condition.every((index) => playerInputs.includes(index))
      );
    };

    if (isWinningCondition(playerOneInputs)) {
      player1Score.innerHTML = "";
      playerOneUser.givePoints();
      player1Score.innerHTML = `Score: ${playerOneUser.showPoints()}`;
      return true;
    }

    if (isWinningCondition(playerTwoInputs)) {
      player2Score.innerHTML = "";
      playerTwoUser.givePoints();
      player2Score.innerHTML = `Score: ${playerTwoUser.showPoints()}`;
      return true;
    }
    turns++;
    return false;
  };
})();
