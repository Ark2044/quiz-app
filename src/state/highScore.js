const HIGH_SCORE_KEY = "bestScore";

export function getHighScore() {
  const saved = localStorage.getItem(HIGH_SCORE_KEY);
  return saved ? parseInt(saved, 10) : 0;
}

export function checkAndSaveHighScore(score, total) {
  const currentHigh = getHighScore();

  if (score > currentHigh) {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
    return true;
  }

  return false;
}

export function getHighScoreDisplay(total) {
  const highScore = getHighScore();
  return `Best: ${highScore} / ${total}`;
}
