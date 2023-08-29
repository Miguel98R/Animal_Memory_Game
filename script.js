$(document).ready(function () {
    const cardsContainer = $('.cards-container');
    const scoreDisplay = $('#score');
    const attemptsDisplay = $('#attempts');
    const foundCardsContainer = $('.found-cards-container');

    let flippedCards = [];
    let score = 0;
    let attempts = 0;
    let cardArray = [];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function checkWin() {
        if (score === cardArray.length) {
            $('.victory-message').css('display', 'block');
            showRestartButton();
        }
    }

    function resetGame() {
        cardsContainer.empty();
        cardArray = shuffleArray(cardArray);
        cardsContainer.append(cardArray);
        flippedCards = [];
        score = 0;
        attempts = 0;
        scoreDisplay.text(score);
        attemptsDisplay.text(attempts);
        clearFoundCards();
        flipAllCardsDown();
    }

    function clearFoundCards() {
        foundCardsContainer.empty();
    }

    function flipAllCardsDown() {
        cardsContainer.find('.card').removeClass('flipped');
    }

    function showRestartButton() {
        $('#restart-button').css('display', 'block');
    }

    function flipCard() {
        if ($(this).hasClass('flipped') || flippedCards.length === 2) return;

        $(this).addClass('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            attempts++;
            attemptsDisplay.text(attempts);

            const firstCard = $(flippedCards[0]);
            const secondCard = $(flippedCards[1]);

            const animal1 = firstCard.data('animal');
            const animal2 = secondCard.data('animal');

            if (animal1 === animal2) {
                score += 2;
                scoreDisplay.text(score);

                foundCardsContainer.append(firstCard.clone());
                foundCardsContainer.append(secondCard.clone());

                firstCard.remove();
                secondCard.remove();

                flippedCards = [];
                checkWin();
            } else {
                flippedCards.forEach(function (card) {
                    $(card).addClass('shake');
                });
                setTimeout(function () {
                    flippedCards.forEach(function (card) {
                        $(card).removeClass('flipped shake');
                    });
                    flippedCards = [];
                }, 1000);
            }
        }
    }

    cardArray = shuffleArray(Array.from(cardsContainer.find('.card')));
    cardsContainer.empty().append(cardArray);
    cardsContainer.on('click', '.card', flipCard);

    $('#restart-button').click(function () {
        $('#restart-button').css('display', 'none');
        resetGame();
    });

    resetGame(); // Llamada inicial para iniciar el juego
});
