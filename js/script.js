var word, blank, array;
var words = ['panchonchanch', 'pendertuga', 'deburrrah', 'ae86'];
var lives = 7;

function getFocus() {
  document.getElementById("textBox").focus();
}

function addUnderscores() {
  for (var i = 0; i < word.length; i++) {
    blank.push("_ ");
  }
}

function isDone(a) {
  for (var i = 0; i < blank.length; i++) {
    if (blank[i] == "_ ") {
      return false;
    }
  }
  return true;
}

function reset() {
  $("#hangman img").replaceWith("<img src='images/hang1.png'>")
  $("#textBox").val('');
  restart();
  console.log(word);
  $("#result").html("");
  $("#correctWord").html("");
  lives = 7;
}

function restart() {
  word = words[Math.floor(Math.random()*words.length)];
  array = [];
  blank = [];
  addUnderscores();
  $("#word").html(blank.join("").toString());
  $("#previousGuesses").html(array.toString());
  document.getElementById('reset').style.visibility = 'hidden';
}
restart();

function guess() {
  getFocus();
  let letter = $("input[name=textBox]").val();

  if (word.includes(letter)) {
    for (var i = 0; i < word.length; i++) {
      if (word.charAt(i) == letter) {
        blank[i] = letter;
      }
    }
    array.push(letter);
  } else {
    if (!array.includes(letter)) {
      array.push(letter);
    }
    lives = lives - 1;
    if (lives == 6) {
      $("#hangman img").replaceWith("<img src='images/hang2.png'>")
    } else if (lives == 5) {
      $("#hangman img").replaceWith("<img src='images/hang3.png'>")
    } else if (lives == 4) {
      $("#hangman img").replaceWith("<img src='images/hang4.png'>")
    } else if (lives == 3) {
      $("#hangman img").replaceWith("<img src='images/hang5.png'>")
    } else if (lives == 2) {
      $("#hangman img").replaceWith("<img src='images/hang6.png'>")
    } else if (lives == 1) {
      $("#hangman img").replaceWith("<img src='images/hang7.png'>")
    } else {
      $("#hangman img").replaceWith("<img src='images/hang8.png'>")
    }
  } 
  $("#word").html(blank.join("").toString());
  $("#previousGuesses").html("Previous Guesses: " + array.toString());

  if (lives == 0) {
    document.getElementById('reset').style.visibility = 'visible';
    $("#result").html("Game Over");
    $("#result").css("color", "red");
    $("#correctWord").html("The answer was: ");
    $("#word").html(word);
  }

  if (isDone(blank)) {
    $("#hangman img").replaceWith("<img src='images/confetti-small.png'>")
    document.getElementById('reset').style.visibility = 'visible';
    $("#result").html("You Won!");
    $("#result").css("color", "#13CFB8");
  }
}