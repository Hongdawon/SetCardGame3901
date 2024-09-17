class Card {
  constructor(number, color, fill, shape) {
    this.number = number;
    this.color = color;
    this.fill = fill;
    this.shape = shape;
  }

  imgname() {
    return this.number + this.color + this.fill + this.shape;
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

//printing the cards to console
let j = 1;
cards.forEach((card) => {
  console.log(j + " " + card.imgname());
  j++;
});

// Helper function to check if an attribute forms a valid set 
function sameOrDifferent(attr1, attr2, attr3){
  return (attr1 === attr2 && attr2 === attr3) || (attr1 !== attr2 && attr1 !== attr3 && attr2 !== attr3);
}

// Combines these checks for all four attributes. 
// If all attributes either match or are different in this way, the three cards form a valid set.
function isSet(card1, card2, card3){
  return (
    sameOrDifferent(card1.number, card2.number, card3.number) && 
    sameOrDifferent(card1.color, card2.color, card3.color) &&
    sameOrDifferent(card1.fill, card2.fill, card3.fill) &&
    sameOrDifferent(card1.shape, card2.shape, card3.shape)


  );
}

let timeRemaining = 60;
let timerInterval;

// Timer Implementation 
function startTimer(){
  timerInterval = setInterval(() => {
    if(timeRemaining > 0){
      timeRemaining--;
      // May need to be altered when HTML is added 
      console.log('Time Remaining: ${timeRemaining} seconds');

    }else{
      // Stops Timer 
      clearInterval(timerInterval);
      // // May need to be altered when HTML is added 
      console.log("Time's up! Round over.");

    }
  },1000);

}

// Starts the timer
startTimer(); 

let score = 0;
// Score Implementation 
function updateScore(points){
  score += points;
  // May need to be altered when HTML is added 
  console.log('Score: $ {score}');

}


let visibleCards = [];

// Function to deal cards for initial 12 cards

function dealCards(){
  for(let i = 0; i < 12; i++){
    visibleCards.forEach(cards.pop());
  }
  console.log("Dealt Initial cards: ");
  visibleCards.forEach((card,index) => console.log('${index + 1}: ${card.imgname()}'));

}

// Function to replace the identified set with new cards

function replaceCards(card1, card2, card3){
  // Remove the three cards that form a valid set from visiblecards
  visibleCards = visibleCards.filter(card => card !== card1 && card !== card2 && card !== card3);

  // Add three new cards from the deck if available
  for(let i = 0; i < 3; i++){
    if(cards.length > 0){
      visibleCards.push(cards.pop());
    }
  }

  console.log("New cards dealt after set identified: ");
  visibleCards.forEach((card,index) => console.log('${index + 1}: ${card.imgname()}'));

}

// Checks if selected cards form a set and updates the score 
function checkAndUpdate(card1,card2,card3){
  if (isSet(card1,card2,card3)){
    updateScore(1);
    console.log("Correct set! Score increased. ");
    replaceCards(card1,card2,card3);

  }else{
    updateScore(-1);
    console.log("Incorrect set. Score decreased. ");
  }
}

// starting the game by dealing the initial cards
dealCards();
