// All cards in an array
let cards = ['fa-diamond','fa-diamond', 'fa-paper-plane-o','fa-paper-plane-o', 
 'fa-anchor','fa-anchor', 'fa-bolt', 'fa-bolt','fa-cube', 'fa-cube', 'fa-leaf','fa-leaf', 
 'fa-bicycle', 'fa-bicycle','fa-bomb','fa-bomb'];

// Variable declarations
let flippedCards;
let matchedCards;
var moves;
let allowed;

//Modal source: https://www.w3schools.com/howto/howto_css_modals.asp
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that starts the game again and resets the whole board
var btn = document.getElementById("play-again");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

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
  updateMoves();
  
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
  // console.log(moves)
  if((moves/2) % 1 === 0 ){
  	$('.moves').text(moves/2);		
    }  
  
}

// Moves counter
function counter() {
    updateMoves();
    if(moves == 1){
        
        startTimer();
    }
    if (moves > 40 && moves <= 60) {
        starRating(1);
    }  
    if (moves > 60 && moves <= 80)  {
        starRating(2);
    }  
    if (moves > 80) {
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
        moves++;
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
  
    // Showing a modal on completing the game
    if (matchedCards === 8) {
    let winningMoves = moves/2;
    clearInterval(interval);
    setTimeout(function() {  //Modal shows total moves, time taken and star rating
        modal.style.display = "block";
        document.getElementById('winning').textContent = `It took you ${winningMoves} moves to finish the game!`;
        //if winningMoves < = 20, show 3 stars
        if(winningMoves <= 20) 
        {
            document.getElementById('winning2').innerHTML = "Stars you have earned <i class='fa fa-star'><i class='fa fa-star'><i class='fa fa-star'>";    
        }
        //if winningMoves > 20 && < = 30, show 2 stars
        if ((winningMoves > 20) && (winningMoves <= 30)) 
        {
            document.getElementById('winning2').innerHTML = "Stars you have earned <i class='fa fa-star'><i class='fa fa-star'>";
        }
        //if winningMoves > 30 && < = 40, show 1 star
        if ((winningMoves > 30) && (winningMoves <= 40))
        {
            document.getElementById('winning2').innerHTML = "Stars you have earned <i class='fa fa-star'>";
        }
        //if winningMoves > 40, show 0 stars, display message, you didn't earn any stars :D
        if (winningMoves > 40)
        {
            document.getElementById('winning2').innerHTML = "OMG! You have earned zero stars :'(";
        }
        document.getElementById('winning3').textContent = `Your total time was ${timer.innerHTML} :)`;

           //Play again button restarts the game and removes the modal
            btn.onclick = function() {
            modal.style.display = "none";
            startGame();
            }
            
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
            modal.style.display = "none";
            }       

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            }
    }, 1000);
   
    }    
});

$('.restart').on('click', function() {
   startGame();
});

startGame();