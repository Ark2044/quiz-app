import { questions } from "../data/questions.js";
import { shuffle } from "../utils/shuffle.js";

let index = 0;
let score = 0;

let shuffledQuestions = shuffle(questions);

export function current() {
  return shuffledQuestions[index];
}

export function submit(choiceIndex) {
  if (choiceIndex == current().answer) {
    score++;
  }

  index++;

  return index < shuffledQuestions.length;
}

export function getScore() {
  return { score, total: shuffledQuestions.length };
}

export function getQuestionProgress() {
  return { current: index + 1, total: shuffledQuestions.length };
}

export function reset() {
  index = 0;
  score = 0;
  shuffledQuestions = shuffle(questions);
}
