// API
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'f10f26966bmsh25a2cf5a9a2e5d8p1b3a7cjsn3047b2b877ad',
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
    }
};

// // Function to change background based on weather
// function updateBackground(conditionText) {
//     const body = document.body;
//     const condition = conditionText.toLowerCase();

//     // Remove all previous weather classes
//     body.className = '';

//     // Check weather condition and add appropriate class
//     if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
//         body.classList.add('rainy');
//     }
//     else if (condition.includes('sunny') || condition.includes('clear')) {
//         body.classList.add('sunny');
//     }
//     else if (condition.includes('cloud') || condition.includes('overcast')) {
//         body.classList.add('cloudy');
//     }
//     else if (condition.includes('snow') || condition.includes('sleet') || condition.includes('blizzard')) {
//         body.classList.add('snowy');
//     }
//     else if (condition.includes('thunder') || condition.includes('storm')) {
//         body.classList.add('stormy');
//     }
//     else if (condition.includes('mist') || condition.includes('fog')) {
//         body.classList.add('foggy');
//     }
//     else {
//         body.classList.add('default');
//     }
// }

// Function to change background based on weather AND time of day
function updateBackground(conditionText, localtime) {
    const body = document.body;
    const condition = conditionText.toLowerCase();

    // Determine if it's day or night (based on hour)
    const date = new Date(localtime.replace(" ", "T"));
    const hour = date.getHours();
    const isNight = hour < 6 || hour >= 18; // Night is 6 PM to 6 AM

    // Remove all previous weather classes
    body.className = '';

    // Apply background based on condition AND time
    if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('shower')) {
        body.classList.add(isNight ? 'rainy-night' : 'rainy-day');
    }
    else if (condition.includes('sunny') || condition.includes('clear')) {
        body.classList.add(isNight ? 'clear-night' : 'sunny-day');
    }
    else if (condition.includes('cloud') || condition.includes('overcast') || condition.includes('partly cloudy')) {
        body.classList.add(isNight ? 'cloudy-night' : 'cloudy-day');
    }
    else if (condition.includes('snow') || condition.includes('sleet') || condition.includes('blizzard')) {
        body.classList.add(isNight ? 'snowy-night' : 'snowy-day');
    }
    else if (condition.includes('thunder') || condition.includes('storm')) {
        body.classList.add('stormy'); // Storms are dark regardless
    }
    else if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze')) {
        body.classList.add(isNight ? 'foggy-night' : 'foggy-day');
    }
    else {
        body.classList.add(isNight ? 'clear-night' : 'sunny-day');
    }
}

