const countdownEl = document.getElementById("countdown");
let count = 3;

const timer = setInterval(() => {
  count--;
  if (count > 0) {
    countdownEl.textContent = count;
    countdownEl.style.animation = "none";
    countdownEl.offsetHeight; // reflow
    countdownEl.style.animation = null;
  } else if (count === 0) {
    countdownEl.textContent = "スタート！";
  } else {
    clearInterval(timer);

    // localStorageからセット名を取得（sessionStorageでもよいが統一）
    const selectedSet = localStorage.getItem('setName');

    let targetPage = '';
    switch (selectedSet) {
      case '謎検模試_M':
        targetPage = 'exproblem_set1.html';
        break;
      case 'お謎検模試ろい':
        targetPage = 'exproblem_set2.html';
        break;
      case 'set3':
        targetPage = 'exproblem_set3.html';
        break;
      case '基本セット':
        targetPage = 'problem_set1.html';
        break;
      case 'まっちゃ問':
        targetPage = 'problem_set2.html';
        break;
      default:
        targetPage = 'problem_set1.html';
        break;
    }

    window.location.href = targetPage;
  }
}, 1000);
