document.addEventListener("DOMContentLoad" , () => {
    const airline = document.getElementById("airline");
    const flight = document.getElementById("flight");
    const origin = document.getElementById("origin");
    const destination = document.getElementById("destination");
    const etd = document.getElementById("etd");
    const eta = document.getElementById("eta");
    const status = document.getElementById("status");
  }
);

const URL = "https://airlabs.co/api/v9/schedules?dep_iata=KUL&api_key=18df5879-c5f4-4b04-9ed7-60b86d42974e";

async function updateFlightInfo() {
  const result = await fetch(URL);
  const data = await result.json();
  const departure = "KUL";

  var table = document.querySelector(".table");

  for (i = 0; i < 5; i++) {
    var row = table.insertRow();
    var airlineData = row.insertCell(0);
    var flightNumber = row.insertCell(1);
    var originData = row.insertCell(2);
    var destinationData = row.insertCell(3);
    var depEstimation = row.insertCell(4);
    var arrEstimation = row.insertCell(5);
    var statusData = row.insertCell(6);
    
    airlineData.innerHTML = data.response[i].airline_iata;
    flightNumber.innerHTML = data.response[i].flight_number;
    originData.innerHTML = departure;
    destinationData.innerHTML = data.response[i].arr_iata;
    depEstimation.innerHTML = data.response[i].dep_time_utc;
    arrEstimation.innerHTML = data.response[i].arr_time_utc;
    statusData.innerHTML = data.response[i].status;
  }

  console.log(data.response[0]);
};

updateFlightInfo();
