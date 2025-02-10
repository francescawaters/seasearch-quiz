document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});

// Global Variables
const playNowButton = document.getElementById("play-now"); // play now button
const quiz = document.getElementById("quiz"); // quiz container
const questionNumber = document.getElementById("question-number"); // question number display
const quizImage = document.getElementById("quiz-image"); // quiz image
const optionsElement = document.querySelectorAll(".quiz-options"); // quiz options
const submitButton = document.getElementById("submit-button"); // submit button
const feedbackMessage = document.getElementById("feedback-message"); // feedback message
const retryQuiz = document.getElementById("retry-quiz"); // play again button
const nextQuestion = document.getElementById("next-question"); // next question button

let correctScore = 0;
let questionsAsked = 0;
let data = [];
let correctOption = "";
let selectedAnswer = "";
let options = [];
let randomQuestions = [];

const MAX_QUESTIONS = 10;

// ADD EVENT LISTENERS
function eventListeners() {
  playNowButton.addEventListener("click", playNow);
  submitButton.addEventListener("click", checkAnswer);
}

function playNow() {
  correctScore = 0;
  questionsAsked = 0;
  data = [];
  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("intro").classList.add("hidden");
  quiz.scrollIntoView({ behavior: "smooth" });

  const selectedLevel = document.getElementById("level-select").value;

  // Update question count display if needed
  questionNumber.innerHTML = `Question ${questionsAsked} of ${MAX_QUESTIONS}:`;

  fetch(`./assets/json/${selectedLevel}.json`)
    .then((response) => response.json())
    .then((jsonData) => {
      data = jsonData;
      getRandomQuestions();
    })
    .catch((error) => console.error("Error fetching data:", error));
}

//  Need to add a function to get random questions
function getRandomQuestions(count = MAX_QUESTIONS) {
  for (let i = 0; i < 10; i++) {
    randomQuestions.push(data.sort(() => 0.5 - Math.random()).slice(0, count));
  }
  console.log(randomQuestions);
  populateOptions();
}

function populateOptions() {
  if (randomQuestions.length > 0) {
    const randomIndex = Math.floor(Math.random() * randomQuestions.length);
    const selectedArray = randomQuestions[randomIndex];
    const selectedAnswer = selectedArray[Math.floor(Math.random() * selectedArray.length)];
    quizImage.src = selectedAnswer.image;

    const otherOptions = selectedArray
      .filter((option) => option !== selectedAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    options = [selectedAnswer, ...otherOptions].sort(() => 0.5 - Math.random());
  } 
  
  // Clear previous options
  optionsElement.forEach((element) => {
    element.innerHTML = "";
    element.classList.remove("correct");
  });

  // Populate options
  options.forEach((option, index) => {
    optionsElement[index].innerHTML = option.name;
    console.log(option.name);
    if (option === selectedAnswer) {
      optionsElement[index].classList.add("correct");
    }
  });

  selectOption();
}

function selectOption() {
  optionsElement.forEach((option) => {
    option.addEventListener("click", function () {
      optionsElement.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");
    });
  });
}

function checkAnswer() {
  const correctOption = document.querySelector(".correct");
  const userSubmission = document.querySelector(".selected");

  if (userSubmission === correctOption) {
    feedbackMessage.innerHTML = "Correct!";
    incrementScore();
  } else {
    feedbackMessage.innerHTML = "Incorrect!";
  }

  nextQuestion.eventListeners("click", showNextQuestion);

  incrementQuestion();
}

function incrementScore() {
  correctScore++;
  // Update score display if needed
}

function incrementQuestion() {
  questionsAsked++;
  // Update question count display if needed
}

function showResults() {
  quiz.classList.add("hidden");
  document.getElementById("results").classList.remove("hidden");
  document.getElementById(
    "score"
  ).innerHTML = `You scored ${correctScore} out of ${MAX_QUESTIONS}`;
}
