// defining Global variables
let apikey = "4b27d2badc88f7de7ccf3df1f84ffce8";
let getBtn = document.getElementById("getBtn");
let cityDisp = document.getElementById("cityDisp");
let tempDisp = document.getElementById("temperature");
let maxTemp = document.getElementById("maxTemp");
let minTemp = document.getElementById("minTemp");
let feelTemp = document.getElementById("feelTemp");
let humidity = document.getElementById("humidity");
let description = document.getElementById("description");
let tempInCelsius = 0;
let lon = null;
let lat = null;

//adding cllick function to button
getBtn.addEventListener('click', getlocation);

// defining click function
function getlocation(){
    // local variable to get city input
    let cityInput = document.getElementById("city").value;

    //fetch statement to get longitude and lattitude of cityinput
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=5&appid=${apikey}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        cityDisp.innerHTML = data[0].name;
        // updating fetched long and lat to variable
        lat = data[0].lat;
        lon = data[0].lon;

        // fetch to get weather
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            // converting temperature from fetch (in kelvin) to degree celsius
            // and updatind them to display in the web
            tempInCelsius = Math.round((data.main.temp - 273.15)*100)/100;
            tempDisp.innerHTML = tempInCelsius;
            maxTemp.innerHTML = Math.round((data.main.temp_max - 273.15)*100)/100;
            minTemp.innerHTML = Math.round((data.main.temp_min - 273.15)*100)/100;
            humidity.innerHTML = data.main.humidity;
            description.innerHTML = data.weather[0].description;
        })
        .error((error) => {
            console.error(error);
        })
    })
    .catch((error) => {
        console.error(error);
    });
}