var app = angular.module( "BeosmapperApp", [] );
app.controller( "MainController", function( $scope, $http ) {

	$scope.understand = "I now understand how the scope works!";

	osm_feature = "tourism:hotels";

	var map, layer, markers, markerIcon;

	var x2js = new X2JS();

	/**
	 * Load Map
	 *
	 * @return void
	 */
	initMap = function() {

		map = new OpenLayers.Map( "map", { theme: '/css/theme/default/style.css' } );

		layer = new OpenLayers.Layer.OSM( "Simple OSM Map" );

		map.addLayer( layer );

		markers = new OpenLayers.Layer.Markers( "Building entrances" );

		map.addLayer( markers );

        var fromProjection = new OpenLayers.Projection( "EPSG:4326" );   // Transform from WGS 1984
        var toProjection = new OpenLayers.Projection( "EPSG:900913" ); // to Spherical Mercator Projection
        var center = new OpenLayers.LonLat( 24.95154, 60.17023 ).transform( fromProjection, toProjection );
        var zoomLevel = 13;

        map.setCenter( center, zoomLevel );

		// var size = new OpenLayers.Size(21,25);
		// var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
		// markerIcon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png', size, offset);

	};


	/**
	 * Retrieves OSM Features
	 *
	 * @return	void
	 */
	getOSMFeatures = function() {

		var osmUrl = "http://www.overpass-api.de/api/xapi?*[building=entrance][bbox=24.93587,60.15671,24.94755,60.16218]";

		$http( { method: 'GET', url: osmUrl } ).
		success( function( data, status, headers, config ) {

			var jsonData = x2js.xml_str2json( data ); // convert XML response into json

			// Add markers to OpenLayers
			angular.forEach ( jsonData.osm.node, function( n ) {

				var nodeCoordinates = new OpenLayers.LonLat( n.lon, n.lat );


				markers.addMarker( new OpenLayers.Marker( nodeCoordinates ) );

			});

			console.log(markers);

		}).
		error( function( data, status, headers, config ) {

			console.log( 'Error' );

		});

	};


	// Initialize Page
	initMap();

	// Get OSM Features
	getOSMFeatures();



});