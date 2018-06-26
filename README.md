# Backseat Driver

Backseat Driver is an application built with Node.js, MongoDB, Angular2, and Express, known to developers as the MEAN Stack. 
BSD is hosted through heroku and can be found at https://www.bsdriver.herokuapp.com

![alt text](https://mattmawhinney.com/imgs/BSD_Home.png "Backseat Driver Home Page")

## Who is Backseat Driver For?

BSD is a road-trip/location finding service, much like the popular web app Foursquare. Users will come to BSD when they are looking for any type of location to visit, either using their current location or a manually entered location. 

For example, a user is visiting Toronto for a vacation and looking for a great place to have dinner, they can open BSD, select to use their current location, search for 'food' or 'resturants' or 'italian', etc and receive 10 close locations related to their query along with their rating out of 5, address, and if the location is currently open for business. This will be shown as a list of places on a sidebar along with a map containing the markers of the corresponding locations.

The user can then click on locations, from the sidebar they can save locations if they are logged in, choose to get directions to any of the locations and change their search query without leaving the dashboard.

## What does Backseat Driver run on?

On the front-end Backseat Driver uses the Google Maps, Places, and Geocode APIs to call locations from the API, geocode user address into latitude and longitudes and provide information on the various locations, including ratings and hours. The application utilizes on Angular Google Maps (AGM) API for easier implentation of Google Maps in Angular2. The application also takes advantage of the HTML5 Geolocation feature which allows BSD to access the users location directly from their browser without needing a built-in GPS like a mobile device has. This, coupled with a interface that was designed using progressive enhancement with a mobile device designed as the primary user device. These allow the application to run smoothly on any device.

On the back-end, the app uses Node.js and MongoDB to give users the ability to register for an account, login, and save locations that they find for later reference and hopefully use! In order to use Node more effectively the framework Express.js is used for our server calls, and Mongoose is used to create database queries and CRUD operations. In order to create a persistent session the back-end uses JWT to store a token in local storage that remains for 1 week or after a user has logged out, this log in allows users to save locations by taking a subset of data provided by Google's APIs and storing those in our database for persistent data across sessions.  

## Using Backseat Driver

To use BSD, simply travel to the home page, type what kind of location you are looking for and choose to use your current location or manually enter one. From there, the map will give the user 10 locations related to that search query and the location provided. The user can then view the ratings and locations of the results on both the map and the places sidebar, they can then get directions to the location or even save the location for later, if they are logged in of course. The user can also change their search filter at any time from the dashboard if they want to look for something new.

![alt text](https://mattmawhinney.com/imgs/BSD_Dash.png "Backseat Driver Dashboard Page")


