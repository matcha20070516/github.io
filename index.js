function start() {
  const name = document.getElementById("name").value.trim();
  const set = document.getElementById("set").value;

  if (!name) {
    alert("名前を入力してください");
    return;
  }

  localStorage.setItem("playerName", name);
  localStorage.setItem("setName", set);

  const isExam = set.includes("謎検模試");
  const setKey = set; // 必要なら加工してもよい

  const nextPage = isExam ? "exrule.html" : "rule.html";
  const mode = isExam ? "exam" : "normal";

  // クエリにセット名とモードを追加して遷移
  window.location.href = `${nextPage}?setkey=${encodeURIComponent(setKey)}&mode=${mode}`;
}

function adjustViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', adjustViewportHeight);
window.addEventListener('load', adjustViewportHeight);
