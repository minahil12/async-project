'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderData = function (data, className = '') {
  const hml = ` <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4></h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', hml);
};

const renderError = function (message) {
  countriesContainer.insertAdjacentText(
    'afterbegin',
    `Something went wrong. ${message}. Try again! `
  );
};

const getJson = function (url, errorMessage = '') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(errorMessage);

    return response.json();
  });
};
// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

//getting data the old way using xmlhttp request
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const hml = ` <article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4></h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', hml);

    countriesContainer.style.opacity = 1;
  });
};

const renderData = function (data, className = '') {
  const hml = ` <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4></h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', hml);

  countriesContainer.style.opacity = 1;
};

const getCountryDataAndNeighbour = function (country) {
  //Ajax call for country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    renderData(data);

    //Ajax call for country 2

    const neighbour = data.borders?.[0];
    console.log(neighbour);
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);
      renderData(data2, 'neighbour');
    });
  });
};

*/

//Getting data using AJAX

/*
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => {
      renderData(data[0]);
      console.log(data[0]);
      return fetch(`https://restcountries.com/v2/alpha/${data[0].borders[0]}`);
    })
    .then(response => response.json())
    .then(data => renderData(data, 'neighbour'))
    .catch(function (error) {
      {
        console.log(error);
        console.error(error);
        renderError(error.message);
      }
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

*/

//country data using helper functions

/*
const getCountryData = function (country) {
  getJson(`https://restcountries.com/v2/name/${country}`, `Country not found`)
    .then(data => {
      renderData(data[0]);
      console.log(data[0]);

      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour countries');
      return getJson(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderData(data, 'neighbour'))
    .catch(function (error) {
      {
        console.log(error);
        console.error(error);
        renderError(error.message);
      }
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('australia');
});
*/
///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will 
use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates,
 examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like
 a city and country name. Use this API to do reverse geocoding: 
 https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}.
The AJAX call will be done to a URL with this 
format: https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=52.508&longitude=13.381.
//  Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location.
 Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. 
This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the 
promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result,
 and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to
 type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474



const whereAmI = function (lat, lng) {
  //console.log(lat, lng);
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
  )
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      //console.log(data);
      //console.log(`You are in ${data.city},${data.countryName}`);

      console.log(`name ${data.countryName}`);
      return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`country not found`);
      return res.json();
    })
    .then(data => renderData(data[0]))
    .catch(erro => {
      //console.log(`${erro}`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};
whereAmI('-33.933', '18.474');
*/

//java asynchrnous evnts experimenting
/*
console.log('test start');
setTimeout(() => console.log('Timer of 0 seconds'), 0);
Promise.resolve('Immedietly resolved promise 1 ').then(res => console.log(res));
Promise.resolve('Immedietly resolved promise 2  ').then(res => {
  for (let i = 0; i < 100000; i++) {}
  console.log(res);
});
console.log('test end');
*/

//Promises from scratch

const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery is happening!');

  setTimeout(() => {
    if (Math.random() > 0.5) resolve('Yay, you Won!');
    else reject(new Error('Boo, you lost!'));
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//promsifying the geolocation function

const getLocation = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getLocation().then(pos => console.log(pos));

const whereAmI = function () {
  getLocation()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;
      return fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
    })

    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      //console.log(data);
      //console.log(`You are in ${data.city},${data.countryName}`);

      console.log(`name ${data.countryName}`);
      return fetch(`https://restcountries.com/v2/name/${data.countryName}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`country not found`);
      return res.json();
    })
    .then(data => renderData(data[0]))
    .catch(erro => {
      //console.log(`${erro}`);
    })
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI);
