// storage.js

export function saveResult(setkey, data) {
  localStorage.setItem(`result_${setkey}`, JSON.stringify(data));
}

export function loadResult(setkey) {
  const data = localStorage.getItem(`result_${setkey}`);
  return data ? JSON.parse(data) : null;
}
