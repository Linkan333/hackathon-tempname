const modal = document.getElementById('quizModal');
const flipCardInner = document.getElementById('flipCardInner');
const btnFlip = document.getElementById('btnFlip');
const btnSuccess = document.getElementById('btnSuccess');
const btnFail = document.getElementById('btnFail');
const questionText = document.getElementById('questionText');
const answerText = document.getElementById('answerText');


let currentQuestionId = 1;
let totalQuestions = 5;


async function fetchQuestion(id) {
  try {
    const response = await fetch(`/challenges/flashcards/questions/${id}`);


    if (!response.ok) {
      throw new Error("Fråga hittades inte");
    }

    const questions = await response.json();
    displayQuestion(questions);
  } catch (error) {
    console.error('Fel vid hämtning av fråga: ', error);
    alert("Kunde inte ladda fråga");
  }
}


function displayQuestion(question) {
  questionText.textContent = question.question;
  answerText.textContent = question.answer;
  flipCardInner.classList.remove('flipped');
}

function openModal() {
  modal.classList.remove('hidden');
  flipCardInner.classList.remove('flipped');
}

function closeModal() {
  modal.classList.add('hidden');
  flipCardInner.classList.remove('flipped');
}

btnFlip.addEventListener('click', () => {
  flipCardInner.classList.toggle('flipped');
});

btnSuccess.addEventListener('click', () => {
  currentQuestionId++;

  if (currentQuestionId <= totalQuestions) {
    fetchQuestion(currentQuestionId);
  } else {
    alert("Flashcards klart.");
    closeModal();
  }
});

// Fel svar
btnFail.addEventListener('click', () => {
  currentQuestionId++;

  if (currentQuestionId <= totalQuestions) {
    fetchQuestion(currentQuestionId);
  } else {
    alert('Quiz klart!');
    closeModal();
  }
});

setTimeout(openModal, 1000);
