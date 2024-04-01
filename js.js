document.addEventListener('DOMContentLoaded', function () {
    const cards = [
        'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
        'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
    ];

    let openedCards = [];
    let matchedCards = [];
    let moves = 0;
    let time = 0;
    let timer;
    let score = 0;

    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const timeDisplay = document.getElementById('time');
    const resetBtn = document.getElementById('reset-btn');

    // Shuffle cards
    cards.sort(() => 0.5 - Math.random());

    // Create card elements
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = card;
        cardElement.innerHTML = '<span class="hidden">' + card + '</span>';
        grid.appendChild(cardElement);

        cardElement.addEventListener('click', function () {
            if (openedCards.length === 2 || matchedCards.includes(cardElement)) return;

            cardElement.classList.add('show');
            openedCards.push(cardElement);

            if (openedCards.length === 2) {
                moves++;
                scoreDisplay.textContent = moves;
                checkMatch();
            }
        });
    });

    function checkMatch() {
        const [firstCard, secondCard] = openedCards;
        const firstValue = firstCard.dataset.card;
        const secondValue = secondCard.dataset.card;

        if (firstValue === secondValue) {
            matchedCards.push(firstCard, secondCard);
            score += 10;
            scoreDisplay.textContent = score;
            if (matchedCards.length === cards.length) {
                clearInterval(timer);
                alert('Congratulations! You won!');
            }
        } else {
            setTimeout(() => {
                firstCard.classList.remove('show');
                secondCard.classList.remove('show');
            }, 1000);
        }

        openedCards = [];
    }

    function startTimer() {
        timer = setInterval(() => {
            time++;
            timeDisplay.textContent = time;
        }, 1000);
    }

    function resetGame() {
        clearInterval(timer);
        time = 0;
        timeDisplay.textContent = time;
        score = 0;
        scoreDisplay.textContent = score;
        openedCards = [];
        matchedCards = [];

        const cardElements = document.querySelectorAll('.card');
        cardElements.forEach(card => card.remove());

        // Shuffle cards
        cards.sort(() => 0.5 - Math.random());

        // Create card elements
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.card = card;
            cardElement.innerHTML = '<span class="hidden">' + card + '</span>';
            grid.appendChild(cardElement);

            cardElement.addEventListener('click', function () {
                if (openedCards.length === 2 || matchedCards.includes(cardElement)) return;

                cardElement.classList.add('show');
                openedCards.push(cardElement);

                if (openedCards.length === 2) {
                    moves++;
                    scoreDisplay.textContent = moves;
                    checkMatch();
                }
            });
        });

        startTimer();
    }

    resetBtn.addEventListener('click', resetGame);

    startTimer();
});