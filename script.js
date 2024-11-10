const apiKey = '93362554d6f63e8646e359afb8fd6696'; // Replace with your API key

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const errorMessage = document.getElementById('errorMessage');
    const weatherDetails = document.getElementById('weatherDetails');

    if (!city) {
        errorMessage.textContent = 'Please enter a city name.';
        errorMessage.classList.remove('hidden');
        weatherDetails.classList.add('hidden');
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );
        const data = await response.json();

        if (data.cod !== 200) {
            errorMessage.textContent = 'City not found. Please try again.';
            errorMessage.classList.remove('hidden');
            weatherDetails.classList.add('hidden');
            return;
        }

        errorMessage.classList.add('hidden');
        displayWeather(data);
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please try again later.';
        errorMessage.classList.remove('hidden');
        weatherDetails.classList.add('hidden');
    }
}

function displayWeather(data) {
    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('temperature').textContent = data.main.temp;
    document.getElementById('feelsLike').textContent = data.main.feels_like;
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('windSpeed').textContent = data.wind.speed;
    document.getElementById('pressure').textContent = data.main.pressure;
    document.getElementById('sunrise').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById('sunset').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    document.getElementById('weatherDetails').classList.remove('hidden');
}
