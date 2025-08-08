import { showQuestion } from "./dom/dom.js";

showQuestion();

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (key >= "1" && key <= "5") {
    const choiceIndex = parseInt(key) - 1;
    const buttons = document.querySelectorAll("#choices button");

    if (buttons[choiceIndex]) {
      buttons[choiceIndex].click();
    }
  }

  if (key === "r") {
    const retryButton = document.querySelector("#retry");
    if (retryButton) {
      retryButton.click();
    }
  }
});
