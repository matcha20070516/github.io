let count = 3;
    const countdownEl = document.getElementById("countdown");

    const interval = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(interval);
        window.location.href = "ex_problem.html"; // ← 模試用の問題ページへ遷移
      } else {
        countdownEl.textContent = count;
      }
    }, 1000);
