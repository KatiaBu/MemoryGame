const image = ['images/wireless.png', 'images/apple.png', 'images/css.png', 'images/html.png', 'images/instagram.png', 'images/javascript.png', 'images/power.png', 'images/symbol.png',
    'images/wireless.png', 'images/apple.png', 'images/css.png', 'images/html.png', 'images/instagram.png', 'images/javascript.png', 'images/power.png', 'images/symbol.png'
];

var cards = document.querySelectorAll(".memory-image");
cards = [...cards];

const initialState = {
     frontImage : [],
     flippedSrcs : [],     
     clickedCard : false,
     memoryPairs : 8,
     uncoverCard : 0,
     result : 0,
     locked : false,
}

let state = {}

function setState(stateChange){
    state = {
        ...state,
        ...stateChange
    }
}
function setInitialState(){
    state = {
        ...initialState
    }
}

function flipCard() {
    if (AreTwoCardsFlipped()) {
        this.classList.remove("hidden");
    }

    if (state.flippedSrcs.includes(this.src)) return;

    if (this == state.firstCard) {
        state.firstCard.classList.add('hidden');        
        setState({
            firstCard : null,
            clickedCard : false
        })
        return;
    }
    if (state.clickedCard == false) {
        setState({
            firstCard : this,
            clickedCard : true
        })
        return;
    } else if (AreTwoCardsFlipped()) {
        setState({
            secondCard : this,
            clickedCard : false,
            locked : true
        })
        
    }
    checkCards()

}

function checkCards() {
    
    const {firstCard,
           secondCard} = state

    if (firstCard.src == secondCard.src) {
        setState({
            locked : false
        })
        state.uncoverCard++
        addPairToFlipped(firstCard.src);

    } else {
        setTimeout(function () {
            firstCard.classList.add('hidden');
            secondCard.classList.add('hidden');
            setState({
                locked : false
            })
        }, 200);
    }

    setTimeout(function () {}, 200);
    if (state.uncoverCard === state.memoryPairs) 
    {
        alert('YOU WIN')
        $('.play').removeAttr('disabled')      
    }

}

function AreTwoCardsFlipped() {
    return !state.locked;
}

function addPairToFlipped(src) {
    const flippedSrcsCopy = [...state.flippedSrcs]
    flippedSrcsCopy.push(src);
    setState({
        flippedSrcs : flippedSrcsCopy
    })
}

function init() {

    setInitialState();

    cards.forEach((card) => {
        const position = Math.floor(Math.random() * image.length);
        let imgCard = document.createElement("img");
        imgCard.src = image[position];
        imgCard.className = 'front-card';
        card.appendChild(imgCard);
        image.splice(position, 1);
    })

    var frontImage = document.querySelectorAll(".front-card");
    frontImage = [...frontImage];
    frontImage.forEach(image => image.classList.add('hidden'));
    $('.play').attr('disabled', 'disabled');
   
    frontImage.forEach(img => img.addEventListener('click', flipCard));
}

init()

$('button').on("click", init);

