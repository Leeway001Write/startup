export async function updateWeather() {
    // Get location
    const pos = await getPosition();

    // Get local weather
    const result = await getRawWeatherData(pos.coords.latitude, pos.coords.longitude);
    const json = await result.json()
    const weather = extractWeatherDesc(json);

    // Save weather in local storage
    localStorage.setItem('weather', weather);

    return weather;
}

async function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function extractWeatherDesc(result) {
    let weatherDesc = "unknown";
    let precip = "unknown";

    const weather_code = result.current.weather_code;
    const rain = result.current.weather_code;
    const showers = result.current.showers;
    const snowfall = result.current.snowfall;
    
    if (!extractIsDay(result)) {
        weatherDesc = "night";
    } else if (weather_code >= 0 && weather_code <= 1) {
        weatherDesc = "sunny";
    } else if (weather_code == 2 || weather_code == 80) {
        weatherDesc = "partly cloudy";
    } else if (weather_code >= 3 && weather_code <= 65) {
        weatherDesc = "overcast";
    } else if (weather_code >= 71 && weather_code <= 75) {
        weatherDesc = "snow";
    }

    if (rain > snowfall && rain > showers) {
        precip = "rain";
    } else if (snowfall > rain && snowfall && showers) {
        precip = "snow";
    } else if (showers > rain && showers && snowfall) {
        precip = "shower";
    }

    return {
        description: weatherDesc,
        precipitation: precip
    };
}

function extractIsDay(result) {
    const is_day = result.current.is_day;
    return is_day == 1;
}

async function getRawWeatherData(lat, lon) {
    return await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=is_day,weather_code&timezone=auto`);
}