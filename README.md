## Beosmapper
###OpenStreetMap Entrance Collection Application


Beosmapper is a web based application that helps OpenStreetMap users to collect information about different map features into the OpenStreetMap database. Presently, in the scope of our project, only information about building entrances can be collected. However, in the future the application can be extended to facilitate the collection of other OpenStreetMap features such as public transportation stops or post boxes.

Beosmapper creation was motivated by Blindsquare's need for entrance-location data, therefore the application is focused in the collection of accessibility attributes to help physically disabled people. The project was developed in the scope of the course GIS Application Development in Aalto University.

Beosmapper runs entirely on the client side, no data is stored in the server and the communication between the user and OSM is done directly. The application is built with JavaScript using AngularJS JavaScript framework. The map functionality uses OpenLayers JavaScript web map library and OpenStreetMap API.

### Installation

The only requirement to install Beosmapper is a web server such as Apache or Nginx.

To install Beosmapper in your server you need to clone the project into the web server document folder you want to access Beosmapper from.

By default the entrance entries are submitted into the OpenStreetMap test server. You can use the test server to test the functionality of the application, but don't forget the map will only display entries from the OSM production server and not from the testing. If you want to try submission to the test server you need to create a specific account for the OSM test server, normal OSM credentials won't work.


To enable the submission into OSM production database. You need to edit the OSM service file:
`{your_path_to_beosmapper}/application/js/services/osmData.js`

Then find the following lines in the file:

```
var osmHost = 'http://api06.dev.openstreetmap.org'; // Test OSM server
//var osmHost = 'http://openstreetmap.org'; // Production OSM server
```

Comment the first line above, and uncomment the second, it should look like this:

```
//var osmHost = 'http://api06.dev.openstreetmap.org'; // Test OSM server
var osmHost = 'http://openstreetmap.org'; // Production OSM server
```

######Authors
* Aditya Raju
* Anna Gorodetskaya
* Kamyar Hasanzadeh
* Marco Martins
