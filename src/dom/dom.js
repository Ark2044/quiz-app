import {
  current,
  getScore,
  reset,
  submit,
  getQuestionProgress,
} from "../state/quiz.js";
import { startTimer, stopTimer } from "../state/timer.js";
import {
  checkAndSaveHighScore,
  getHighScoreDisplay,
} from "../state/highScore.js";

let quizCard = document.createElement("div");
quizCard.id = "quiz-card";
document.body.append(quizCard);

export function showQuestion() {
  const q = current();

  quizCard.innerHTML = `
    <h1>Quiz Application</h1>
    <div id="time-container">Time left: 10s</div>
    <h2>${q.text}</h2>
    <div id="choices"></div>
    <p id="progress"></p>
    `;

  const choiceBox = quizCard.querySelector("#choices");
  const timerContainer = quizCard.querySelector("#time-container");

  q.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.innerText = `${i + 1}. ${choice}`;
    btn.addEventListener("click", () => handleAnswer(i));
    choiceBox.append(btn);
  });

  
  startTimer(
    10,
    () => handleAnswer(-1),
    (timeLeft) => {
      timerContainer.textContent = `Time left: ${timeLeft}s`;
    }
  );

  getProgress();
}

function handleAnswer(choiceIndex) {
  stopTimer();
  const more = submit(choiceIndex);
  more ? showQuestion() : showResult();
}

export function getProgress() {
  const { current, total } = getQuestionProgress();

  quizCard.querySelector(
    "#progress"
  ).textContent = `Question: ${current} / ${total}`;
}

export function showResult() {
  stopTimer();
  const { score, total } = getScore();
  const isNewHighScore = checkAndSaveHighScore(score, total);

  const highScoreText = isNewHighScore ? "🏆 New High Score!" : "";

  quizCard.innerHTML = `
    <h2>Quiz Completed</h2>
    <p>Your Score: ${score} / ${total}</p>
    ${
      highScoreText
        ? `<p style="color: gold; font-weight: bold;">${highScoreText}</p>`
        : ""
    }
    <p>${getHighScoreDisplay(total)}</p>
    <button id="retry">Try Again (Press R)</button>
    `;

  quizCard.querySelector("#retry").onclick = handleRetry;
}

function handleRetry() {
  reset();
  showQuestion();
}
