const total = 20;  // 問題数
let current = 1;
let timeLimit = 30 * 60; // 30分を秒単位で設定
let timerInterval = null;

const answers = Array(total).fill("");  // 謎検模試は終了時まとめてチェックなので空配列
const locked = Array(total).fill(false); // 問題ロックは使わない想定だけど保持

// 経過時間を計算するために開始時刻を保存
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

  // 入力欄に保存済みの回答をセット
  document.getElementById("answer").value = answers[current - 1];
  document.getElementById("answer").disabled = false; // いつでも編集可

  document.getElementById("message").textContent = "";
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
    btn.disabled = false;  // すべて押せる仕様
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

  // ここでanswers配列に全回答が入っているので、
  // まとめて判定処理や結果ページ遷移など行う

  // 例：console.logで確認
  console.log("全回答:", answers);

  // ここに結果画面遷移などのコードを追加してね
  // window.location.href = 'exresult_set1.html'; など

  alert("試験終了です。結果画面に遷移してください。");
}

// ページ読み込み時初期化
window.onload = () => {
  loadQuestion();
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
};
