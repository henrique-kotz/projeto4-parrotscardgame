/*
<li class="card" data-identifier="card">
    <div class="back-side" data-identifier="back-face">
        <img src="media//front.png" alt="back-side parrot">
    </div>
    <div class="front-side hidden" data-identifier="front-face"></div>
</li>
*/

function askNumber() {
    let numberOfCards;
    do {
        numberOfCards = prompt('Com quantas cartas você quer jogar? (pares entre 4 e 14)');
    } while(numberOfCards > 14 || numberOfCards < 4 || (numberOfCards % 2 == 1));
    
    return numberOfCards;
}

function dealCards() {
    const deckOfCards = [];
    const num = askNumber();

    for (let i=0; i<num; i++) {
        deckOfCards.push(`
        <li class="card">
            <div class="front-side">
                <img src="media//front.png" alt="back-side parrot">
            </div>
            <div class="back-side hidden"></div>
        </li>
        `);
    }

    const deck = document.querySelector('.deck');
    console.log(deck);
    for (let i=0; i<deckOfCards.length; i++) {
        deck.innerHTML += deckOfCards[i];
    }
}

dealCards();