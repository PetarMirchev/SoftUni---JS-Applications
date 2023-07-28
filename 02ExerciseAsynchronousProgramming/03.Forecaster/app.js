function attachEvents() {
    
    let inputLocation = document.getElementById('location');
    //same as up --->  let inputLocation = document.querySelector('input#location'); //<input id="location" class='bl' type="text">
    let getWeatherBtn = document.getElementById('submit');
    let forecast = document.getElementById('forecast');
    let currentWeather = document.querySelector('div#current');
    let upcomingWeather = document.querySelector('div#upcoming');


    //Use the following codes for weather symbols:
    const conditions = {
        'Sunny': '&#x2600', // ☀
        'Partly sunny': '&#x26C5', // ⛅
        'Overcast': '&#x2601', // ☁
        'Rain':	'&#x2614', // ☂
        'Degrees': '&#176',  // °   
    }

    getWeatherBtn.addEventListener('click', getWeather);


    function getWeather(){
        fetch('http://localhost:3030/jsonstore/forecaster/locations')
        .then( (res) => res.json())
        .then( (data) => {
            //console.log(data);
            let cityIndex = data.findIndex( (el) => el.name === inputLocation.value);
            forecast.style.display = 'block';

            // if is not data throw Error!
            if(cityIndex === -1) {
                throw new Error(); //'not found!'
            }

            let cityCode = data[cityIndex].code; // "name": "New York" --> "code": "ny"
            // console.log(cityCode); // ny

            // Current weather --> fist box
            fetch(`http://localhost:3030/jsonstore/forecaster/today/${cityCode}`)
            .then( (res) => res.json())
            .then((data) => {
                //div forecasts
                const forecasts = document.createElement('div');
                forecasts.className = 'forecasts';
              
                //condition symbol span
                const conditionSymbol = document.createElement('span');
                conditionSymbol.className = 'condition symbol';
                conditionSymbol.innerHTML = conditions[data.forecast.condition]; // ☀ --> // "ny": { "forecast": { "condition": "Sunny",

                //span condition
                const condition = document.createElement('span');
                condition.className = 'condition';

                // span 1
                const span1  = document.createElement('span');
                span1.className = 'forecast-data';
                span1.textContent = data.name;
                

                // span 2
                const span2  = document.createElement('span');
                span2.className = 'forecast-data';
                span2.innerHTML = `${data.forecast.low}&#176;/${data.forecast.high}&#176;`;
                

                // span 3
                const span3  = document.createElement('span');
                span3.className = 'forecast-data';
                span3.textContent = data.forecast.condition;
    

                condition.appendChild(span1);
                condition.appendChild(span2);
                condition.appendChild(span3);
                forecasts.appendChild(conditionSymbol);
                forecasts.appendChild(condition);     
                currentWeather.appendChild(forecasts);
            });


            //Upcoming weather -->  second Box
            fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${cityCode}`)
            .then( (res) => res.json())
            .then( (data) => {
                // create main div box
                const forecastInfo = document.createElement('div');
                forecastInfo.classList = 'forecast-info';

                //data is array:
                // "forecast": [    <--------------------- !!!!!
                //     {
                //       "condition": "Partly sunny",
                //       "high": "17",
                //       "low": "6"
                //     },
                //     {
                //       "condition": "Overcast",
                //       "high": "9",
                //       "low": "3"
                //     },
                //     {
                //       "condition": "Overcast",
                //       "high": "7",
                //       "low": "3"
                //     } ],

                // for each day
                data.forecast.forEach( (el) => {
                    //Main span  ('upcoming')
                    const upcoming = document.createElement('upcoming');
                    upcoming.classList = 'upcoming';

                    //Symbol span  -->  "condition": "Partly sunny"
                    let symbolSpan = document.createElement('span');
                    symbolSpan.className = 'symbol';
                    //symbolSpan.textContent = conditions[el.condition]; //! if is used .textContent --->  &#x26C5 
                    symbolSpan.innerHTML = conditions[el.condition];   //! if is used .innerHTML  --->  ⛅
                    upcoming.appendChild(symbolSpan);


                    // Forecast data span 1
                    let span1ForecastData  = document.createElement('span');
                    span1ForecastData.className = 'forecast-data';
                    span1ForecastData.innerHTML = `${el.low}&#176;/${el.high}&#176;`;
                    upcoming.appendChild(span1ForecastData);

                    // Forecast data span 2
                    let span2ForecastData  = document.createElement('span');
                    span2ForecastData.className = 'forecast-data';
                    span2ForecastData.textContent = el.condition;
                    upcoming.appendChild(span2ForecastData);


                    forecastInfo.appendChild(upcoming);
                    
                })
                upcomingWeather.appendChild(forecastInfo);
                
            })
            .catch(() => (forecast.textContent = "Error"));
        })
        .catch(() => (forecast.textContent = "Error"));
    }   
    //console.log(inputLocation, getWeatherBtn);
}

attachEvents();