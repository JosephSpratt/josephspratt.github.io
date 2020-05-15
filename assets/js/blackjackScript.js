//Blackjack 
//by Joe Spratt

//card variables
let suits = ['Hearts', 'Clubs', 'Diamonds','Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack',
            'Ten', 'Nine', 'Eight', 'Seven', 'Six',
            'Five', 'Four','Three','Two'];

//dom variables
let dealerTextArea = document.getElementById('dealer-text-area');
let playerTextArea = document.getElementById('player-text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');
let doubleDownButton = document.getElementById('doubledown-button');
let stakeArea = document.getElementById("stake-area");
let stakeBalanceArea = document.getElementById("stake-balance-area");
let stakeNumber = document.getElementById("stake-number");
let balanceNumber = document.getElementById("balance-number");
let balanceArea = document.getElementById('balance-area');
let dealerScoreArea = document.getElementById('dealer-score-area');
let playerScoreArea = document.getElementById('player-score-area');
let betBox = document.getElementById("bet-amount");
let playerContainer = document.getElementById('player-text-area-container');
let dealerContainer = document.getElementById('dealer-text-area-container');
let conanGif = document.getElementById('conan-gif'); 
let conanGif2 = document.getElementById('conan-gif2'); 
let hitGif = document.getElementById('hit-gif'); 
let hitGif2 = document.getElementById('hit-gif2'); 
let playGif = document.getElementById('play-gif'); 
let playGif2 = document.getElementById('play-gif2'); 
let stayGif = document.getElementById('stay-gif'); 
let stayGif2 = document.getElementById('stay-gif2'); 

//game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    draw = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    playerBalance = 100,
    betAmount = 0,
    usedDoubleDown = false,
    deck = [];

dealerScoreArea.style.display="none";
playerScoreArea.style.display="none";
hitButton.style.display = 'none';
stayButton.style.display='none';
doubleDownButton.style.display='none';
playerContainer.style.display='none';
dealerContainer.style.display='none';
timeOutConan();
timeOutHit();
timeOutPlay();
timeOutStay();
balanceArea.innerText = 'Your balance is: £';
balanceNumber.innerText = ''+ playerBalance;
showStatus();

newGameButton.addEventListener('click', function(){
    draw = false;
    usedDoubleDown = false
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    balanceNumber.innerText = '' + calculateBalance();
    stakeBalanceArea.innerText = 'Your stake is: £';
    stakeNumber.innerText =  getBetAmount();

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [getNextCard(), getNextCard()];
    playerCards = [getNextCard(), getNextCard()];
    
    newGameButton.style.display="none";
    stakeArea.style.display="none";
    betBox.style.display="none";
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    doubleDownButton.style.display ='inline';
    playerContainer.style.display = 'block';
    dealerContainer.style.display = 'block';
    dealerScoreArea.style.display="block";
    playerScoreArea.style.display="block";
    timeOutStay();
    timeOutConan();
    timeOutHit();
    playDisplay();
    showStatus();
});

function timeOutConan(){
    conanGif.style.display='none';
    conanGif2.style.display='none';
}
function timeOutHit(){
    hitGif.style.display='none';
    hitGif2.style.display='none';
}
function timeOutPlay(){
    playGif.style.display='none';
    playGif2.style.display='none';
}
function playDisplay(){
    playGif.style.display='block';
    playGif2.style.display='block';
}
function hitDisplay(){
    hitGif.style.display='block';
    hitGif2.style.display='block';
}
function timeOutStay(){
    stayGif.style.display='none';
    stayGif2.style.display='none';
}
function stayDisplay(){
    stayGif.style.display='block';
    stayGif2.style.display='block';
}

