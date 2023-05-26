const gp = document.querySelector("[GA]");
const search = document.querySelector(".search");
const box = document.querySelector(".boxes");
const bar = document.querySelector(".navbar");
const bar2 = document.querySelector(".bar");
const img = document.querySelector(".img");
const yw = document.querySelector(".yw");
const user_info = document.querySelector(".user-info");
const API_KEY = "aff9c278472db2f6b0f7ac627fbdabe4";
const cn = document.querySelector("[data-CityName]");
const temp = document.querySelector(".temperature");
const country = document.querySelector("[data-Country]");
const windspeed = document.querySelector("[data-Windspeed]");
const humid = document.querySelector("[data-Humidity]");
const cl = document.querySelector(".showcloud");
const sb = document.getElementById("sb");
const wd = document.querySelector("[data-WeatherDesc]");
const searchbutton = document.querySelector(".searching");
const weatherIcon = document.querySelector("[data-WeatherIcon]");
const countryIcon = document.querySelector("[data-Country");
const load=document.querySelector("#loader");



var a = 0;

// let city = "goa";
// let lattitude =43.70011;
// let long = 	-79.4163;


async function fetchWeatherDetails(city) {
load.setAttribute("style", "scale:1");
    try{
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();
        load.setAttribute("style", "scale:0");
        console.log('DATA =', data);
        box.setAttribute("style", "scale:1");
        user_info.setAttribute("style", "scale:1");
        
        // renderWeatherInfo(data);
                showYourWeather(data);

    }
    catch(e) {
        console.log('FAILED',e);
    }


}


//FUNCTION TO GET TEMPERATURE THROUGH LAT AND LONG
async function getCustomWeatherDetails(lattitude,long) {
    load.setAttribute("style", "scale:1");
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${long}&appid=${API_KEY}&units=metric`
        );
        const result = await response.json();
        load.setAttribute("style", "scale:0");
        box.setAttribute("style", "scale:1");
         user_info.setAttribute("style", "scale:1");
        console.log('DATA =>', result);

        // renderWeatherInfo(result);
        showYourWeather(result);
    }
    
    catch (e) {
        console.log('ERROR IN SECOND FUNCTION',e);
    }
}

// function renderWeatherInfo(data) {
//       let newPara = document.createElement('p');
//      newPara.textContent =  `${data?.main?.temp.toFixed(2)} Celcius`;
//      document.body.appendChild(newPara);
    
// }

search.addEventListener('click', () => {
    box.setAttribute("style", "scale:0");
    img.setAttribute("style", "scale:0");
    user_info.setAttribute("style", "scale:0");
    bar.setAttribute("style", "scale:1");
     yw.setAttribute("style","background-color:rgb(6, 133, 244)");
    search.setAttribute("style", " background:rgb(203, 220, 203,0.5)");


});

yw.addEventListener('click', () => {
    if (a >= 1) {
     box.setAttribute("style", "scale:0");
    user_info.setAttribute("style", "scale:0");
     img.setAttribute("style", "scale:0");
        user_info.setAttribute("style", "scale:0");
         getLocation();
    }
    else {
    box.setAttribute("style", "scale:0");
    img.setAttribute("style", "scale:1");
    user_info.setAttribute("style", "scale:0");
    }
    bar.setAttribute("style", "scale:0");
    yw.setAttribute("style", " background:rgb(203, 220, 203,0.5)");
    search.setAttribute("style", "background-color:rgb(6, 133, 244)");
        

});

//IF GRANT PERMISSION BUTTON IS CLICKED THEN,
gp.addEventListener('click', () => {
    a++;
    img.setAttribute("style", "scale:0");
    user_info.setAttribute("style", "scale:1");
    getLocation();
    
});

//CHECK IF THE BROWSER SUPPORTS HTML GEOLOCATION API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        console.log('NOT SUPPORTING GEOLOCATION');
    }
}

//FUNCTION TO GET LATITUDE AND LONGITUDE
function showPosition(position) {
    let latt = position.coords.latitude;
    let longi = position.coords.longitude;
    getCustomWeatherDetails(latt, longi);

}

//FUNCTION TO DISPLAY VALUES OBTAINED FROM API
function showYourWeather(data) {
    cn.textContent = `${data?.name}`;
    temp.textContent = `${data?.main?.temp.toFixed(2)} ºC`;
    windspeed.textContent =`${data?.wind?.speed}m/s`;
    wd.textContent = `${data?.weather[0]?.description}`;
    humid.textContent = `${data?.main?.humidity}%`;
    cl.textContent = `${data?.clouds?.all}%`;
    weatherIcon.src = `http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`;
    countryIcon.src = `https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
}

//TO GET CITY AND DISPLAY THE VALUES
searchbutton.addEventListener('click', () => {
    box.setAttribute("style", "scale:0");
    user_info.setAttribute("style", "scale:0");
    let str = sb.value;
    console.log(str);
    fetchWeatherDetails(str);
});

   
