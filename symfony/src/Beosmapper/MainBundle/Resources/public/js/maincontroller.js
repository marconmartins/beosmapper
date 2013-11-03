app.controller( "MainController", function( $scope, $http ) {

	$scope.understand = "I now understand how the scope works!";

	osm_feature = "tourism:hotels";

	var map, layer, markers;

	var x2js = new X2JS();

	/**
	 * Load Map
	 *
	 * @return void
	 */
	initMap = function() {

		map = new OpenLayers.Map( "map", { theme: false } );

		layer = new OpenLayers.Layer.OSM( "Simple OSM Map" );

		map.addLayer( layer );

		markers = new OpenLayers.Layer.Markers( 'Building entrances' );

		map.addLayer( markers );

		map.setCenter(
			new OpenLayers.LonLat( -71.147, 42.472 ).transform(
			new OpenLayers.Projection( "EPSG:4326" ),
			map.getProjectionObject()
			), 3
		);

	};


	//addMarker = function( lonlat ) {

		//markers.addMarker( new OpenLayers.Marker( lonlat ) );

	//};


	clearMarkers = function() {

	};


	/**
	 * Retrieves OSM Features
	 *
	 * @return	void
	 */
	getOSMFeatures = function() {

		var osm_url = "http://www.overpass-api.de/api/xapi?*[building=entrance][bbox=24.64233,60.11141,25.06531,60.27796]";

		$http( { method: 'GET', url: osm_url } ).
		success( function( data, status, headers, config ) {

			//console.log( data );

			console.log( x2js.xml_str2json( data ) );

		}).
		error( function( data, status, headers, config ) {

			console.log( 'error' );

		});

		var coords = new OpenLayers.LonLat( "6220211", "170892" );

		markers.addMarker( new OpenLayers.Marker( coords ) );

	};


	// Initialize Page
	initMap();

	// Get OSM Features
	getOSMFeatures();



});