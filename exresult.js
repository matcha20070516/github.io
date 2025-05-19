// ページ読み込み時に呼ばれる処理
window.addEventListener("DOMContentLoaded", () => {
  // localStorageから情報取得（なければデフォルト）
  const username = localStorage.getItem("username") || "名無し";
  const score = localStorage.getItem("score") || "0";
  const setName = localStorage.getItem("setName") || "模試";

  // DOMに反映
  document.getElementById("username").textContent = username;
  document.getElementById("score").textContent = score;

  // ツイートリンク生成
  const tweetText = encodeURIComponent(
    `${username}さんが${setName}模試で${score}点を獲得しました！ #謎解き #TeaA`
  );
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  document.getElementById("share-link").href = tweetUrl;
});

window.onload = () => {
  const username = localStorage.getItem("exUsername") || "名無し";
  const score = localStorage.getItem("exScore") || 0;
  const answers = JSON.parse(localStorage.getItem("exAnswers") || "[]");
  const setName = localStorage.getItem("exSetName") || "謎検模試セット";

  document.getElementById("result-username").textContent = username;
  document.getElementById("result-score").textContent = `${score}点`;
  document.getElementById("result-setname").textContent = setName;
  // 必要に応じて詳細リンクやツイートリンクも生成
};
