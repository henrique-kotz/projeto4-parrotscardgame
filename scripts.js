let deckOfCards = []
let numberOfCards;
let firstCard = null;
let secondCard = null;
let counter = 0;
let stopClock = null;

const parrotLibrary = [
        ['media/explodyparrot.gif', 'media/explodyparrot.gif'],
        ['media/revertitparrot.gif', 'media/revertitparrot.gif'],
        ['media/tripletsparrot.gif', 'media/tripletsparrot.gif'],
        ['media/metalparrot.gif', 'media/metalparrot.gif'],
        ['media/fiestaparrot.gif', 'media/fiestaparrot.gif'],
        ['media/bobrossparrot.gif', 'media/bobrossparrot.gif'],
        ['media/unicornparrot.gif', 'media/unicornparrot.gif']
    ];

function askNumber() {
    do {
        numberOfCards = prompt('Com quantas cartas você quer jogar? (pares entre 4 e 14)');
    } while(numberOfCards > 14 || numberOfCards < 4 || (numberOfCards % 2 == 1));
    
    return numberOfCards;
}

function dealCards() {
    const num = askNumber();
    const shuffledParrots =  sortLibrary(num);
    
    for (let i=0; i<num; i++) {
        deckOfCards.push(`
        <li class="card" data-identifier="card" onclick="chooseCard(this)">
            <div class="face back-side" data-identifier="back-face">
                <img src="media/front.png" alt="back-side parrot">
            </div>
            <div class="face front-side" data-identifier="front-face">
                <img src=${shuffledParrots[i]}>
            </div>
        </li>
        `);
    }

    const deck = document.querySelector('.deck');
    deckOfCards.sort(() => Math.random() - 0.5);
    for (let i=0; i<deckOfCards.length; i++) {
        deck.innerHTML += deckOfCards[i];
    }
}

function sortLibrary(num) {
    const numPairs = num/2;
    const shuffled = [];
    parrotLibrary.sort(() => Math.random() - 0.5);

    for (let i=0; i<numPairs; i++) {
        shuffled.push(parrotLibrary[i][0]);
        shuffled.push(parrotLibrary[i][1]);
    }

    return shuffled;
}

function chooseCard(card) {
    if (counter === 0) startClock();
    const turnedList = document.querySelectorAll('.back-side.turn-down');
    turnCard(card);
    counter++;

    if (turnedList.length % 2 === 0) {
        firstCard = card;
        firstCard.removeAttribute('onclick');
    } else {
        secondCard = card;
        secondCard.removeAttribute('onclick');
        checkMove();
    }
}

function turnCard(card) {
    const back = card.querySelector('.back-side');
    const front = card.querySelector('.front-side');
    back.classList.toggle('turn-down');
    front.classList.toggle('turn-up');
}

function checkMove() {
    const firstParrot = firstCard.querySelector('.front-side').innerHTML;
    const secondParrot = secondCard.querySelector('.front-side').innerHTML;
    if (firstParrot !== secondParrot) {
        setTimeout(() => {
            turnCard(firstCard);
            turnCard(secondCard);
        }, 1000);
        firstCard.setAttribute('onclick', 'chooseCard(this)');
        secondCard.setAttribute('onclick', 'chooseCard(this)');
    } else {
        numberOfCards -= 2;
        if (numberOfCards === 0) {
            finishGame();
        }
    }
}

function finishGame() {
    clearInterval(stopClock);
    const time = document.querySelector('header p').innerHTML;
    let restart = null;

    setTimeout(() => {
        alert(`Você ganhou em ${counter} jogadas levando ${time} segundos!`);
        restart = prompt('Deseja reiniciar a partida? (sim/não)');

        if (restart.trim().toLowerCase() === 'sim') {
            console.log('yay');
            restartGame();
        }
    }, 500);
}

function startClock() {
    const clock = document.querySelector('header p');

    stopClock = setInterval(() => {
        clock.innerHTML = parseInt(clock.innerHTML) + 1;
    }, 1000);
}

function restartGame() {
    document.querySelector('.deck').innerHTML = '';
    document.querySelector('header p').innerHTML = 0;


    deckOfCards = []
    numberOfCards = null;
    counter = 0;
    stopClock = null;
    
    dealCards();
}

dealCards();