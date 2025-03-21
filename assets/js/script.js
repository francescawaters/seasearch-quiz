document.addEventListener("DOMContentLoaded", function () {

  // Global Variables
  const intro = document.getElementById("intro"); // intro section
  const quiz = document.getElementById("quiz"); // quiz container
  const results = document.getElementById("results"); // results section

  const playNowButton = document.getElementById("play-now"); // play now button
  const submitButton = document.getElementById("submit-button"); // submit button
  const retryQuiz = document.getElementById("retry-quiz"); // play again button
  const nextQuestion = document.getElementById("next-question"); // next question button

  const quizImage = document.getElementById("quiz-image"); // quiz image
  
  const optionsElement = document.querySelectorAll(".quiz-options"); // quiz options

  let questionProgress = document.getElementById("question-progress"); // question number display
  let correctScore = 0;
  let questionsAsked = 0;
  const MAX_QUESTIONS = 10;

  let data = [];
  let selectedAnswer = "";
  let options = [];
  let randomQuestions = [];

  // EVENT LISTENERS
  playNowButton.addEventListener("click", playNow);

  nextQuestion.addEventListener("click", function () {
    showNextQuestion();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && nextQuestion.style.display === "inline-block") {
      showNextQuestion();
    }
  });

  
  /**
   * Fetches the selected level's JSON data
   */
  function playNow() {
    quiz.style.display = "block";
    intro.style.display = "none";
    quiz.scrollIntoView({ behavior: "smooth" });

    questionsAsked = 0;
    const selectedLevel = document.getElementById("level-select").value;

    // Update question count display
    questionProgress.innerHTML = `Question ${questionsAsked} of ${MAX_QUESTIONS}:`;

    fetch(`./assets/json/${selectedLevel}.json`)
      .then((response) => response.json())
      .then((jsonData) => {
        data = jsonData;
        getRandomQuestions();
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  /**
   * Randomly creates array of 14 species from the data
   */
  function getRandomQuestions(count = 14) {
    randomQuestions = data
    randomQuestions = randomQuestions.sort(() => 0.5 - Math.random()).slice(0, count);
    populateOptions();
  }

  /**
   * Populates the quiz options with the selected answer and 3 other random options
   */
  function populateOptions() {
    let randomIndex;
    submitButton.style.display = "inline-block";
    nextQuestion.style.display = "none";

    incrementQuestion(); // Increment question count

    if (randomQuestions.length > 0) {
      randomIndex = Math.floor(Math.random() * randomQuestions.length);
      selectedAnswer = randomQuestions[randomIndex];
      quizImage.src = selectedAnswer.image;
      quizImage.alt = selectedAnswer.name;

      const otherOptions = randomQuestions
        .filter((option) => option !== selectedAnswer)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      options = [selectedAnswer, ...otherOptions].sort(
        () => 0.5 - Math.random()
      );
    }

    // Clear previous options
    optionsElement.forEach((element) => {
      element.innerHTML = "";
      element.classList.remove("correct");
    });

    // Populate options
    options.forEach((option, index) => {
      optionsElement[index].innerHTML = option.name;
      if (option === selectedAnswer) {
        optionsElement[index].classList.add("correct");
      }
    });

    // Remove the selected answer from the array
    randomQuestions.splice(randomIndex, 1);

    selectOption();

    submitButton.addEventListener("click", checkAnswer);
  }

  /**
   * Displays the next question or results if all questions have been answered
   */
  function showNextQuestion() {
    submitButton.style.display = "inline-block";
    nextQuestion.style.display = "none";
    optionsElement.forEach((opt) => opt.classList.remove("disabled"));
    optionsElement.forEach((opt) => opt.classList.remove("selected"));
    optionsElement.forEach((opt) => opt.classList.remove("correct-answer"));
    optionsElement.forEach((opt) => opt.classList.remove("incorrect"));

    if (questionsAsked === MAX_QUESTIONS) {
      showResults();
    } else {
      populateOptions();
    }
  }

  /**
   * Adds the selected class to the clicked option
   */
  function selectOption() {
    optionsElement.forEach((option) => {
      option.addEventListener("click", function () {
        if (nextQuestion.style.display === "none") {
          optionsElement.forEach((opt) => opt.classList.remove("selected"));
          option.classList.add("selected");
        }
      });
    });
  }

  /**
   * Checks if the selected answer is correct and updates the score 
   */
  function checkAnswer(event) {
    event.preventDefault(); // Prevent form submission

    submitButton.style.display = "none";
    nextQuestion.style.display = "inline-block";
    optionsElement.forEach((opt) => opt.classList.add("disabled"));

    const correctOption = document.querySelector(".correct");
    const userSubmission = document.querySelector(".selected");

    if (userSubmission === correctOption) {
      correctScore++;
      document.querySelector(".correct").classList.add("correct-answer");
      document.querySelector(".correct").innerHTML += "  ✅";
    } else if (userSubmission !== correctOption) {
      document.querySelector(".selected").classList.add("incorrect");
      document.querySelector(".selected").innerHTML += "  ❌";
      document.querySelector(".correct").classList.add("correct-answer");
    }
  }

  /**
   * Increments the question count and updates the display
   */
  function incrementQuestion() {
    questionsAsked++;
    questionProgress.innerHTML = `Question ${questionsAsked} of ${MAX_QUESTIONS}:`;
    // Update question count display if needed
  }

  /**
   * Displays the results of the quiz
   */
  function showResults() {
    quiz.style.display = "none";
    results.style.display = "block";
    document.getElementById(
      "score"
    ).innerHTML = `You scored ${correctScore} out of ${MAX_QUESTIONS}`;

    retryQuiz.addEventListener("click", function () {
      results.style.display = "none";
      intro.style.display = "block";
    });
  }
}); // End of DOMContentLoaded
