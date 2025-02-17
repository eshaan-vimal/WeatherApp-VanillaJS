const cityTextbox = document.querySelector('.appTextbox');
const weatherCard = document.querySelector('.appWeather');


async function runApp (event)
{
    event.preventDefault();
    const city = cityTextbox.value;
    
    if(city)
    {
        try
        {
            const weatherData = await getWeather(city);
            displayWeather(weatherData);
        }
        catch (error)
        {
            errorDisplay("Please enter a valid city");
        }
    }
    else
    {
        errorDisplay("Please enter a city");
    }
}


async function getWeather (city) 
{
    const KEY = "9bcfbc335c2884c216b21da1ed747fd1";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`;

    const response = await fetch(URL);

    if(!response.ok)
    {
        throw new Error(`Please enter a valid city`);
    }

    return await response.json();
}


function getWeatherEmoji (id)
{
    switch (true)
    {
        case (id >= 200 && id < 300):
            return `⛈️`;
        
        case (id >= 300 && id < 400):
            return `💦`;

        case (id >= 400 && id < 500):
            return `🌧️`;

        case (id >= 500  && id < 600):
            return `🌨️`;

        case (id >= 700 && id < 800):
            return `🌫️`;
        
        case (id >= 800 && id < 900):
            return `☁️`;

        default:
            return `🛸`;
    }
}


function displayWeather (weatherData)
{
    const {name: city, main: {temp: temperature, humidity: humidity, pressure: pressure}, weather: [{id: id, description: description}]} = weatherData;
    const emoji = getWeatherEmoji(id);
    console.log(city);
    console.log(temperature);
    console.log(humidity);
    console.log(pressure);
    console.log(emoji);
    console.log(description);

    const cityLabel = document.createElement(`h1`);
    cityLabel.textContent = city;
    cityLabel.classList.add(`.city`);

    const tempLabel = document.createElement(`p`);
    tempLabel.textContent = `Temperature: ${(Number(temperature) - 273.15).toFixed(1)}°C`;
    tempLabel.classList.add(`temperature`);

    const humidLabel = document.createElement(`p`);
    humidLabel.textContent = `Humidity: ${humidity}%`;
    humidLabel.classList.add(`humidity`);

    const pressLabel = document.createElement(`p`);
    pressLabel.textContent = `Pressure: ${pressure} hPa`;
    pressLabel.classList.add(`pressure`);

    const infoLabel = document.createElement(`p`);
    infoLabel.textContent = description;
    infoLabel.classList.add(`info`);

    const emojiLabel = document.createElement(`p`);
    emojiLabel.textContent = emoji;
    emojiLabel.classList.add(`infoEmoji`)

    weatherCard.textContent = ``;
    weatherCard.appendChild(cityLabel);
    weatherCard.appendChild(tempLabel);
    weatherCard.appendChild(humidLabel);
    weatherCard.appendChild(pressLabel);
    weatherCard.appendChild(infoLabel);
    weatherCard.appendChild(emojiLabel);
}


function errorDisplay(error)
{
    const errorMessage = document.createElement(`p`);
    errorMessage.textContent = error;
    errorMessage.classList.add(`error`);
    errorMessage.style.fontSize = `2em`;
    errorMessage.style.padding = `20px`;

    weatherCard.textContent = ``;
    weatherCard.appendChild(errorMessage)
}