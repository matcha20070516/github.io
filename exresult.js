window.addEventListener("DOMContentLoaded", () => {
  // ex問題用の保存データを取得
  const username = localStorage.getItem("exUsername") || "名無し";
  const score = localStorage.getItem("exScore") || 0;
  const answers = JSON.parse(localStorage.getItem("exAnswers") || "[]");
  const setName = localStorage.getItem("exSetName") || "謎検模試セット";

  // DOMに反映
  document.getElementById("result-username").textContent = username;
  document.getElementById("result-score").textContent = `${score}点`;
  document.getElementById("result-setname").textContent = setName;

  // ツイートリンク生成
  const tweetText = encodeURIComponent(
    `${username}さんが「${setName}」で${score}点を獲得しました！ #謎解き #TeaA`
  );
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  document.getElementById("share-link").href = tweetUrl;

  // 詳細ページへのリンク
  const detailLink = document.getElementById("detail-link");
  if (detailLink) {
    detailLink.href = "exresult_detail.html";
  }
});
