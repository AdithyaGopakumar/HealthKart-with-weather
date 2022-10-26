const headerLinks = Array.from(document.querySelectorAll(".header-link"));
const footerLinks = Array.from(document.querySelectorAll(".footer-links"));
const contactLinks = Array.from(document.querySelectorAll(".contact-link"));
const product = Array.from(document.querySelectorAll(".product"));
const footer = document.querySelector(".footer");
const body = document.querySelector(".section-body");
const extras = document.querySelector(".extras");
const contactHeading = document.querySelector(".contact-heading");
const darkBulb = document.querySelector(".dark-mode-btn");
const bulbImg = document.querySelector(".bulb-img");
const logo = document.querySelector(".logo");
const couponCloseBtn = document.querySelector(".coupon-close");
const coupon = document.querySelector(".coupon-container");
const overlay = document.querySelector(".overlay");
const tempEl = document.querySelector(".temp");
const weatherEl = document.querySelector(".weather");
const cityEl = document.querySelector(".city");
const tempDegreeEl = document.querySelector(".temp-degree");

// **************************************
// Dark mode
// **************************************
const darkModeBtn = document
  .querySelector(".dark-mode-btn")
  .addEventListener("click", darkMode);

function darkMode() {
  body.classList.toggle("dark");
  console.log(body.classList);
  footer.classList.toggle("footer-dark");
  extras.classList.toggle("extras-dark");
  contactHeading.classList.toggle("contact-heading-dark");
  darkBulb.classList.toggle("dark-mode-btn-dark");
  tempEl.classList.toggle("dark-color-white");
  weatherEl.classList.toggle("dark-color-white");
  cityEl.classList.toggle("dark-color-white");
  tempDegreeEl.classList.toggle("dark-color-white");

  for (let i = 0; i < headerLinks.length; i++) {
    headerLinks[i].classList.toggle("links-dark");
  }

  for (let j = 0; j < footerLinks.length; j++) {
    footerLinks[j].classList.toggle("links-dark");
  }

  for (let k = 0; k < contactLinks.length; k++) {
    contactLinks[k].classList.toggle("links-dark");
  }

  for (let l = 0; l < product.length; l++) {
    product[l].classList.toggle("item-dark");
  }
  changeLogo();
  bulbChange();
}

function bulbChange() {
  const bodyArray = Array.from(body.classList);
  console.log(bodyArray);
  if (bodyArray.includes("dark")) {
    bulbImg.src = "https://i.ibb.co/GPPtnTn/on-light-bulb.png";
  } else {
    bulbImg.src = "https://i.ibb.co/z5bRyms/off-light-bulb.png";
  }
}
function changeLogo() {
  const bodyArray = Array.from(body.classList);
  if (bodyArray.includes("dark")) {
    logo.src = "https://i.ibb.co/Ct6LrLK/Untitled-final.png";
  } else {
    logo.src = "https://i.ibb.co/mcy9WKg/healthkart-logo-2.png";
  }
}

// **************************************
// Coupon
// **************************************
// const couponCloseBtn = document.querySelector(".coupon-close");
// const coupon = document.querySelector(".coupon-container");
// const overlay = document.querySelector(".overlay");

window.onload = openCoupon();
function openCoupon() {
  coupon.style.visibility = "visible";
  overlay.classList.remove("hidden");
}
couponCloseBtn.addEventListener("click", closeCoupon);
function closeCoupon() {
  coupon.style.visibility = "hidden";
  overlay.classList.add("hidden");
}

// **************************************
// geo and weather
// **************************************

// const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
// const tempEl = document.querySelector(".temp");
// const weatherEl = document.querySelector(".weather");
// const cityEl = document.querySelector(".city");
const weatherImgEl = document.querySelector(".weather-img");

window.onload = getlocation();

function getlocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(generateURL);
  } else {
    temp.textContent = "Error";
  }
}
function generateURL(data) {
  // console.log(data);
  let lat = data.coords.latitude;
  // console.log(`latitude ${lat}`);
  let long = data.coords.longitude;
  // console.log(`longitute ${long}`);
  const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${long}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
  // const url = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=36.167294&lon=-115.149395&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
  // console.log(url);

  const getWeatherData = async () => {
    const response = await fetch(`${url}`);
    const data = await response.json();
    // console.log(data);
    let city = data.city.name;
    cityEl.textContent = city;
    console.log(city);
    let temp = data.list[0].temp.day;
    tempEl.textContent = temp;
    console.log(temp);
    let weather = data.list[0].weather[0].description;
    weatherEl.textContent = weather;
    console.log(weather);
    let weatherIconCode = data.list[0].weather[0].icon;
    console.log(weatherIconCode);
    weatherImgEl.setAttribute(
      "src",
      `https://openweathermap.org/img/w/${weatherIconCode}.png`
    );
    return data;
  };
  getWeatherData();
}
