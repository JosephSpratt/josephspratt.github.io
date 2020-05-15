window.addEventListener('load', ()=> {
    let long, 
        lat,
        temperatureDescription = document.querySelector('.temperature-description'),
        temperatureDegree = document.querySelector('.temperature-degree'),
        locationTimezone = document.querySelector('.location-timezone'),
        temperatureSection = document.querySelector('.temperature'),
        temperatureSpan = document.querySelector('.temperature span');
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/05e5957e88c70e69ea50cc7f4950ed90/${lat},${long}`;

            fetch(api)
        .then(data =>{
            return data.json()
            })
        .then(data =>{
            console.log(data);
            const { temperature, summary, icon } = data.currently; 
            //Set DOM Elements from API.
            temperatureDegree.textContent = Math.round(temperature);
            temperatureDescription.textContent = "Currently: " + summary;
            locationTimezone.textContent = data.timezone;
            //algorithm for celcius 
            let celcius = (temperature - 32) * (5/9);
            //set icon
            setIcons(icon, document.querySelector('.icon'));

            //change the temp to celsius from farenheit
            temperatureSection.addEventListener('click', () =>{
                if(temperatureSpan.textContent === 'F'){
                    temperatureSpan.textContent = 'C'
                    temperatureDegree.textContent = Math.round(celcius);
                }
                else{
                    temperatureSpan.textContent = 'F'
                    temperatureDegree.textContent = Math.round(temperature);
                }
            });
            });
        });
    }

    function setIcons(icon, iconClass){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconClass, Skycons[currentIcon]);
    }
});