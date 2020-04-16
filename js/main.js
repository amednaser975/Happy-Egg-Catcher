var theGame = 0,
    gameId = 0,
    container = document.getElementById('container'),
    gameStart = document.getElementById('gameStart'),
    playBtn = document.getElementById('playBtn'),
    gameOver = document.getElementById('gameOver'),
    playAgainBtn = document.getElementById('playAgainBtn'),
    eggCurrentPosition = 0,
    eggtest1 = $('#egg1'),
    eggtest2 = $('#egg2'),
    eggtest3 = $('#egg3'),
    eggs = $('.egg'),
    egg1 = document.getElementById('egg2'),
    egg2 = document.getElementById('egg2'),
    egg3 = document.getElementById('egg3'),
    brokenEgg1 = document.getElementById('brokenEgg1'),
    brokenEgg2 = document.getElementById('brokenEgg2'),
    brokenEgg3 = document.getElementById('brokenEgg3'),
    floor =  $('#floor'),
    speed = 4,
    maxSpeed = 15,
    InitialPostionOfEgg = parseInt(eggs.css('top')),
    brokenEggNumber = 0,
    life = Number(document.getElementById('life').innerHTML),
    score = Number(document.getElementById('score').innerHTML),
    currentScore = Number(document.getElementById('currentScore').innerHTML),
    containerHeight = $('#container').height(),
    basket = $('#basket'),
    basketHeight = basket.height(),
    basketTop = containerHeight - basketHeight,
    playMusic = new Audio("Music/Dndnha.Com.Cairokee.Teer.Bina.Y3am.mp3"),
    scoreMusic = new Audio("Music/score.mp3"),
    gameOverMusic = new Audio("Music/game over.mp3");


// Main Function Running The Game
theGame = function () {
  
  // Playing Music
  playMusic.play();
  playMusicLoop();

  // First Egg
  if (checkEggCrashFloor(eggtest1) || insertEggIntoBasket(eggtest1)) {

    setEggToInitialPosition(eggtest1);
  } else {
    
    dropEggs1(eggtest1);
  }
  // Second Egg
  if (checkEggCrashFloor(eggtest2) || insertEggIntoBasket(eggtest2)) {

    setEggToInitialPosition(eggtest2);
  } else {
    
    dropEggs1(eggtest2);
  }
  // Third Egg
  if (checkEggCrashFloor(eggtest3) || insertEggIntoBasket(eggtest3)) {

    setEggToInitialPosition(eggtest3);
  } else {
    
    dropEggs1(eggtest3);
  }

  if (life > 0)
  {
    gameId = requestAnimationFrame(theGame); //Recursion
    //gameId = setInterval(theGame, 100);
  } else {

    cancelAnimationFrame(gameId); // Stop The Game
    //clearInterval(theGame);
    gameOver.classList.add('d-block'); // Show Game Over Box
    container.style.display = 'none'; // Hide The Game Components
    playMusic.pause(); // Stop Game Music
    gameOverMusic.play(); // Play Game Over Music
  }
};

// Music During Playing Game Function
function playMusicLoop()
{
  playMusic.loop = true;
}

// Start The Game By Clicking on Play Button
function runGame ()
{
  gameStart.style.display = 'none';
  game_id = requestAnimationFrame(theGame);
}
playBtn.addEventListener('click', runGame);

//Start The Game again By Clicking on Play Again Button
playAgainBtn.addEventListener('click', function ()
{
  location.reload();
});



// Move Basket with Mouse
document.body.addEventListener('mousemove', function(e) {

  //basket.style.left = String(e.clientX) + 'px';
  basket.css('left', e.clientX);
});

// Moving Eggs Down
function dropEggs1(egg)
{
  eggCurrentPosition = parseInt(egg.css('top')) + speed;
  egg.css('top', eggCurrentPosition);
  //egg.style.top = String(eggCurrentPosition) + 'px';
}

// Collision Function => Checking if 2 elements are collided or not
/*function collision (element1, element2)
{
  var element1Left = element1.offsetLeft,
      element1Top = element1.offsetTop,
      element1FullHeight = element1.offsetHeight,
      element1FullWidth = element1.offsetWidth;
      pointXElement1 = element1Left + element1FullWidth,
      pointYForElement1 = element1Top + element1FullHeight;

  var element2Left = element2.offsetLeft,
      element2Top = element2.offsetTop,
      element2FullHeight = element2.offsetHeight,
      element2FullWidth = element2.offsetWidth,
      pointXElement2 = element2Left + element2FullWidth,
      pointYElement2 = element2Top + element2FullHeight;

  if (pointYForElement1 < element2Top || element1Top > pointYElement2 ||
      pointXElement1 < element2Left || element1Left > pointXElement2) {

      return false; // The 2 Elements Didn't Collided

  } else {

     return true; // The 2 Elements have Collided

  }
    
}*/
function collision ($element1, $element2)
{
  var element1Left = $element1.offset().left,
      element1Top = $element1.offset().top,
      element1FullHeight = $element1.outerHeight(true),
      element1FullWidth = $element1.outerWidth(true),
      pointXElement1 = element1Left + element1FullWidth,
      pointYElement1 = element1Top + element1FullHeight;

  var element2Left = $element2.offset().left,
      element2Top = $element2.offset().top,
      element2FullHeight = $element2.outerHeight(true),
      element2FullWidth = $element2.outerWidth(true),
      pointXElement2 = element2Left + element2FullWidth,
      pointYElement2 = element2Top + element2FullHeight;

  if (pointYElement1 < element2Top || element1Top > pointYElement2 ||
      pointXElement1 < element2Left || element1Left > pointXElement2) {

      return false; // The 2 Elements Didn't Collided

  } else {

     return true; // The 2 Elements have Collided

  }
    
}
// Check Egg Crash into Floor or Not Function
function checkEggCrashFloor (egg) 
{
  if(collision(egg, floor)) {

    showBrokenEgg(egg);
    decrementLife();
    return true;
  
  } else {

  return false;
  }
}

// Check Egg Insert into Floor or Not Function
function insertEggIntoBasket (egg)
{
  
  if(collision(egg, basket)) {
    
    var eggTop = parseInt(egg.css('top'));

    if (eggTop < basketTop) {

      updateScore();
      scoreMusic.play(); // Play Score Music
      return true;

    }
  }
  return false;
}

// Set Egg to Its Initial Position
function setEggToInitialPosition (egg) {

  egg.css('top', InitialPostionOfEgg);
}

// Show Broken Egg Function
function showBrokenEgg (egg)
{
  brokenEggNumber = $(egg).attr('data-brokenEgg');
  var brokenEggId = "brokenEgg" + brokenEggNumber;
  document.getElementById(brokenEggId).style.display = 'block';
  hideBrokenEgg(brokenEggId);
}

// Hide Broken Egg Function
function hideBrokenEgg (brokenEggId)
{
  setTimeout(() => {
    
  document.getElementById(brokenEggId).style.display = 'none';

  }, 1000);
}

// Decrement Life Function
function decrementLife()
{
  life--;
  document.getElementById('life').innerHTML = life;
}

// Update Score Function
function updateScore()
{
  score++, currentScore++;
  if (score % 20 == 0 && speed <= maxSpeed)
  {
    speed++;
  } 
  document.getElementById('score').innerHTML = score;
  document.getElementById('currentScore').innerHTML = currentScore;
  document.getElementById("gameOverScore").innerHTML = currentScore;
}
