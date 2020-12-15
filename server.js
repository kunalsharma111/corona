// load the things we need
var express = require('express');
var app = express();
const request = require("request"); 

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file



const url = "https://api.covid19india.org/data.json"; 

// index page 
app.get('/', async function(req, res) {
    console.log("hnji");
    
    var data = []; 
    await request(url, (error, response, body) => { 
        console.log("hi");
        if (!error && response.statusCode == 200) { 

            body = JSON.parse(body); 

            // The data have lot of extra properties 
            // We will filter it 
            for (let i = 0; i < body.statewise.length; i++) { 
                data.push({ 
                    "State": body.statewise[i].state, 

                    "Confirmed": body.statewise[i].confirmed, 

                    "Active": body.statewise[i].active, 

                    "Recovered": body.statewise[i].recovered, 

                    "Death": body.statewise[i].deaths 
                }); 
            } 

            console.log("-----Total Cases in India "
                + "and in each state-----"); 

            // Format to table 
            console.log(data);
            var mascots = data;
            var tagline = "No programming concept is complete without a cute animal mascot.";
            
            res.render('pages/index', {
                mascots: mascots,
                tagline: data
            }); 
        } 
    }) 
    // var mascots = [
    //     { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    //     { name: 'Tux', organization: "Linux", birth_year: 1996},
    //     { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
    // ];

});

// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

app.listen(8080);
console.log('8080 is the magic port');
