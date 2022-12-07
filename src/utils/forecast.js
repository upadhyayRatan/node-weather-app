const axios = require("axios");
const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=87c647205912c1ebc5d905eaadcb2540&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
  console.log(url);
  axios
    .get(url, {
      headers: {
        "Accept-Encoding": null,
      },
    })
    .then(({ data }) => {
      if (data.error) {
        callback("Please provide valid location details", undefined);
      } else {
        let weatherData = data.current;
        callback(
          undefined,
          "It is " +
            weatherData.temperature +
            " degree fahreniet and feels like " +
            weatherData.feelslike +
            " degree fahreniet"
        );
      }
    })
    .catch((error) => {
      if (err.response === undefined) {
        callback("Unable to reach weather services", undefined);
      } else {
        callback("Please provide valid location details", undefined);
      }
    });
};

module.exports = forecast;
