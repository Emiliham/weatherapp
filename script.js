
// the search button
const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", () =>{
    searchWeather();
});

function searchWeather() {
    city = document.querySelector(".place").value;
    // sends a get request to the url and returns a promise with a response
    fetch(`http://hamang.dev/weather-api/weather/${city}`)
        // this uses the response in the promise when it arrives
        .then(response => {
            handleError(response);
            return response.json();
        })
        .then(data => {
            changeImage(data);
            document.getElementById("city").innerHTML = city;
            document.getElementById("temperature").innerHTML = Math.round(data.temperature) + "°c";
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
    imageInfo = data.imageInfo;
    if (imageInfo === "Clouds") {
        description = data.description;
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


