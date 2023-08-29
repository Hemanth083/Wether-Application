const apiKey = 'ee2b48310bbe3213f1ab1dd959f06fdf';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';


function fetchWeather(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}`;

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => resolve(data))
            .catch(error => reject(error));
    });
}

const fetchButton = document.getElementById('fetchButton');
const cityInput = document.getElementById('cityInput');
const weatherDisplay = document.getElementById('weatherDisplay');

fetchButton.addEventListener('click', () => {
    const city = cityInput.value;

    fetchWeather(city)
        .then(data => {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            weatherDisplay.innerHTML = `Temperature: ${temperature}K, Description: ${description}`;
        })
        .catch(error => {
            weatherDisplay.innerHTML = `Error fetching weather data: ${error.message}`;
        });
});
