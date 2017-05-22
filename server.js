const express = require('express');
const handlebars = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

handlebars.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} at ${req.url}`;

    fs.appendFile('server.log', log + '\n');
    next();
});

handlebars.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});
handlebars.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to the newly created website with express and node.'
    });
});

app.get('/about', (req, res) => {
    res.render('basic.hbs', {
        pageTitle: "About Page"
    });
});

app.get('/projects', (req, res) => {
    res.render('basic.hbs', {
        pageTitle: "Projects Page"
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Unable to fulfil your request.",
        success: false
    });
});

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}.`);
});
