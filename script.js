// saving the start of the url as a constant
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// here you should put your own api key
const key = ""; // <- put API key here
// the search button
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", () =>{
    searchWeather();
});

function searchWeather() {
    city = document.querySelector(".place").value;
    // sends a get request to the url and returns a promise with a response
    fetch(url + city + "&appid=" + key)
        // this uses the response in the promise when it arrives
        .then(response => {
            handleError(response);
            return response.json();
        })
        .then(data => {
            changeImage(data);
            document.getElementById("city").innerHTML = data.name;
            document.getElementById("temperature").innerHTML = Math.round(data.main.temp) + "°c";
        })
        .catch(error => {
            console.error('Fetch error:', error); // Handle any errors
        });
}

function handleError(response) {
    if (!response.ok) {
        if (response.status === 404) {
            document.getElementById("city").innerHTML = city + " er ikke en by";
            
        } else {
            document.getElementById("city").innerHTML = "Det har skjedd en feil";
        }
        document.getElementById("temperature").innerHTML = "";
        document.getElementById("weather-img").src = "";
        throw new Error('Network response was not ok');
    }
}

function changeImage(data) {
    imageInfo = data.weather[0].main;
    if (imageInfo === "Clouds") {
        description = data.weather[0].description;
        if (description === "few clouds") {
            document.getElementById("weather-img").src = "images/partly_cloudy.png";
        } else {
            document.getElementById("weather-img").src = "images/cloudy.png";
        }
    } else if (imageInfo === "Clear") {
        document.getElementById("weather-img").src = "images/sunny.png";
    } else if (imageInfo === "Snow") {
        document.getElementById("weather-img").src = "images/snowy.png";
    } else if (imageInfo === "Rain") {
        document.getElementById("weather-img").src = "images/rainy.png";
    } else if (imageInfo === "Drizzle") {
        document.getElementById("weather-img").src = "images/rainy.png";
    } else if (imageInfo === "Thunderstorm") {
        document.getElementById("weather-img").src = "images/lightning.png";
    }
}


