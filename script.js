const API_URL = "https://d4k50zoaqc.execute-api.us-east-1.amazonaws.com/metrics";

function goTo(page){
  window.location.href = page;
}

async function loadData(){
  try{
    const res = await fetch(API_URL);
    const data = await res.json();
    let metrics = data.body ? JSON.parse(data.body) : data;

    document.getElementById("cpu").innerText = Math.round(metrics.cpu || 0) + "%";
    document.getElementById("memory").innerText = Math.round(metrics.memory || 0) + "%";
    document.getElementById("network").innerText = Math.round(metrics.network || 0);
  }catch(e){
    console.log("API error");
  }
}

loadData();
setInterval(loadData, 5000);