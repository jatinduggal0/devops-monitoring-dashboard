const API_URL = "https://d4k50zoaqc.execute-api.us-east-1.amazonaws.com/metrics";

function goTo(page){
  window.location.href = page;
}

/* 🔥 Smooth Value Animation */
function animateValue(id, value){
  const el = document.getElementById(id);

  el.style.transform = "scale(1.2)";
  el.style.transition = "0.2s";

  el.innerText = value;

  setTimeout(() => {
    el.style.transform = "scale(1)";
  }, 200);
}

/* 🚀 Main Data Loader */
async function loadData(){
  try{
    const res = await fetch(API_URL);
    const data = await res.json();

    let metrics = data.body ? JSON.parse(data.body) : data;

    /* ✅ Safe values */
    const cpu = Math.round(Number(metrics.cpu || 0));
    const memory = Math.round(Number(metrics.memory || 0));
    const network = Math.round(Number(metrics.network || 0));

    /* 🎯 Update UI with animation */
    animateValue("cpu", cpu + "%");
    animateValue("memory", memory + "%");
    animateValue("network", network);

    /* 🔥 System Status */
    const status = document.getElementById("systemStatus");

    if(cpu > 70){
      status.innerHTML = "🔴 High Load";
      status.style.color = "#f87171";
    }else{
      status.innerHTML = "🟢 System Healthy";
      status.style.color = "#4ade80";
    }

    /* ⏱ Last Updated Time */
    document.getElementById("lastUpdated").innerText =
      "Last updated: " + new Date().toLocaleTimeString();

  }catch(e){
    console.log("API error:", e);

    const status = document.getElementById("systemStatus");
    status.innerHTML = "⚠️ API Error";
    status.style.color = "orange";
  }
}

/* 🚀 Run */
loadData();
setInterval(loadData, 5000);