// formatting time
function formatToAMPM(dateString) {
    const date = new Date(dateString.replace(" ", "T"));
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 → 12
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes} ${ampm}`;
}

// fetch weather from API
async function getWeather(city) {
    try {
        cityName.innerHTML = city;
        const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=1&aqi=yes`;

        const response = await fetch(url, options);
        const result = await response.json();

        const current = result.current;
        const forecastDay = result.forecast.forecastday[0].day;

        const sunrise = result.forecast.forecastday[0].astro.sunrise;
        const sunset = result.forecast.forecastday[0].astro.sunset;

        const localTimeAMPM = formatToAMPM(result.location.localtime);
        const updatedTimeAMPM = formatToAMPM(current.last_updated);

        // country & region
        const location = result.location;
        document.querySelector("#country").textContent = location.country;
        // document.querySelector("#region").textContent = location.region;



        console.log("Temperature (°C):", current.temp_c);
        console.log("Feels like (°C):", current.feelslike_c);
        console.log("Condition:", current.condition.text);
        // console.log("Local time:", result.location.localtime);
        console.log("Local time:", localTimeAMPM);
        // console.log("Weather last updated:", current.last_updated);
        console.log("Weather last updated:", updatedTimeAMPM);
        console.log("Humidity (°C):", current.humidity);

        //for FE
        document.querySelector("#temp_c").textContent = current.temp_c + " °C";
        document.querySelector("#feels_temp").textContent = current.feelslike_c + " °C";
        document.querySelector("#condition_text").textContent = current.condition.text;
        // document.querySelector("#last_updated").textContent = current.last_updated;
        // document.querySelector("#localtime").textContent = result.location.localtime;
        document.querySelector("#localtime").textContent = localTimeAMPM;
        document.querySelector("#last_updated").textContent = updatedTimeAMPM;



        console.log("Min Temp (°C):", forecastDay.mintemp_c);
        console.log("Max Temp (°C):", forecastDay.maxtemp_c);

        console.log("Sunrise :", sunrise);
        console.log("Sunset", sunset);

        // for FE
        document.querySelector("#min_temp").textContent = forecastDay.mintemp_c + " °C";
        document.querySelector("#max_temp").textContent = forecastDay.maxtemp_c + " °C";
        document.querySelector("#humidity").textContent = current.humidity + " %";

        document.querySelector("#sunrise").textContent = sunrise;
        document.querySelector("#sunset").textContent = sunset;

        // setting bg according to weather
        // document.querySelector("#condition_text").textContent = current.condition.text;
        document.querySelector("#condition_text").textContent = current.condition.text;
        // Update background based on weather
        // updateBackground(current.condition.text);
        // Update background based on weather AND time of day
        updateBackground(current.condition.text, result.location.localtime);

        if (current.air_quality) {
            console.log("Air Quality Index (US EPA):", current.air_quality["us-epa-index"]);
            console.log("PM2.5:", current.air_quality.pm2_5);
            console.log("PM10:", current.air_quality.pm10);

            // for FE
            document.querySelector("#aqi").textContent = current.air_quality["us-epa-index"];
            document.querySelector("#pm2_5").textContent = current.air_quality.pm2_5 + " µg/m³";
            document.querySelector("#pm10").textContent = current.air_quality.pm10 + " µg/m³";
        }

        // console.log(result); // full response

        // Prepare data for table update
        const tableData = {
            temp_c: current.temp_c,
            feelslike_c: current.feelslike_c,
            condition_text: current.condition.text,
            local_time: formatToAMPM(result.location.localtime),
            last_updated: formatToAMPM(current.last_updated),
            aqi: current.air_quality ? current.air_quality["us-epa-index"] : null,
            pm2_5: current.air_quality ? current.air_quality.pm2_5 : null,
            pm10: current.air_quality ? current.air_quality.pm10 : null,
        };

        // Update the table row for this city
        updateTableRow(city, tableData);

    } catch (error) {
        console.error(error);
    }
}

// update table()
function updateTableRow(city, data) {
    // Get all table rows in tbody
    const tbody = document.querySelector("#weatherTable tbody");
    let found = false;

    // Check if city already exists in table
    const rows = tbody.querySelectorAll("tr");
    for (const row of rows) {
        // The city name is in the first cell (th)
        const cityCell = row.querySelector("th");

        if (cityCell && cityCell.textContent.trim().toLowerCase() === city.toLowerCase()) {
            // Now update the relevant columns (td)
            const cells = row.querySelectorAll("td");

            cells[0].textContent = data.temp_c + " °C";
            cells[1].textContent = data.feelslike_c + " °C";
            cells[2].textContent = data.condition_text;
            cells[3].textContent = data.local_time;
            cells[4].textContent = data.last_updated;
            cells[5].textContent = data.aqi ?? "-";
            cells[6].textContent = data.pm2_5 ? data.pm2_5 + " µg/m³" : "-";
            cells[7].textContent = data.pm10 ? data.pm10 + " µg/m³" : "-";

            // return; // done updating, exit the function
            found = true;
            break;
        }
    }


    // Add new row if city not found
    if (!found) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <th scope="row" class="text-start">${city}</th>
            <td>${data.temp_c} °C</td>
            <td>${data.feelslike_c} °C</td>
            <td>${data.condition_text}</td>
            <td>${data.local_time}</td>
            <td>${data.last_updated}</td>
            <td>${data.aqi ?? "-"}</td>
            <td>${data.pm2_5 ? data.pm2_5 + " µg/m³" : "-"}</td>
            <td>${data.pm10 ? data.pm10 + " µg/m³" : "-"}</td>
        `;
        tbody.appendChild(newRow);

        // Remove first row if more than 5 rows exist
        if (tbody.rows.length > 5) {
            tbody.removeChild(tbody.rows[0]);
        }
    }
}

// handle search buuton
const submit = document.querySelector("#submit");
const cityInput = document.querySelector("#city");
const cityName = document.querySelector("#cityName");

submit.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    // Shows the searched city
    cityName.innerHTML = city;

    getWeather(city);
});

// default city
getWeather("Genoa");