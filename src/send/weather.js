export async function test() {
    const pos = await getPosition();
    const result = await getCurrentData(pos.coords.latitude, pos.coords.longitude);
    const json = await result.json()
    const weatherDesc = getCurrentWeatherDesc(json);

    return `Weather is ${weatherDesc}`;
}

async function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

function getCurrentWeatherDesc(result) {
    const weather_code = result.current.weather_code;
    if (!getIsDay(result)) {
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

function getIsDay(result) {
    const is_day = result.current.is_day;
    return is_day == 1;
}

async function getCurrentData(lat, lon) {
    return await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=is_day,weather_code&timezone=auto`);
}

function getHours() {
    return new Date().getHours();
}