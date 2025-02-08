document.addEventListener("DOMContentLoaded", function () {
  eventListeners();
});

// Global Variables

const playNowButton = document.getElementById("play-now");
const levelSelect = document.getElementById("level-select");
const quizImage = document.getElementById("quiz-image");
const phylum = document.getElementById("phylum");
let optionsElement = document.querySelectorAll(".quiz-options");
const submitButton = document.getElementById("submit-button");
const feedbackMessage = document.getElementById("feedback-message");
const playAgainButtonElement = document.getElementById("play-again");

let correctScore = 0;
let questionsAsked = 0;
let totalQuestions = sessionStorage.getItem("questionCount");

// ADD EVENT LISTENERS
function eventListeners() {
  playNowButton.addEventListener("click", playNow);
  //   submitButton.addEventListener("click", checkAnswer);
}

function playNow() {
  const selectedLevel = levelSelect.value;
  let jsonFile = "";

  if (selectedLevel === "1") {
    jsonFile = "assets/json/sponges.json";
  } else if (selectedLevel === "2") {
    jsonFile = "assets/json/cnidaria.json";
  }
  //   continue with all level select options

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
      populateOptions(options);
    }
  }

  function populateOptions(options) {
    // Clear previous options
    optionsElement.forEach((element) => {
      element.innerHTML = "";
    });

    // Populate options
    options.forEach((option, index) => {
      optionsElement[index].innerHTML = option.name;
    });
  }

  selectOption();
}

function selectOption() {
  let options = document.querySelectorAll(".quiz-options");

  for (let option of options) {
    option.addEventListener("click", function () {
      options.forEach((opt) => opt.classList.remove("selected"));
      option.classList.add("selected");
    });
  }
}

// function checkAnswer() {
//   let submitButton = document.getElementById("submitButton");
//   let
//     let userSubmission =

//   if (userSubmission === correctOption.name) {
//     alert = "Correct!";
//     incrementScore();
//   } else {
//     alert = "Incorrect!";
//   }
//   incrementQuestion();
// }

// function calculateCorrectAnswer() {}

// function incrementScore() {}

// function incrementQuestion() {}
