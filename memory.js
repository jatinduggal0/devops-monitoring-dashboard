const API_URL = "https://d4k50zoaqc.execute-api.us-east-1.amazonaws.com/metrics";

const labels = [];
const dataPoints = [];

const ctx = document.getElementById("chart").getContext("2d");

const chart = new Chart(ctx, {
  type: "line",
  data: {
    labels,
    datasets: [{
      label: "Memory %",
      data: dataPoints,
      borderWidth: 2
    }]
  }
});

const logs = document.getElementById("logs");

function addLog(msg){
  const li = document.createElement("li");
  li.innerText = msg;
  logs.appendChild(li);

  if(logs.children.length > 5){
    logs.removeChild(logs.firstChild);
  }
}

async function loadData(){
  const res = await fetch(API_URL);
  const data = await res.json();
  let metrics = data.body ? JSON.parse(data.body) : data;

  const memory = Math.round(metrics.memory || 0);

  labels.push(new Date().toLocaleTimeString());
  dataPoints.push(memory);

  if(labels.length > 15){
    labels.shift();
    dataPoints.shift();
  }

  chart.update();
  addLog("Memory: " + memory + "%");
}

setInterval(loadData, 3000);