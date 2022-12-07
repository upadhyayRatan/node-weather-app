const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const geoCode = require("./utils/geoCode.js");
const forecast = require("./utils/forecast");

//define path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather-app",
    name: "Ratan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ratan Upadhyay",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geoCode(req.query.address, (error, { latitude, longitude,location } = {}) => {
    if (error) {
        console.log("Inside 1st error",error);
      return res.send({error});
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        console.log("Inside 2nd error",error);
        return res.send({error});
      } else {
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        });
      }
    });
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ratan",
    message: "contact 9786746546 for help",
  });
});

app.get("/help/*", (req, res) => {
  res.render("errorPage", {
    title: "404",
    name: "Ratan Upadhyay",
    error: "Help article not found",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  res.render("errorPage", {
    title: "404",
    name: "Ratan Upadhyay",
    error: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server listening on port 3000");
});
