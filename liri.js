require("dotenv").config();

var keys = require("./keys");

    // Twitter 
    // npm
    var Twitter = require("twitter");

    // Grab Twitter API info from keys.js
    var twitter = new Twitter ({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
    });

    // my account "@ponch_nuanes"
    var myTweets = {screen_name:"ponch_nuanes"};


    // Spotify 
    // npm
    var Spotify = require("node-spotify-api");

    // Grab Spotify API from keys.js
    var spotify = new Spotify ({
	id: keys.spotifyKeys.id,
	secret: keys.spotifyKeys.secret
    });
    
    // The variable to hold song user wants to search for
    var songChoice = "";


    // OMDB including Request API, whcih will be used for OMDB
    var request = require("request");

    // The variable to hold movie user wants to search for
    var omdbRequest = "";
    
    // To include the fs library
    var fs = require("fs");

    // Calls
    var userCommand = process.argv[2];

    // Twitter call
    if (userCommand === "my-tweets") {
        twitterCall();
    }

    // Spotify call
    else if (userCommand === "spotify-this-song") {
        spotifyCheck();
        spotifyCall(songChoice);
    }

    // OMDB call
    else if (userCommand === "movie-this") {
        movieCheck();
        movieCall(omdbRequest);
    }

    // do-what-it-says call
    else if (userCommand === "do-what-it-says") {
        youCanDoIt();
    }

    else {return console.log("There was an error.");
}

    // Twitter function
    function twitterCall() {
        twitter.get("statuses/user_timeline", myTweets, function(error, tweets, response) {
            if(error) {
                return console.log(error);
            } else {
                console.log("Tweets from " + myTweets.screen_name + ":");
                console.log("");
                for (var i = 0; i < tweets.length; i++) {

                    // convert to local time for tweet timestamp
                    var tweetDate = new Date(tweets[i].created_at);
                    console.log(tweets[i].text);
                    console.log(tweetDate.toString());
                    console.log("--------------------------------");
                }
            }
        });
    };
    
    // Spotify functions
    function spotifyCheck() {
        if (!process.argv[3]) {
            songChoice = "Alcoholic";
        } else {
            // for song titles containing multiple words
            for (j = 3; j < process.argv.length; j++) {
                songChoice = process.argv[j];
            } 
        }
    };

    function spotifyCall(songChoice) {
        spotify.search({type: "track", query: songChoice, limit: 1}, function(error, response) {
            if(error) {
                return console.log(error);
            }
            // Print out song info
            for (var k = 0; k < response.tracks.items[0].album.artists.length; k++) {
                console.log("Artist(s): " + response.tracks.items[0].album.artists[k].name);
                console.log("Song: " + response.tracks.items[0].name);
                console.log("Song link: " + response.tracks.items[0].external_urls.spotify);
                console.log("Album: " + response.tracks.items[0].album.name);
            }
        });
    };
    
    // OMDB functions
    function movieCheck() {
        // if the user doesn't put in a movie title, the default search will be Mr. Nobody
        if(!process.argv[3]) {
            omdbRequest = "The Departed";
        } else {
            // User choice stored in variable omdbRequest
            // for movie titles containing mulitple words
            for (var k = 3; k < process.argv.length; k++) {
                omdbRequest += process.argv[k] + "+";
            }
        }
    };

    function movieCall(omdbRequest) {
        // Variable to hold omdb url search w/ API key and omdb request
        var omdbMovie = "http://www.omdbapi.com/?apikey=5b5ae92c&t=" + omdbRequest;
        request(omdbMovie, function(error, response, body) {
            if(error) {
                return console.log(error);
            }
            //Print out movie info
            console.log("Title of the movie: " + JSON.parse(body).Title);
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Movie language: " + JSON.parse(body).Language);
            console.log("Movie plot: " + JSON.parse(body).Plot);
            console.log("Actors in the movie: " + JSON.parse(body).Actors);
        });
    };

    // do-what-it-says function
    function youCanDoIt() {
        fs.readFile("random.txt", "utf8", function(error, data) {
            if(error) {
                return console.log(error);
            } else {
                // splits what is in random.txt into strings
                //split occurs where a comma exists
                var theSplit = data.split(",");
                if(theSplit[0] === "spotify-this-song") {
                    songChoice = theSplit[1];

                    // Skips over spotifyCheck function and
                    // executes spotifyCall function with songChoice
                    spotifyCall(songChoice);
                }

                else if(theSplit[0] === "movie-this") {
                    omdbRequest = theSplit[1];

                    // Skips over omdbCheck function and
                    // executes omdbCall function with omdbRequest
                    movieCall(omdbRequest);
                }

                else if(theSplit[0] === "my-tweets") {
                    myTweets.screen_name = theSplit[1];
                    twitterCall();
                }

                else {
                    console.log("Error: There's a problem with this call.")
                }
            }
        });
    }