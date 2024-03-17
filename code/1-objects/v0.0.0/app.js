const { Console } = require(`console-mpds`);
const console = new Console();

initConnect4View().play();

function initConnect4View() {
  return {
    play: function () {
      const continueDialogView = initYesNoDialogView("Do you want to play another game?");
      const boardView = initBoardView();
      do {
        console.writeln(`\n\n------------ CONNECT4 ------------\n\n`);
        boardView.show();
        let columnNumber = boardView.readColumnToInsertPiece();
        continueDialogView.read();
      } while (continueDialogView.isAffirmative());
    },
  };
}

function initYesNoDialogView(question) {
  let answer;

  function isNegative() {
    return answer === `no`;
  }

  return {
    read: function () {
      let error;
      do {
        answer = console.readString(question);
        error = !this.isAffirmative() && !isNegative();
        if (error) {
          console.writeln(`Please, answer "yes" or "no"`);
        }
      } while (error);
    },
    isAffirmative: function () {
      return answer === `yes`;
    },
  };
}

function initBoardView() {
  const board = initBoard();

  function showTurn() {
    console.writeln(`Turno: Jugador ${board.getPlayer()} - ${board.getPlayerColor()}`);
  }

  function showSquares() {
    for (let i = 0; i < board.getSquares().length; i++) {
      for (let j = 0; j < board.getSquares()[0].length; j++) {
        console.write(` | ${board.getSquares()[i][j]}`);
      }
      console.writeln(` | \n -----------------------------`);
    }
  }

  return {
    show: function () {
      console.writeln(`*****************`);
      showTurn();
      showSquares();
    },
    readColumnToInsertPiece: function () {
      const columnNumber = console.readNumber(`Selecciona la columna para insertar ficha: `);
      console.writeln(columnNumber);
    },
  };
}

function initBoard() {
  let squares = [
    ["_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_", "_"],
  ];

  return {
    getSquares: function () {
      return squares;
    },
    getPlayer: function () {},
    getPlayerColor: function () {},
  };
}

function initPlayer() {}
