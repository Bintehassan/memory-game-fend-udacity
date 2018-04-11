// All cards in an array
let cards = ['fa-diamond','fa-diamond', 'fa-paper-plane-o','fa-paper-plane-o', 
 'fa-anchor','fa-anchor', 'fa-bolt', 'fa-bolt','fa-cube', 'fa-cube', 'fa-leaf','fa-leaf', 
 'fa-bicycle', 'fa-bicycle','fa-bomb','fa-bomb'];

// Variable declarations
let flippedCards;
let matchedCards;
let moves;
let allowed;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1; 
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Game initialising function
function startGame() {
  flippedCards = [];
  matchedCards = 0;
  moves = 0;
  allowed = true;
  
  // Removing all children and content of deck
  $('.deck').children().remove();

  // Shuffle cards and loop through each card to add its HTML to page
  shuffle(cards);
  for(const card of cards) {
    $('.deck').append(`<li class="card"><i class="fa ${card} "></i></li>`);
  }
  
  // Resetting Star Rating
  starRating(0);

  // Resetting timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

function updateMoves () {
  console.log(moves)
  $('.moves').text(moves);
}

// Moves counter
function counter() {
    moves++;
    if(moves == 1){
        updateMoves();
        startTimer();
    }
    if (moves > 20 && moves <= 30) {
        starRating(1);
    }  
    if (moves > 30 && moves <= 40)  {
        starRating(2);
    }  
    if (moves > 40) {
        starRating(3);
    }  
}

// Stars decrease with the increasing number of moves
function starRating(x) {
    let starArray = $('.stars li').children().toArray()
    $(starArray).attr('class', 'fa fa-star');
    while (x > 0) {
      $(starArray.pop()).attr('class', 'fa fa-star-o')
      x = x - 1;
    }
}

// Game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" mins "+second+" secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

// Click-on-card functionality
$(".deck").on('click','.card', function() 
{ 
  if (allowed === false) {
    return false;
  }
  
  // Disable clicking on more than two unmatched cards or cards with 'match' class
  if ((flippedCards.length < 2) && (! $(this).hasClass('open show')) && (! $(this).hasClass('match'))) 
  {
    // Changing star panel due to number of moves    
    counter();

    // Show card on click
    $(this).addClass('open show');
    flippedCards.push(this);
  }
  
  // Matching cards
  if (flippedCards.length === 2) {
    if ($(flippedCards[0]).children().attr('class') === $(flippedCards[1]).children().attr('class')) 
    {
      $(flippedCards).addClass('match');
      matchedCards++;
    }
    allowed = false
    setTimeout(function() {
      $(flippedCards).removeClass('open show');
      flippedCards = [];
      allowed = true;
    }, 500)  
  }
  
// Showing a popup on completing the game
  if (matchedCards === 8) {
      setTimeout(function() {
          alert(`Woohoo! You completed the game with  ${moves}  moves, in ${timer.innerHTML}`);
      }, 1000) 
  }
});


$('.restart').on('click', function() {
   startGame();
});

startGame();