hitButton.addEventListener('click', function(){
    doubleDownButton.style.display = 'none';
    playerCards.push(getNextCard());
    timeOutPlay();
    timeOutConan();
    timeOutStay();
    hitDisplay();
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener('click', function(){
    doubleDownButton.style.display = 'none';
    gameOver = true;
    timeOutPlay();
    timeOutHit();
    timeOutConan();
    stayDisplay();
    checkForEndOfGame();
    showStatus();
});

doubleDownButton.addEventListener('click', function(){
    usedDoubleDown = true;
    balanceArea.innerText = 'Your balance is: £';
    balanceNumber.innerText = '' + calculateBalanceAfterDoubleDown(); 
    stakeBalanceArea.innerText = 'Your stake is: £';
    stakeNumber.innerText = (getBetAmount()*2);
    doubleDownButton.style.display = 'none';
    timeOutPlay();
    timeOutHit();
    timeOutStay();
    conanGif.style.display='block';
    conanGif2.style.display='block';
    showStatus();
});

function calculateBalance(){
    playerBalance = playerBalance - getBetAmount();
    return playerBalance;
}

function calculateBalanceAfterDoubleDown(){
    playerBalance = playerBalance - getBetAmount();
    return playerBalance;
}

function getBetAmount(){
    betAmount = document.getElementById("bet-amount").value;
    return betAmount;
}

function createDeck() {
    let deck = [];
for(let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
       for(let valuesIdx = 0; valuesIdx < values.length; valuesIdx++) {
           let card = {
               suit: suits[suitIdx],
               value: values[valuesIdx]
           };
       deck.push(card);
    }
}
return deck;
}    
 
function shuffleDeck(){
    for(let i = 0; i < deck.length; i++){
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
}

function getNextCard(){
    return deck.shift();
}

function getCardString(card){
    return card.value + " of " + card.suit;
}

function getCardNumericValue(card){
    switch(card.value){
        case 'Ace':
        return 1;

        case 'Two':
        return 2;

        case 'Three':
        return 3;

        case 'Four':
        return 4;

        case 'Five':
        return 5;

        case 'Six':
        return 6;

        case 'Seven':
        return 7;

        case 'Eight':
        return 8;

        case 'Nine':
        return 9;

        default:
        return 10;
    }

}

function getScore(cardArray){
let score = 0;
let hasAce = false;
for(let i = 0; i < cardArray.length; i++){
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if(card.value === 'Ace'){
        hasAce = true;
    }
}
    if(hasAce && score + 10 <= 21){
        return score + 10;
    }
    return score;
}

function updateScores(){
dealerScore = getScore(dealerCards);
playerScore = getScore(playerCards);
}

function checkForEndOfGame(){
    updateScores();
        if(gameOver){
            while(
                dealerScore < playerScore &&
                playerScore <= 21 && 
                dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScores();
                }
        }
    if(playerScore > 21){
        gameOver = true;
        playerWon = false;
    }
    else if (dealerScore > 21){
        playerWon = true;
        gameOver = true;
    }
    else if (dealerScore == 21 && playerScore == 21){
        playerWon = false;
        draw = true;
        gameOver = true;
    }
    else if(gameOver){
        if(playerScore > dealerScore){
            playerWon = true;
        }
    }
    else{
        playerWon = false;
    }
}

function showStatus(){
    if(!gameStarted){
        return;
    }
   let dealerCardString = "";
   for(let i = 0; i < dealerCards.length; i++){
       dealerCardString += getCardString(dealerCards[i]) + "\n";
   }
   let playerCardString = "";
   for(let i = 0; i < playerCards.length; i++){
       playerCardString += getCardString(playerCards[i]) + "\n";
   }
   updateScores();

   dealerTextArea.innerText = dealerCardString;
   dealerScoreArea.innerText = "score: " + dealerScore;

   playerTextArea.innerText = playerCardString;
   playerScoreArea.innerText = "score: " + playerScore;

   if(gameOver){
       if(playerWon && usedDoubleDown){
        playerTextArea.innerText += "YOU WON: £" + (getBetAmount()*2);
        playerBalance = playerBalance + (getBetAmount()*4);
       }
       else if(playerWon){
        playerTextArea.innerText += "YOU WON: £" + getBetAmount();
        playerBalance = playerBalance + (getBetAmount()*2);
        }
        else if(draw){
            playerTextArea.innerText += "DRAW: £" + (getBetAmount()/2) + " returned.";
            playerBalance = playerBalance + (getBetAmount()/2);
            }
       else{
           dealerTextArea.innerText += "DEALER WINS";
       }
       newGameButton.style.display = 'inline';
       stakeArea.style.display="inline";
       betBox.style.display="inline";
       balanceArea.innerText = 'Your balance is: £';
       balanceNumber.innerText='' + playerBalance;
       hitButton.style.display = 'none';
       stayButton.style.display = 'none';
   }
}


