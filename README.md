# seasearch-quiz

## Description

SeaSearch Quiz is a learning resource designed to aid in species identification knowledge for underwater surveys around Britain and Ireland. Through engaging quizzes, users can enhance their knowledge of marine species, receive immediate feedback on their answers, and track their progress over time. The platform offers various quiz options, including specific phyla or mixed quizzes, and provides additional resources to support learning. SeaSearch Quiz aims to improve species identification skills, promote participation in underwater surveys, and build a community of marine enthusiasts.

Live site: [Seasearch quiz](https://francescawaters.github.io/seasearch-quiz/)

## User Goals
- Learn to identify different marine species.
- Test and improve their knowledge of marine species.
- Receive feedback on their quiz performance.
- Access additional resources for learning about marine species.
- Track their progress over time.
- Engage with an interactive and user-friendly interface.

## Owner Goals
- Provide an educational tool for marine survey training.
- Increase awareness and knowledge of marine species.
- Encourage more people to participate in underwater marine surveys.
- Collect data on common knowledge gaps to improve training materials.
- Promote the organisation's training programmes and resources.
- Foster a community of learners and marine enthusiasts.

## User Stories

1. AS A user, I WANT to start a new quiz SO THAT I CAN test my knowledge of marine species.
   - **Acceptance Criteria:**
     - A "Start Quiz" button is available on the homepage.
     - Clicking the "Start Quiz" button begins a new quiz session.
   - **Tasks:**
     - Design and implement the homepage with a "Start Quiz" button.
     - Create a quiz session handler to start a new quiz.

2. AS A user, I WANT to see images of marine species in the quiz SO THAT I CAN identify them visually.
   - **Acceptance Criteria:**
     - Each quiz question includes an image of a marine species.
   - **Tasks:**
     - Collect and store images of marine species.
     - Integrate images into quiz questions.

3. AS A user, I WANT to receive immediate feedback on my answers SO THAT I CAN learn from my mistakes.
   - **Acceptance Criteria:**
     - After submitting an answer, the user receives feedback indicating whether it was correct or incorrect.
   - **Tasks:**
     - Implement answer submission and feedback mechanism.
     - Design feedback messages for correct and incorrect answers.

4. AS A user, I WANT to view my quiz score at the end SO THAT I CAN gauge my performance.
   - **Acceptance Criteria:**
     - The final score is displayed at the end of the quiz.
   - **Tasks:**
     - Calculate the user's score based on their answers.
     - Display the final score on the quiz completion page.

5. AS A user, I WANT to access explanations for the correct answers SO THAT I CAN understand why they are correct.
   - **Acceptance Criteria:**
     - Explanations for correct answers are available after each question or at the end of the quiz.
   - **Tasks:**
     - Write explanations for each quiz question.
     - Display explanations alongside feedback.

6. AS A user, I WANT to track my quiz performance over time SO THAT I CAN see my improvement.
   - **Acceptance Criteria:**
     - Users can view their past quiz scores and performance trends.
   - **Tasks:**
     - Implement user accounts and authentication.
     - Store quiz results in a database.
     - Create a dashboard to display performance history.

7. AS A user, I WANT to share my quiz results on social media SO THAT I CAN challenge my friends.
   - **Acceptance Criteria:**
     - Users can share their quiz results on social media platforms.
   - **Tasks:**
     - Integrate social media sharing functionality.
     - Design shareable result summaries.

8. AS A user, I WANT to access additional learning resources SO THAT I CAN improve my species identification skills.
   - **Acceptance Criteria:**
     - A section with additional learning resources is available on the website.
   - **Tasks:**
     - Collect and organize learning resources.
     - Design and implement a resources section on the website.

9. AS A user, I WANT to be able to choose a specific phylum or a mixed quiz option SO THAT I CAN test my knowledge level.
    - **Acceptance Criteria:**
      - Users can select a specific phylum or a mixed quiz option before starting the quiz.
    - **Tasks:**
      - Implement a phylum selection feature that includes an option for a mixed quiz.
      - Create quiz questions for various phyla.

11. AS A user, I WANT to save my progress in the quiz SO THAT I CAN resume it later.
    - **Acceptance Criteria:**
      - Users can save their quiz progress and resume it later.
    - **Tasks:**
      - Implement quiz progress saving and loading.
      - Design a user interface for resuming saved quizzes.

12. AS A user, I WANT to provide feedback on the quiz SO THAT I CAN help improve the tool for future users.
    - **Acceptance Criteria:**
      - Users can submit feedback on the quiz.
    - **Tasks:**
      - Create a feedback form.
      - Implement feedback submission and storage.