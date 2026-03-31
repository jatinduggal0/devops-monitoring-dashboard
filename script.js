const API_URL = "https://d4k50zoaqc.execute-api.us-east-1.amazonaws.com/metrics";

function goTo(page){
  window.location.href = page;
}

async function loadData(){
  try{
    const res = await fetch(API_URL);
    const data = await res.json();
    let metrics = data.body ? JSON.parse(data.body) : data;

    const cpu = Math.round(metrics.cpu || 0);
    const memory = Math.round(metrics.memory || 0);
    const network = Math.round(metrics.network || 0);

    document.getElementById("cpu").innerText = cpu + "%";
    document.getElementById("memory").innerText = memory + "%";
    document.getElementById("network").innerText = network;

    const status = document.getElementById("systemStatus");

    if(cpu > 70){
      status.innerText = "⚠️ High Load";
      status.style.color = "red";
    }else{
      status.innerText = "🟢 System Healthy";
      status.style.color = "lightgreen";
    }

  }catch(e){
    console.log("API error");
  }
}

loadData();
setInterval(loadData, 5000);