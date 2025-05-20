// exresult.js

import { loadResult } from './storage.js';

window.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const setkey = urlParams.get("setkey") || "default";

  const result = loadResult(setkey);

  if (result) {
    document.getElementById("setname").textContent = result.setName;
    document.getElementById("username").textContent = result.username;
    document.getElementById("score").textContent = result.score;

    const tweetText = encodeURIComponent(
      `${result.setName}の結果は【${result.score}点】でした！ #謎解き #TeaA`
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    document.getElementById("share-link").href = tweetUrl;
  } else {
    // データが存在しない場合の処理
    document.getElementById("setname").textContent = "データが見つかりません";
    document.getElementById("username").textContent = "名無し";
    document.getElementById("score").textContent = "0";
  }
});
