function askNumber() {
    let numberOfCards;
    do {
        numberOfCards = prompt('Com quantas cartas você quer jogar? (pares entre 4 e 14)');
    } while(numberOfCards > 14 || numberOfCards < 4 || (numberOfCards % 2 == 1));
    
    return numberOfCards;
}

function dealCards() {
    const parrotLibrary = [
        'media/explodyparrot.gif', 'media/explodyparrot.gif',
        'media/revertitparrot.gif', 'media/revertitparrot.gif',
        'media/tripletsparrot.gif', 'media/tripletsparrot.gif',
        'media/metalparrot.gif', 'media/metalparrot.gif',
        'media/fiestaparrot.gif', 'media/fiestaparrot.gif',
        'media/bobrossparrot.gif', 'media/bobrossparrot.gif',
        'media/unicornparrot.gif', 'media/unicornparrot.gif'
        ];
    const deckOfCards = [];
    const num = askNumber();

    for (let i=0; i<num; i++) {
        deckOfCards.push(`
        <li class="card" data-identifier="card" onclick="turnCard(this)">
            <div class="back-side" data-identifier="back-face">
                <img src="media/front.png" alt="back-side parrot">
            </div>
            <div class="front-side hidden" data-identifier="front-face">
                <img src=${parrotLibrary[i]}>
            </div>
        </li>
        `);
    }

    const deck = document.querySelector('.deck');
    deckOfCards.sort(comparador);
    for (let i=0; i<deckOfCards.length; i++) {
        deck.innerHTML += deckOfCards[i];
    }
}

function comparador() {
    return Math.random() - 0.5;
}

function turnCard(card) {
    const back = card.querySelector('.back-side');
    const front = card.querySelector('.front-side');
    back.classList.add('hidden');
    front.classList.remove('hidden');
}

dealCards();