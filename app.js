window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');
    let degreeSection = document.querySelector('.degree-section');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://yacdn.org/serve/";

            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat}, ${long}`;

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data)
                const hourly = data.hourly;
                const daily = data.daily;
                const currently = data.currently;
                const icon = data.currently.icon;
                const flags = data.flags;
                const timezone = data.timezone;
                // set DOM elements from the API
                temperatureDegree.textContent = currently.temperature;
                temperatureDescription.textContent = currently.summary;
                locationTimezone.textContent = timezone; 
                //set icon
                setIcons(icon, document.querySelector('.icon'));
                // change temp to Celsius/Fahrenheit
                degreeSection.addEventListener('click', () => {
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor((currently.temperature - 32) * (5/9));
                    }
                    else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = currently.temperature
                    }
                })
            })
        });
    }
    else {
        h1.textContent = "well fugg"
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});