const flipCardInner = document.getElementById('flipCardInner');
const btnFlip = document.getElementById('btnFlip');
const btnSuccess = document.getElementById('btnSuccess');
const btnFail = document.getElementById('btnFail');
const questionText = document.getElementById('questionText');
const answerText = document.getElementById('answerText');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');
const subjectSelect = document.getElementById('subjectSelect');
const difficultySelect = document.getElementById('difficultySelect');

let currentQuestionId = 1;
let totalQuestions = 10;
let selectedSubject = null;
let selectedDifficulty = null;

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderContent(element, content) {
  content = content.replace(/\\\\/g, '\\');

  content = content.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'javascript';
    return `<pre><code class="language-${language}">${escapeHtml(code.trim())}</code></pre>`;
  });

  content = content.replace(/`([^`]+)`/g, '<code>$1</code>');

  element.innerHTML = content;

  if (typeof renderMathInElement !== 'undefined') {
    renderMathInElement(element, {
      delimiters: [
        { left: '\\[', right: '\\]', display: true },
        { left: '\\(', right: '\\)', display: false },
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }

  if (typeof Prism !== 'undefined') {
    element.querySelectorAll('pre code').forEach((block) => {
      Prism.highlightElement(block);
    });
  }
}

async function loadSubjects() {
  const select = document.getElementById('subjectSelect');

  select.classList.add('loading');
  select.disabled = true;

  try {
    const response = await fetch('/subjects');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const subjects = await response.json();

    select.innerHTML = '<option value="">Välj ämne</option>' +
      subjects.map(s => `<option value="${s.id}">${s.subject}</option>`).join('');

  } catch (error) {
    console.error('Error loading subjects:', error);
    select.innerHTML = '<option value="">Kunde inte ladda ämnen</option>';
  } finally {
    select.classList.remove('loading');
    select.disabled = false;
  }
}

let streakCounter = 0;

async function loadStreak() {
  const selectStreak = document.getElementById("streak");
  streakCounter++;
  selectStreak.textContent = streakCounter;
}

async function loadDifficulty() {
  const select = document.getElementById("difficultySelect");

  select.classList.add('loading');
  select.disabled = true;

  try {
    const response = await fetch('/difficulties');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const difficulties = await response.json();

    select.innerHTML = '<option value="">Välj svårighet</option>' +
      difficulties.map(d => `<option value="${d.difficulty}">${d.difficulty}</option>`).join('');

  } catch (error) {
    console.error('Error loading difficulties: ', error);
    select.innerHTML = '<option value="">Kunde inte ladda svårigheter</option>';
  } finally {
    select.classList.remove('loading');
    select.disabled = false;
  }
}

subjectSelect.addEventListener('change', (e) => {
  selectedSubject = e.target.value;
  console.log('Selected subject ID:', selectedSubject);

  if (selectedSubject && selectedDifficulty) {
    generateQuestions();
  }
});

difficultySelect.addEventListener('change', (e) => {
  selectedDifficulty = e.target.value;
  console.log('Selected difficulty:', selectedDifficulty);

  if (selectedSubject && selectedDifficulty) {
    generateQuestions();
  }
});

async function generateQuestions() {
  if (!selectedSubject || !selectedDifficulty) {
    console.log('Waiting for both subject and difficulty...');
    return;
  }

  try {
    console.log('Generating questions...', { selectedSubject, selectedDifficulty });

    questionText.textContent = 'Genererar frågor...';
    answerText.textContent = 'Vänta ett ögonblick';

    const response = await fetch('/api/generate-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        subjectId: selectedSubject,
        difficulty: selectedDifficulty
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate questions');
    }

    const result = await response.json();
    console.log('Questions generated:', result);

    alert(`Frågor genererade för ${result.subject} (${result.difficulty})!`);

    currentQuestionId = 1;
    await fetchQuestion(1);

  } catch (error) {
    console.error('Error generating questions:', error);
    alert('Kunde inte generera frågor. Försök igen.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadSubjects();
  loadDifficulty();
});

async function fetchQuestion(id) {
  try {
    const response = await fetch(`/challenges/flashcards/questions/${id}`);

    if (!response.ok) {
      throw new Error("Fråga hittades inte");
    }

    const question = await response.json();
    displayQuestion(question);
  } catch (error) {
    console.error('Fel vid hämtning av fråga: ', error);
    alert("Kunde inte ladda fråga");
  }
}

function displayQuestion(question) {
  renderContent(questionText, question.question);
  renderContent(answerText, question.answer);

  flipCardInner.classList.remove('flipped');

  currentQuestionEl.textContent = currentQuestionId;
  totalQuestionsEl.textContent = totalQuestions;
}

btnFlip.addEventListener('click', () => {
  flipCardInner.classList.toggle('flipped');
});

btnSuccess.addEventListener('click', () => {
  currentQuestionId++;

  if (currentQuestionId <= totalQuestions) {
    fetchQuestion(currentQuestionId);
  } else {
    alert("Flashcards klart! 🎉");
    currentQuestionId = 1;
  }
});

btnFail.addEventListener('click', () => {
  currentQuestionId++;

  if (currentQuestionId <= totalQuestions) {
    fetchQuestion(currentQuestionId);
  } else {
    alert('Quiz klart! 🎉');
    currentQuestionId = 1;
  }
});