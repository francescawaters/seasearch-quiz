document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});

// Global Variables
const playNowButton = document.getElementById("play-now");
const levelSelect = document.getElementById("level-select");
const quiz = document.getElementById("quiz");
const quizImage = document.getElementById("quiz-image");
const phylum = document.getElementById("phylum");
const optionsElement = document.querySelectorAll(".quiz-options");
const submitButton = document.getElementById("submit-button");
const feedbackMessage = document.getElementById("feedback-message");
const playAgainButtonElement = document.getElementById("play-again");

let correctScore = 0;
let questionsAsked = 0;

// ADD EVENT LISTENERS
function eventListeners() {
  playNowButton.addEventListener("click", playNow);
  submitButton.addEventListener("click", checkAnswer);
}

function playNow() {
  const selectedLevel = levelSelect.value;
  const jsonFile = getJsonFile(selectedLevel);

  if (jsonFile) {
    fetch(jsonFile)
      .then((response) => response.json())
      .then((data) => {
        populateQuiz(data);
      })
      .catch((error) =>
        console.error(`Error fetching data from ${jsonFile}:`, error)
      );
  }

  document.getElementById("quiz").classList.remove("hidden");
  document.getElementById("intro").classList.add("hidden");
  quiz.scrollIntoView({ behavior: "smooth" });
}

function getJsonFile(level) {
  const jsonFiles = {
    "1": "assets/json/sponges.json",
    "2": "assets/json/cnidaria.json",
    // Add other levels here
  };
  if (jsonFiles[level]) {
    return jsonFiles[level];
  } else {
    console.error(`Invalid level: ${level}`);
    return null;
  }
}

function populateQuiz(data) {
  if (data.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.length);
    const selectedObject = data[randomIndex];
    quizImage.src = selectedObject.image;
    phylum.innerHTML = selectedObject.phylum;

    const correctOption = selectedObject;
    const otherOptions = data
      .filter((_, index) => index !== randomIndex)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    const options = [correctOption, ...otherOptions].sort(
      () => 0.5 - Math.random()
    );

    populateOptions(options, correctOption);
  }
}

function populateOptions(options, correctOption) {
  // Clear previous options
  optionsElement.forEach((element) => {
    element.innerHTML = "";
    element.classList.remove("correct");
  });

  // Populate options
  options.forEach((option, index) => {
    optionsElement[index].innerHTML = option.name;
    if (option === correctOption) {
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