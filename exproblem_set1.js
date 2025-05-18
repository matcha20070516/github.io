const total = 20;  // 問題数
let current = 1;
let startTime = Date.now();
let timeLimit = 30 * 60 * 1000; // 30分（ミリ秒）
let timerInterval = null;

const answers = Array(total).fill("");  // 解答を格納する配列

// タイマー更新関数（分・秒表示）
function updateTimer() {
  const now = Date.now();
  const elapsed = now - startTime;
  const remaining = timeLimit - elapsed;

  if (remaining <= 0) {
    clearInterval(timerInterval);
    document.getElementById("timer").textContent = "終了";
    finishExam();
    return;
  }

  const m = Math.floor(remaining / (1000 * 60));
  const s = Math.floor((remaining % (1000 * 60)) / 1000);

  document.getElementById("timer").textContent =
    `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
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
    btn.disabled = false;
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

  // 結果処理はここで行う（例：ログ表示）
  console.log("全回答:", answers);

  alert("試験終了です。結果画面に遷移してください。");
  // ここで結果画面に移動などを実装可能
}

// ページ読み込み時初期化
window.onload = () => {
  loadQuestion();
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
};
