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
    timeUp();
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
  const username = document.getElementById("username-input")?.value || "名無し";
  // 例: 点数を計算する関数があればそれを使う
  const score = calculateScore(answers); // 自作の点数計算
  // localStorageに保存
  localStorage.setItem("exUsername", username);
  localStorage.setItem("exScore", score);
  localStorage.setItem("exAnswers", JSON.stringify(answers)); // 配列などならJSON化
  localStorage.setItem("exSetName", "謎検模試セット1"); // 必要に応じてセット名も
  alert("試験終了です。結果画面に遷移します。");

  location.href = "exresult.html";
}

function confirmAndFinish() {
  const overlay = document.getElementById("confirm-overlay");
  overlay.style.display = "flex";

  document.getElementById("confirm-yes").onclick = () => {
    overlay.style.display = "none";
    finishExam();
  };

  document.getElementById("confirm-no").onclick = () => {
    overlay.style.display = "none";
  };
}

function timeUp() {
  saveCurrentAnswer();
  
  // ここで必要なデータをlocalStorageに保存
  const username = document.getElementById("username-input")?.value || "名無し";
  const score = calculateScore(answers);
  
  localStorage.setItem("exUsername", username);
  localStorage.setItem("exScore", score);
  localStorage.setItem("exAnswers", JSON.stringify(answers));
  localStorage.setItem("exSetName", "謎検模試セット1");

  alert("時間切れです。結果画面に移動します。");

  location.href = "exresult.html";
}
window.onload = () => {
  loadQuestion();
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);

  document.getElementById("answer").addEventListener("input", () => {
    saveCurrentAnswer();
    updateChapters();
  });

  const submitBtn = document.getElementById("submit-btn");
  if(submitBtn) {
    submitBtn.onclick = confirmAndFinish;
  }
};
