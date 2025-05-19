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
