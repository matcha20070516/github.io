// ページ読み込み時に実行
window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const setkey = urlParams.get("setkey") || "default";

  const result = loadResult("exam", setkey);

  if (!result) {
    alert("結果データが見つかりませんでした。");
    return;
  }

  // HTMLに反映
  document.getElementById("username").textContent = result.playerName || "名無し";
  document.getElementById("score").textContent = result.score || "0";
  document.getElementById("setname").textContent = result.setName || setkey;

  // ツイートリンク生成
  const tweetText = encodeURIComponent(
    `${result.setName || setkey}の結果は【${result.score}点】でした！ #謎解き #TeaA`
  );
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  document.getElementById("share-link").href = tweetUrl;
});
