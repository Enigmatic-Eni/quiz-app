const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Elephant", correct: false },
    ],
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Netherlands", correct: false },
      { text: "Paris", correct: true },
      { text: "Denmark", correct: false },
      { text: "Illions", correct: false },
    ],
  },
  {
    question: "When did Nigeria gain her independence?",
    answers: [
      { text: "1963", correct: false },
      { text: "1960", correct: true },
      { text: "1961", correct: false },
      { text: "1962", correct: false },
    ],
  },
  {
    question: "When did Nigeria become a republic?",
    answers: [
      { text: "1960", correct: false },
      { text: "1963", correct: true },
      { text: "1964", correct: false },
      { text: "1961", correct: false },
    ],
  },
];

const questionElement = document.getElementById("questions");
const answersButtons = document.getElementById("btns");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestions();
}

function showQuestions() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;

  questionElement.textContent = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answersButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });

  function resetState() {
    nextButton.style.display = "none";
    while (answersButtons.firstChild) {
      answersButtons.removeChild(answersButtons.firstChild);
    }
  }
}
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answersButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
startQuiz();