const { Console } = require(`console-mpds`);
const console = new Console();

initConnect4View().play();

function initConnect4View() {
  return {
    play: function () {
      const continueDialogView = initYesNoDialogView("Do you want to play another game?");
      //   const boardView = initBoardView();
      do {
        // boardView.start();
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
