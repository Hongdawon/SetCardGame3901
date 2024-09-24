class Card {
  constructor(number, color, fill, shape) {
    this.number = number;
    this.color = color;
    this.fill = fill;
    this.shape = shape;
  }

  imgname() {
    return this.number + this.fill + this.color + this.shape;
  }
}

const colors = ["red", "green", "purple"];
const shapes = ["oval", "diamond", "squiggle"];
const fills = ["empty", "shaded", "solid"];

let cards = []; //stores the 81 cards used for gameplay

for (let i = 1; i < 4; i++) {
  colors.forEach((color) => {
    shapes.forEach((shape) => {
      fills.forEach((fill) => {
        cards.push(new Card(i, color, fill, shape));
      });
    });
  });
}

//Durstenfeld Shuffle algorithm from
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (var i = array.length - 1; i >= 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

shuffleArray(cards);

// Helper function to check if an attribute forms a valid set
function sameOrDifferent(attr1, attr2, attr3) {
  return (
    (attr1 === attr2 && attr2 === attr3) ||
    (attr1 !== attr2 && attr1 !== attr3 && attr2 !== attr3)
  );
}

// Combines these checks for all four attributes.
// If all attributes either match or are different in this way, the three cards form a valid set.
function isSet(card1, card2, card3) {
  return (
    sameOrDifferent(card1.number, card2.number, card3.number) &&
    sameOrDifferent(card1.color, card2.color, card3.color) &&
    sameOrDifferent(card1.fill, card2.fill, card3.fill) &&
    sameOrDifferent(card1.shape, card2.shape, card3.shape)
  );
}

let timeRemaining = 5;
let timerInterval;
const tickSound = document.getElementById("tickSound");
let roundInProgress = false;
let roundCount = 0;

// Timer Implementation updated
function startTimer() {
  let roundInProgress = true;
  timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      document.getElementById("timerDisplay").innerHTML = timeRemaining;
      // play the tick sound
      tickSound.play();
    } else {
      // Stops Timer
      clearInterval(timerInterval);
      document.getElementById("timerDisplay").innerHTML = "Time's up!";
      console.log("Time's up! Round over.");

      roundInProgress = false; // Mark round as complete
      timeRemaining = 5; // Reset timer

      roundCount++;
      if (roundCount < 3) {
        startNextRound(); // Start the next round if less than 3 rounds
      }
    }
  }, 1000);
}

// Starts the timer

let score = 0;
// Score Implementation
function updateScore(points) {
  score += points;
  // May need to be altered when HTML is added
  console.log("Score: $ {score}");
}

let visibleCards = [];
let selectedCards = [];

let player1turn = true;
let player1score = 0;
let player2score = 0;

// Function to deal cards for initial 12 cards
function dealCards() {
  for (let i = 0; i < 12; i++) {
    var card = cards.pop();
    visibleCards.push(card);
    document.getElementById("card-" + i).innerHTML =
      `
      <img class="card-img" src="../img/` +
      card.imgname() +
      `.png" />`;
  }
}

//Function to handle card click
function selectCard(cardNum) {
  //DESELECT
  if (selectedCards.includes(cardNum)) {
    selectedCards.splice(selectedCards.indexOf(cardNum), 1);
    document.getElementById("card-" + cardNum).classList = "grid-item";
  }
  //SELECT
  else {
    //add select class to selected card and add card number to array
    document.getElementById("card-" + cardNum).classList =
      "grid-item selected-item";
    selectedCards.push(cardNum);

    //remove oldest card and select class if needed
    if (selectedCards.length > 3) {
      var oldCard = selectedCards.shift();
      document.getElementById("card-" + oldCard).classList = "grid-item";
    }
  }
}

// Function to replace the identified set with new cards
function replaceCards() {
  // Remove old cards and add three new cards from the deck if available
  for (let i = 0; i < 3; i++) {
    if (cards.length > 0) {
      var newCard = cards.pop();
      var index = selectedCards[i];
      //put images on page
      document.getElementById("card-" + index).innerHTML =
        `
      <img class="card-img" src="../img/` +
        newCard.imgname() +
        `.png" />`;
      //remove old card from visible cards and add new at same index
      visibleCards.splice(selectedCards[i], 1, newCard);
      //remove select class
      document.getElementById("card-" + index).classList = "grid-item";
    }
  }
  selectedCards = [];

  console.log("New cards dealt after set identified: ");
  visibleCards.forEach((card, index) =>
    console.log(`${index + 1}: ${card.imgname()}`)
  );
}

// Checks if selected cards form a set and updates the score
function checkAndUpdate() {
  if (
    selectedCards.length == 3 &&
    isSet(
      visibleCards[selectedCards[0]],
      visibleCards[selectedCards[1]],
      visibleCards[selectedCards[2]]
    )
  ) {
    updateScore(1);
    console.log("Correct set! Score increased. ");
    replaceCards();
  } else {
    updateScore(-1);
    console.log("Incorrect set. Score decreased. ");
  }
}

// Generates a hint by finding a valid set
function generateHint() {
  for (let i = 0; i < visibleCards.length - 2; i++) {
    for (let j = i + 1; j < visibleCards.length - 1; j++) {
      for (let k = j + 1; k < visibleCards.length; k++) {
        if (i != j && j != k && i != k) {
          let card1 = visibleCards[i];
          let card2 = visibleCards[j];
          let card3 = visibleCards[k];

          //Check if the three cards form a valid set
          if (isSet(card1, card2, card3)) {
            console.log("Hint: One card involved in a set is card " + (i + 1));
            // Highlight the first card in the valid set as a hint
            document
              .getElementById("card-" + i)
              .classList.add("hint-highlight");

            document
              .getElementById("card-" + j)
              .classList.add("hint-highlight");

            document
              .getElementById("card-" + k)
              .classList.add("hint-highlight");
            return; // Exit after finding the first valid set
          }
        }
      }
    }
  }
  // If no set is found, log the information
  console.log("No valid sets found. ");
}

// Event listener for the hint button
document.getElementById("hint-button").addEventListener("click", generateHint);

function startGame() {
  var player1Name = document.getElementById("player1").value;
  var player2Name = document.getElementById("player2").value;
  if (player1Name.length == 0) {
    player1Name = "Player 1";
  }
  if (player2Name.length == 0) {
    player2Name = "Player 2";
  }
  document.getElementById("start-page").classList = "d-none";
  document.getElementById("game").classList = "";

  roundCount = 0; // Reset round count
  startNextRound(); // Start the first round
}

// Helper to start the next round
function startNextRound() {
  if (!roundInProgress) {
    console.log(`Starting round ${roundCount + 1}`);
    startTimer();
  }
}

// starting the game by dealing the initial cards
dealCards();
