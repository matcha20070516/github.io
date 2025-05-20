const urlParams = new URLSearchParams(window.location.search);
const setkey = urlParams.get("setkey") || "default";

const result = loadResult("exam", setkey);

const setName = setkey;
const playerName = result.username || "名無し";
const passes = result.answers?.filter(ans => ans === "PASS").length || 0;
const totalTime = Number(result.score) || 0;

    function formatTime(ms) {
      const minutes = String(Math.floor(ms / 60000)).padStart(2, '0');
      const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
      const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
      return `${minutes}:${seconds}.${centiseconds}`;
    }

    const formattedTime = formatTime(totalTime);
    document.getElementById("set-name").textContent = setName;
    document.getElementById("time").textContent = formatTime(totalTime);
    document.getElementById("passes").textContent = passes;

    // シェアリンク（Twitter用）
    const shareLink = document.getElementById("share-link");
    const shareText = encodeURIComponent(
      `「${setName}」をクリアした！
      タイム: ${formatTime(Number(totalTime))}
      パス: ${passes}
      #TeaA #謎解き`
    );
    
    shareLink.href = `https://twitter.com/intent/tweet?text=${shareText}`;
   
    function getRanking() {
      const rankingData = JSON.parse(sessionStorage.getItem("ranking")) || [];
      rankingData.push({
        name: playerName,
        setName: setName,
        time: totalTime,
        passes: passes,
      });

      rankingData.sort((a, b) => a.time - b.time);
      sessionStorage.setItem("ranking", JSON.stringify(rankingData));

      const rankingElement = document.getElementById("ranking");
      rankingElement.innerHTML = "<h3>ランキング</h3>";
      rankingData.slice(0, 10).forEach((entry, index) => {
        const div = document.createElement("div");
        div.textContent = `${index + 1}. ${entry.name} - ${formatTime(Number(entry.time))} - パス: ${entry.passes}`;
        rankingElement.appendChild(div);
      });
    }

    getRanking();
