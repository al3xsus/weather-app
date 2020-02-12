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
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }
    else {
        let body = document.body
        body.innerHTML = "<h1>Can't access navigator.geolocation</h1>"
    }

    function setIcons(icon, iconID, color) {
        const skycons = new Skycons({color});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    async function processJSONRequest(response) {
        if (!response.ok) {
            throw Error(response.url + '\n' + response.statusText);
        }
        try {
            return await response.json()
        }
        catch (err) {
            throw Error(response.url + " " + "returned incorrect JSON");
        }
    }

    function geoSuccess(position) {
        long = position.coords.longitude;
        lat = position.coords.latitude;


        fetch("settings.local.json")
                .then(processJSONRequest)
                .then(data => {

                    const secretKey = data["dark-sky-secret-key"];

                    const proxy = data["proxy"];

                    const weatherAPI = data["weather-api"]

                    const api = `${proxy}${weatherAPI}${secretKey}/${lat}, ${long}`;
        
                    fetch(api)
                    .then(processJSONRequest)
                    .then(data => {
                        console.log(data)
                        const currently = data.currently;
                        const icon = data.currently.icon;
                        const timezone = data.timezone;
                        // set DOM elements from the API
                        temperatureDegree.textContent = currently.temperature;
                        temperatureDescription.textContent = currently.summary;
                        locationTimezone.textContent = timezone; 
                        //set icon
                        setIcons(icon, document.querySelector('.icon'), "white");

                        //dynamic favicon
                        let favicon = document.querySelector("link[rel*='icon']");
                        let faviconSize = 32;
                        let canvas = document.createElement('canvas');
                        canvas.width = faviconSize;
                        canvas.height = faviconSize;
                        setIcons(icon, canvas, "black");
                        favicon.href = canvas.toDataURL('image/gif');
                      
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
                    .catch(error => { throw Error(error) })
        
                })
                .catch(error => alert(error.message));

    }
      
    function geoError(err) {
        let body = document.body
        body.innerHTML = "<h1>Press 'allow' to give me your location</h1>"
    }
});