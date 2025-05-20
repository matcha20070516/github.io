function start() {
  const name = document.getElementById("name").value.trim();
  const set = document.getElementById("set").value;
  
  if (!name) {
    alert("名前を入力してください");
    return;
  }
  localStorage.setItem("playerName", name);
  localStorage.setItem("setName", set);

  if (set.includes("謎検模試")) {
    window.location.href = "exrule.html";
  } else {
    window.location.href = "rule.html";
  }
}

function adjustViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', adjustViewportHeight);
window.addEventListener('load', adjustViewportHeight);
