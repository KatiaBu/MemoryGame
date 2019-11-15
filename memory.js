const initialState = {
    frontImage: [],
    flippedSrcs: [],
    clickedCard: false,
    memoryPairs: 8,
    uncoverCard: 0,
    result: 0,
    locked: false,
    counter: 0
}

let state = {}

function setState(stateChange) {
    state = {
        ...state,
        ...stateChange
    }
}

function setInitialState() {
    state = {
        ...initialState
    }
}

function flipCard() {

    if (AreTwoCardsFlipped()) {
        this.classList.remove("hidden");
    }

    if (state.flippedSrcs.includes(this.src)) return;

    if (this === state.firstCard) {
        state.firstCard.classList.add('hidden');
        setState({
            firstCard: null,
            clickedCard: false,
        })
        return;
    }
    if (state.clickedCard === false) {
        setState({
            firstCard: this,
            clickedCard: true
        })
        return;
    } else if (AreTwoCardsFlipped()) {
        setState({
            secondCard: this,
            clickedCard: false,
            locked: true
        })

    }
    checkCards()
}

function checkCards() {

    const {
        firstCard,
        secondCard
    } = state

    if (firstCard.src == secondCard.src) {
        setState({
            locked: false
        })
        state.uncoverCard++
        state.counter++
        addPairToFlipped(firstCard.src);
        document.querySelector('.counter p').innerHTML =  'Number of views:' + ' ' + state.counter

    } else {
        setTimeout(function () {
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            setState({
                locked: false,              
            })           
        }, 300);
        state.counter++
        document.querySelector('.counter p').innerHTML =  'Number of views:' + ' ' + state.counter
    }
    
    setTimeout(function () {}, 200);
    if (state.uncoverCard === state.memoryPairs) {
        var popup = $(".popup");
        popup.addClass('visible');
        $('.play').removeAttr('disabled')
    }
    

    setState({
        firstCard: null
    })
}

function AreTwoCardsFlipped() {
    return !state.locked;
}

function addPairToFlipped(src) {
    const flippedSrcsCopy = [...state.flippedSrcs]
    flippedSrcsCopy.push(src);
    setState({
        flippedSrcs: flippedSrcsCopy
    })
}

function init() {
    const image = ['images/wireless.png', 'images/apple.png', 'images/css.png', 'images/html.png', 'images/instagram.png', 'images/javascript.png', 'images/power.png', 'images/symbol.png',
        'images/wireless.png', 'images/apple.png', 'images/css.png', 'images/html.png', 'images/instagram.png', 'images/javascript.png', 'images/power.png', 'images/symbol.png'
    ];

    var cards = $(".memory-image");
    cards = [...cards];

    cards.forEach((card) => {
        if (card.firstChild) {
            card.firstChild.remove()
        }
    })

    var popup = $(".popup");
    popup.removeClass('visible');

    setInitialState();

    cards.forEach((card) => {
        const position = Math.floor(Math.random() * image.length);
        let imgCard = document.createElement("img");
        imgCard.src = image[position];
        imgCard.className = 'front-card';
        card.appendChild(imgCard);
        image.splice(position, 1);
    })

    var frontImage = $(".front-card");
    frontImage = [...frontImage];
    frontImage.forEach(image => image.classList.add('hidden'));
    $('.play').attr('disabled', 'disabled');

    frontImage.forEach(img => img.addEventListener('click', flipCard));
}

init()

$('button').on("click", init);