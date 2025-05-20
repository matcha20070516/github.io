function next() {
  const setName = localStorage.getItem("setName") || "";

  if (setName.includes("謎検模試")) {
    window.location.href = "excountdown.html";
  } else {
    window.location.href = "countdown.html";
  }
}
