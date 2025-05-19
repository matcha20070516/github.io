const total = 20;
let current = 1;
let timeLimit = 30 * 60;
let timerInterval = null;

const answers = Array(total).fill("");
const locked = Array(total).fill(false);

function updateTimer() {
  if (timeLimit <= 0) {
    clearInterval(timerInterval);
    document.getElementById("timer").textContent = "終了";
    finishExam();
    return;
  }

  const m = Math.floor(timeLimit / 60);
  const s = timeLimit % 60;
  document.getElementById("timer").textContent =
    `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  timeLimit--;
}

function loadQuestion() {
  document.getElementById("question-num").textContent = `第${current}問`;
  document.getElementById("quiz-img").src = `q${current}.png`;

  document.getElementById("answer").value = answers[current - 1];
  document.getElementById("answer").disabled = false;

  updateNavButtons();
  updateChapters();
}

function updateNavButtons() {
  document.getElementById("back-btn").style.visibility = current > 1 ? "visible" : "hidden";
  document.getElementById("forward-btn").style.visibility = current < total ? "visible" : "hidden";
}

function updateChapters() {
  const chapterContainer = document.getElementById("chapters");
  chapterContainer.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const btn = document.createElement("button");
    btn.textContent = `${i + 1}`;
    btn.className = "chapter-btn";

    if (i + 1 === current) btn.classList.add("current");
    if (answers[i].trim() !== "") btn.classList.add("answered");

    btn.onclick = () => {
      saveCurrentAnswer();
      current = i + 1;
      loadQuestion();
    };
    chapterContainer.appendChild(btn);
  }
}

function back() {
  saveCurrentAnswer();
  if (current > 1) {
    current--;
    loadQuestion();
  }
}

function forward() {
  saveCurrentAnswer();
  if (current < total) {
    current++;
    loadQuestion();
  }
}

function saveCurrentAnswer() {
  const ans = document.getElementById("answer").value.trim();
  answers[current - 1] = ans;
}

function finishExam() {
  saveCurrentAnswer();
  console.log("全回答:", answers);
  alert("試験終了です。結果画面に遷移してください。");
}

window.onload = () => {
  loadQuestion();
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);

  document.getElementById("answer").addEventListener("input", () => {
    saveCurrentAnswer();
    updateChapters();
  });

  document.getElementById("submit-btn").addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("本当に終了してもよろしいでしょうか？")) {
      clearInterval(timeInterval);
      finishExam();
    }
  });
};
