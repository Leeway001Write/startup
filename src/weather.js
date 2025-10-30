export async function updateWeather() {
    // Get location
    const pos = await getPosition();

    // Get local weather
    const result = await getRawWeatherData(pos.coords.latitude, pos.coords.longitude);
    const json = await result.json()
    const weatherDesc = extractWeatherDesc(json);

    // Save weather in local storage
    localStorage.setItem('weather', weatherDesc);

    return weatherDesc;
}

async function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function extractWeatherDesc(result) {
    const weather_code = result.current.weather_code;
    if (!extractIsDay(result)) {
        return "night";
    } else if (weather_code >= 0 && weather_code <= 1) {
        return "sunny";
    } else if (weather_code == 2 || weather_code == 80) {
        return "partly cloudy";
    } else if (weather_code >= 3 && weather_code <= 65) {
        return "overcast";
    } else if (weather_code >= 71 && weather_code <= 75) {
        return "snow";
    }

    return "unknown";
}

function extractIsDay(result) {
    const is_day = result.current.is_day;
    return is_day == 1;
}

async function getRawWeatherData(lat, lon) {
    return await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=is_day,weather_code&timezone=auto`);
}