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

        // セッションから選択されたセットを取得
        const selectedSet = sessionStorage.getItem('selectedSet');

        // 選択されたセットに応じて遷移先を決定
        let targetPage = '';
        switch (selectedSet) {
            case '謎検模試_M':
                targetPage = 'problem_set1.html'; // セット1の問題ページ
                break;
            case 'set2':
                targetPage = 'problem_set2.html'; // セット2の問題ページ
                break;
            case 'set3':
                targetPage = 'problem_set3.html'; // セット3の問題ページ
                break;
            default:
                targetPage = 'problem_set1.html'; // デフォルトでセット1
                break;
        }

        // 選択されたセットに基づいて遷移
        window.location.href = targetPage;
    }
}, 1000);
