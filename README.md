# liri-node-app

Week 10 (LIRI bot) Assignment

Created during Week 10 of UCSD's Coding Bootcamp. The challenge was to use NODE JS to create a LIRI bot, like iPhone's SIRI, but takes in commands through language vs. speech. LIRI is a command line node app that takes in parameters and returns data based on one of four commands:

•	my-tweets
•	spotify-this-song
•	movie-this
•	do-what-it-says


Getting Started

•	Clone down repo.
•	Run command ‘npm install’ in Terminal or Gitbash.
•	Run command ‘node liri.js’ or one of the commands below.

What Each Command Does

1. node liri.js my-tweets
· Displays my last 20 tweets and when they were created in terminal/bash window.

2. node liri.js spotify-this-song <song name>
· Shows the following information about the song in terminal/bash window.
	o Artist(s)
	o The song’s name
	o A preview link of the song from Spotify
	o The album that the song is from
· Or, if no song is passed through, it will default to “Alcoholic” by Common Kings
		 
3. node liri.js movie-this <movie name>
• Shows the following information in terminal/bash
	o Title of the movie
	o Year the movie came out
	o IMDB rating  of the movie
	o Rotten Tomatoes rating of the movie
	o Country where the movie was produced
	o Language of the movie
	o Plot of the movie
	o Actors in the movie
• Or, if no movie is passed through, it will default to "Mr. Nobody"

4. node liri.js do-what-it-says
Takes the text from random.txt and runs the song through spotify-this-song command

Tech Used
•	Node.js
•	Twitter NPM Package -  https://www.npmjs.com/package/twitter
•	Spotify NPM Package -   https://www.npmjs.com/package/spotify
•	Request NPM Package - https://www.npmjs.com/package/request

Prerequisites 
- Node.js Download the latest version of Node https://node.js.org/en/

Built With
- Visual Studio Code

Author 
Eric Nuanes

