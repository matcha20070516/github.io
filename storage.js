// resultStorage.js

// 結果を保存する
function saveResult(mode, setkey, data) {
  const storageKey = `${mode}_${setkey}_result`;
  localStorage.setItem(storageKey, JSON.stringify(data));
}

// 結果を読み込む
function loadResult(mode, setkey) {
  const storageKey = `${mode}_${setkey}_result`;
  const stored = localStorage.getItem(storageKey);
  if (!stored) return null;

  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("保存された結果の読み込みに失敗しました:", e);
    return null;
  }
}
