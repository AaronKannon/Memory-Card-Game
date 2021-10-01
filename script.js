let order = [0, 0, 1, 1, 2, 2, 3, 3];
let divOrder = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'];
let newOrder = [];
let score = 0;
let checkPair = 0;
let checkColor = '';
let count = 0;

let cards = document.querySelectorAll('.card');

let shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let shuffleOrder = () => {
    newOrder = shuffleArray(order);
    clickedOrder = [];

    setAllColors(cards, newOrder);
    setTimeout(() => {
        hideAllColors(cards, newOrder);
    }, 1000);
};

let setAllColors = (cards, order) => {
    for (let i = 0; i < cards.length; i++) {
        let elementColor = createColorElement(order[i]);
        cards[i].classList.add(elementColor);
    }
};

let hideAllColors = (cards) => {
    for (let i = 0; i < cards.length; i++) {
        let elementColor = createColorElement(order[i]);
        cards[i].classList.remove(elementColor);
        cards[i].classList.add('hide');
    }
};

let showColor = (element) => {
    if (element.classList.item(2) == 'hide') {
        element.classList.remove('hide');
        let position = element.classList.item(1);
        let color;
        color = createColorElement(newOrder[divOrder.indexOf(position)]);
        element.classList.add(color);
        checkCard(color);
    }
};

let checkCard = (color) => {
    checkPair++;
    count++;
    if (checkPair == 1) {
        checkColor = color;
    }
    if (checkColor != color) {
        gameOver();
    }
    if (checkPair == 2) {
        checkColor = '';
        checkPair = 0;
    }
    if (count == 8) {
        setTimeout(() => {
            alert(`Pontuação: ${score}\nVocê acertou" Iniciando próximo nível!`);
            nextLevel();
        }, 100);
    }
};

let click = (element) => {
    showColor(element);
};

let createColorElement = (color) => {
    if (color == 0) {
        return 'green';
    } else if (color == 1) {
        return 'red';
    } else if (color == 2) {
        return 'yellow';
    } else if (color == 3) {
        return 'blue';
    }
};

let clearOldLevel = () => {
    for (let i = 0; i < cards.length; i++) {
        let elementColor = createColorElement(order[i]);
        cards[i].classList.remove(elementColor);
        cards[i].classList.remove('hide');
    }
    newOrder = [];
    checkPair = 0;
    checkColor = '';
    count = 0;
};

let nextLevel = () => {
    score++;

    clearOldLevel();
    shuffleOrder();
};

let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo\nClique em OK para iniciar o jogo`);

    clearOldLevel();

    playGame();
};


let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    score = 0;

    nextLevel();
};

let clickListener = () => {
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', function() {
            click(cards[i]);
        });
    }
}

clickListener();

playGame();