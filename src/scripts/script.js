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
