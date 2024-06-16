// Weather Application

const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card'); 
const apiKey = 'api key... get your own at https://openweathermap.org/'; 

weatherForm.addEventListener('submit', async event => {
    event.preventDefault();
    const city = cityInput.value;
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError('Please enter a city');
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    } 
    return await response.json();
}

function displayWeatherInfo(data) {
    const {name: city,
           main: {temp, humidity},
           weather: [{description, id}]} = data;
    card.textContent = '';
    card.style.display = 'flex';
    const cityDisplay = document.createElement('h1');
    cityDisplay.textContent = city;
    cityDisplay.classList.add('cityDisplay');
    const descDisplay = document.createElement('p');
    descDisplay.textContent = description;
    descDisplay.classList.add('descDisplay');
    const tempDisplay = document.createElement('p');
    tempDisplay.textContent = `Temperature: ${temp}°C`;
    tempDisplay.classList.add('tempDisplay');
    const humidityDisplay = document.createElement('p');
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add('humidityDisplay');
    const weatherEmoji = document.createElement('p');
    weatherEmoji.textContent = getWeatherEmoji(id);
    weatherEmoji.classList.add('weatherEmoji');
    card.appendChild(cityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    if (weatherId >= 200 && weatherId <= 300) {
        return '⛈️';
    } else if (weatherId >= 300 && weatherId <= 500) {
        return '🌧️';
    } else if (weatherId >= 500 && weatherId <= 600) {
        return '🌧️';
    } else if (weatherId >= 600 && weatherId <= 700) {
        return '🌨️';
    } else if (weatherId >= 700 && weatherId < 800) {
        return '🌫️';
    } else if (weatherId === 800) {
        return '☀️';
    } else if (weatherId >= 801 && weatherId <= 810) {
        return '☁️';
    } else {
        return '❓';
    }
}

function displayError(message) {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');
    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}