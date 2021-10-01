let order = [0, 0, 1, 1, 2, 2, 3, 3];
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

// Cria ordem aleatoria de cores
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

// Acende a proxima cor
let showColor = (element) => {
    if (element.classList.item(2) == 'hide') {
        element.classList.remove('hide');
        let position = element.classList.item(1);
        let color;
        switch (position) {
            case "p1":
                color = createColorElement(newOrder[0]);
                break;
            case "p2":
                color = createColorElement(newOrder[1]);
                break;
            case "p3":
                color = createColorElement(newOrder[2]);
                break;
            case "p4":
                color = createColorElement(newOrder[3]);
                break;
            case "p5":
                color = createColorElement(newOrder[4]);
                break;
            case "p6":
                color = createColorElement(newOrder[5]);
                break;
            case "p7":
                color = createColorElement(newOrder[6]);
                break;
            case "p8":
                color = createColorElement(newOrder[7]);
                break;
            default:
                console.log(`Sorry, we are out of ${position}.`);
        }
        element.classList.add(color);
        checkCard(color);
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

// Checa se os botões clickados são os mesmos da ordem gerada no jogo
let checkCard = (color) => {
    checkPair++;
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
    count++;
    if (count == 8) {
        alert(`Pontuação: ${score}\nVocê acertou" Iniciando próximo nível!`);
        nextLevel();
    }
};

//Função para o clique do usuario
let click = (element) => {
    showColor(element);
};

//Função que retorna a cor
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

//Função para proximo nível do jogo
let nextLevel = () => {
    score++;

    clearOldLevel();
    shuffleOrder();
};

//Função para game over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo\nClique em OK para iniciar o jogo`);

    clearOldLevel();

    playGame();
};

//Função para começar o jogo
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