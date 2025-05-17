function start() {
  const name = document.getElementById("name").value.trim();
  const select = document.getElementById("set");
  const setText = select.options[select.selectesIndex].text;

  if (!name) {
    alert("名前を入力してください");
    return;
  }
  sessionStorage.setItem("playerName", name);
  sessionStorage.setItem("setName", setText);
      
  window.location.href = "rule.html";
}

function adjustViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', adjustViewportHeight);
window.addEventListener('load', adjustViewportHeight);
