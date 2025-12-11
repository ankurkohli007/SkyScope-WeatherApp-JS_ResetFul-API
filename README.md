# 🌤️ SkyScope – WeatherApp (JavaScript + RESTful API + Bootstrap)

SkyScope is a responsive, real-time weather web application built with **HTML**, **BOOTSTRAP**, and **JavaScript**, and powered by a **RESTful weather API**.  

It allows users to search for any city or location worldwide and instantly view up to date weather conditions in a sleek, user friendly interface.

---

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Bootstrap-5.0+-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/HTML5-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/API-RESTful-green?style=for-the-badge" />
</p>

---

## 🚀 Live Demo

## 🚀 Live Demo of Portfolio
Check out the live version of this game: [Click here for weather update](https://ankurkohli007.github.io/SkyScope-WeatherApp-JS_ResetFul-API/)
---

## 📁 Project Structure

```bash
SkyScope-WeatherApp-JS_ResetFul-API/
│
├── index.html # Main UI with Bootstrap components
├── app.js # Core weather logic + API integration
└── README.md # Project documentation
```


---

## 🔍 Overview of the Project

SkyScope allows users to:

- Search for any global city and fetch realtime weather
- View temperature, humidity, AQI, localtime, last weather updated, sunrise and sunset.
- See weather condition icons dynamically
- Get smooth UI updates without refreshing the page
- Experience fully responsive layout via Bootstrap
- View animation as per the weather condition

---

## 🧠 Detailed File Explanation

### 1️⃣ **index.html — UI Layout (Built with Bootstrap)**

**The HTML file contains:**

- A **Bootstrap container** for responsive layout  
- A **search bar** to enter city names  
- Bootstrap **cards** and **grid layouts** to present weather details  
- Placeholder elements updated dynamically using JavaScript  
- Included external resources:
  - Bootstrap CDN
  - `app.js`

**Key UI Components:**

- Search Input & Button (`form-control`, `btn`, `input-group`)
- Weather Result Card
- Temperature Display Section
- Additional Info (humidity, sunrise, sunset, AQI, and so on.)
- Finally, last searched city-weather in a table format

**Bootstrap ensures:**

- Consistent styling  
- Web responsive design  
- Zero custom CSS required  

---

### 2️⃣ **app.js — Core Application Logic**

This is the main engine of the app.

#### 🧠 Detailed JavaScript Logic (app.js)

The JavaScript file is the core engine of the SkyScope Weather App.  
It handles API communication, weather animations, dynamic UI updates, background effects, and data rendering.

---

#### 1️⃣ API Integration (RapidAPI – WeatherAPI.com)

Weather data is fetched using the following API configuration:

```javascript
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'YOUR_API_KEY',
        'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
    }
};

The app calls the endpoint:
```bash
https://weatherapi-com.p.rapidapi.com/forecast.json?q={city}&days=1&aqi=yes
```

##### Data retrieved includes:

- Temperature (°C)
- Feels like temperature
- Weather condition text
- Min/max forecast temperatures
- Humidity
- Sunrise & sunset
- Air Quality (AQI, PM2.5, PM10)
- Local time and last-updated time

#### 2️⃣ Real-Time Weather Animations (Canvas)

The app draws animated weather effects using **HTML5 Canvas**, enhancing the visual experience. Implemented animations:

- Rain – Falling raindrops
- Snow – Falling snow particles
- Each weather animation is created using:
- A Particle class
- A particle generator
- A continuously running animation loop (requestAnimationFrame)

**The system:**

- Automatically detects weather conditions
- Starts or stops the animation accordingly
- Ensures smooth and optimized performance

#### 3️⃣ Dynamic Background System (Day/Night + Weather Based)

The app changes the entire background theme based on:

- Weather condition (rain, clear, cloudy, storm, fog, snow, etc.)
- Time of day (day or night)

**Logic includes:**

- Parsing local time from API
- Determining day/night (6 AM – 6 PM = day)
- Applying CSS classes like:
  - sunny day, clear night
  - rainy day, rainy night
  - cloudy day, cloudy night
  - snowy day, snowy night
  - foggy day, foggy night
  - stormy

These classes define background gradients or images applied through Bootstrap-based layout.


