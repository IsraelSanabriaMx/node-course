const { saveData, readData } = require('../helpers/fileHandler');

const axios = require('axios').default;

class Searchs {
  history = [];

  constructor() {
    const data = readData();

    if (data) {
      this.history = data;
    }
  }

  get params() {
    return {
      'access_token': process.env.MAPBOX_KEY,
      'limit': 5,
      'language': 'es',
    };
  }

  get historyCapitalized() {
    return this.history.map((place) => {
      const nameArr = place.split(' ');
      let nameCapitalized = '';

      nameArr.forEach(str => {
        nameCapitalized+= `${str[0].toUpperCase()}${str.substr(1)} `; 
      });

      return nameCapitalized;
    });
  }

  async city(place = '') {
    try {
      // Http request
      const axiosInstance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.params,
      });

      const { data } = await axiosInstance.get();

      // places
      return data.features?.map((place) => ({
        id: place.id,
        name: place.place_name,
        lon: place.center[0],
        lat: place.center[1],
      }));
    } catch (error) {
      console.log({ error });
      return [];
    }
  }

  async weather(lon = '', lat = '') {
    try {
      // Http request
      const axiosInstance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: {
          lon,
          lat,
          appid: process.env.OPEN_WEATHER,
          units: 'metric',
          lang: 'es'
        },
      });

      const { data } = await axiosInstance.get();
      const { main, weather } = data;

      // places
      return {
        temp: main.temp,
        min: main.temp_min,
        max: main.temp_max,
        sensation: weather[0].description,
      };
    } catch (error) {
      console.log({ error });
      return {};
    }
  }

  addHistory(place = '') {
    const placeName = place.toLocaleLowerCase();

    if (this.history.includes(placeName)) {
      return;
    }

    this.history = this.history.splice(0, 5);

    this.history.unshift(placeName);

    // Write on file
    saveData(this.history);
  }
}

module.exports = Searchs;