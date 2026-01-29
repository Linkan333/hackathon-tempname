const startButtons = document.querySelectorAll('.btn-start-task');
const modal = document.getElementById('quiz-modal')
const closeBtn = document.getElementById('close-btn')

const flipBtn = document.querySelector('.btn-flip');
const quizCard = document.querySelector('.quiz-card');
const cardFront = document.querySelector('.card-front');
const cardBack = document.querySelector('.card-back');

const failBtn = document.querySelector('.btn-fail');
const successBtn = document.querySelector('.btn-success');

const xpDisplay = document.getElementById('score');
let currentXP = 0;

startButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.classList.remove('hidden');
        cardBack.classList.add('hidden');

        cardFront.classList.remove('hidden');
        cardBack.classList.add('hidden');
    });
});

closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
});

function flipCard() {
    if(!cardFront.classList.contains('hidden')) {
        cardFront.classList.add('hidden');
        cardBack.classList.remove('hidden');

    } else {
        cardFront.classList.remove('hidden');
        cardBack.classList.add('hidden');
    }
}

flipBtn.addEventListener('click', flipCard);
quizCard.addEventListener('click', flipCard);

successBtn.addEventListener('click', () => {
    currentXP += 10;
    xpDisplay.innerText = currentXP;

    modal.classList.add('hidden');
    alert("Bra jobbat! +10 XP");
});

failBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    alert("Ingen fara, vi tar det nästa gång!");
});

modal.addEventListener('click', (e) => {
    if(e.target === modal) {
        modal.classList.add('hidden');
    }
})