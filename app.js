//jshint esversion:6
const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

let foodData;
app.get("/", function(req, res) {
  res.render("index");
})

app.get("/login", function(req, res) {
  res.render("login");
});

app.get("/register", function(req, res) {
  res.render("register");
});




app.post("/", function(req, res) {
  let foodName = req.body.foodname;
  const url = "https://api.spoonacular.com/recipes/complexSearch?query=" + foodName + "&apiKey=d53fc45a7280439b93bb202a140a5e36&id654959"

  var str = "";
  callback = function(response) {

    response.on('data', function(chunk) {
      str += chunk;
    });

    response.on('end', function() {
      foodData = JSON.parse(str);
      res.render("list", {
        foodData: foodData
      });
    });
  }

  var req = https.request(url, callback).end();

});

app.get("/cookingsteps/:foodTitle", function(req, res) {
  let id;
  foodData.results.forEach(function(data) {
    if (data.title === req.params.foodTitle) {
      id = data.id;
    }
  });

  const recipeUrl = "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=d53fc45a7280439b93bb202a140a5e36&id654959"

  var str1 = "";
  callback = function(response) {

    response.on('data', function(chunk) {
      str1 += chunk;
    });

    response.on('end', function() {
      const recipeData = JSON.parse(str1);
      res.render("cookingsteps", {
        recipeData: recipeData
      });
    });
  }

  var req = https.request(recipeUrl, callback).end();

});






app.listen(port, function() {
  console.log("Server started on port 3000");
})
