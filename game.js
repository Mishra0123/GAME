// window.addEventListener('load',init);
// window.addEventListener('load',bulletWidth);
document.body.onkeyup = function(e) {
  if (e.key == " " ||
      e.code == "Space" ||      
      e.keyCode == 32      
  ) {
    init();
  }
}


var words = [
  'hat',
  'river',
  'lucky',
  'statue',
  'generate',
  'stubborn',
  'cocktail',
  'runaway',
  'joke',
  'developer',
  'establishment',
  'hero',
  'javascript',
  'nutrition',
  'revolver',
  'echo',
  'siblings',
  'investigate',
  'horrendous',
  'symptom',
  'laughter',
  'magic',
  'master',
  'space',
  'definition',
  'champion',
  'ghost',
  'fierce'
];


// Globals

// Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
};

// To change level
const currentLevel = levels.medium;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
//const bullet = document.querySelectorAll('#word-input');//element object for input field
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
// const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');
const bullet = document.querySelectorAll('.bullet');//to access the random bullet
const button = document.querySelector('.button');
const impact = document.querySelector("#impact");
const current= document.querySelector("#current-typed");
const reference = document.querySelector(".reference");
const maindiv= document.querySelector(".Main");
let randomIndex;

// //setting bullet width relative to the browser window
// setInterval(bulletWidth,1000);
// function bulletWidth(){
//   bullet[0].style.width = Math.round( window.innerWidth * 1/10)+'px';
//   bullet[1].style.width = Math.round( window.innerWidth * 1/10)+'px';
//   bullet[2].style.width = Math.round( window.innerWidth * 1/10)+'px';
//   bullet[3].style.width = Math.round( window.innerWidth * 1/10)+'px';
//   bullet[4].style.width = Math.round( window.innerWidth * 1/10)+'px';
// }



let checkcord;
let myInterval;
// Initialize Game
function init() {
  scoreDisplay.innerHTML = 0;
//  button.style.visibility="hidden";
  myInterval=setInterval(copy, 60);
  function copy(){
  current.innerHTML=bullet[randomIndex].value;
}
  randomIndex = Math.floor(Math.random() * bullet.length);//chosing random index of bullet
  impact.classList.remove("destroyed")
  // Show number of seconds in UI
  // seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  bullet[randomIndex].focus();
  bullet[randomIndex].addEventListener('input', startMatch);
  // Call countdown every second
  // setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
  // setTimeout(load_more_words(),1000)

  checkcord=setInterval(checkCoordinates,200);
}



function checkCoordinates(){
  refcordinate=reference.getBoundingClientRect();
  cordinate=bullet[randomIndex].getBoundingClientRect();
  console.log(cordinate);
  // score=0;
  if(cordinate.x<refcordinate.x+20)
  {
    bullet[randomIndex].value = '';
    bullet[randomIndex].blur();
    addclass();
    // scoreDisplay.innerHTML = 0;
    score=0;
    clearInterval(myInterval);
    clearInterval(checkcord);
    
  }
}
function addclass(){
  impact.classList.add("destroyed");
}

//condition if matching is succesful// Start match
function startMatch(){
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    bullet[randomIndex].value = '';
    randomIndex = Math.floor(Math.random() * bullet.length);//chosing random index of bullet
    bullet[randomIndex].focus();
    bullet[randomIndex].addEventListener('input', startMatch);
    score++;
  

// sessionStorage is similar to localStorage; 
// the difference is that while data in localStorage doesn't expire, 
// data in sessionStorage is cleared when the page session ends.
  // Highscore based on score value for Session Storage
  if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
    sessionStorage['highscore'] = score;
  } 
  else {
    sessionStorage['highscore'] = sessionStorage['highscore'];
  }
  // Prevent display of High Score: -1
  if (sessionStorage['highscore'] >= 0) {
  highscoreDisplay.innerHTML = sessionStorage['highscore'];
  }
  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}
}

// Match currentWord to bullet
function matchWords() {
  if (bullet[randomIndex].value === currentWord.innerHTML) {
    // message.innerHTML = 'Correct!!!';
    return true;
  } else {
    // message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// // Countdown timer
// function countdown() {
//   // Make sure time is not run out
//   if (time > 0) {
//     // Decrement
//     time--;
//   } else if (time === 0) {
//     // Game is over
//     isPlaying = false;
//   }
//   // Show time
//   timeDisplay.innerHTML = time;
// }

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    // score = -1;
  }
}

maindiv.addEventListener('click',init);

function copy(){
  current.innerHTML=bullet[randomIndex].value;
}


button.addEventListener('click',init);