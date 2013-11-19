app.factory( 'olHandler', function() {

	// OpenLayers handler default settings
	var olObj = {
		map: '',
		layer: '',
		markers: '',
		markerIcon: '',
		projection: 'EPSG:900913',
		center: '',
		zoom: 13
	};


	return {

		/**
		 * Initialize a OpenLayers Map with OSM base layers
		 *
		 * @param {string}	div			DOM element in which the map will be displayed
		 * @param {string}	themePath	Path to the OpenLayers theme stylesheet
		 *
		 * @returns	void
		 */
		initOSM: function( div, themePath ) {

			olObj.map = new OpenLayers.Map( div, {
				theme:		themePath,
				projection: olObj.projection
			});

			// Add base layer
			olObj.layer = new OpenLayers.Layer.OSM( 'OSM' );

			olObj.map.addLayer( olObj.layer );

			// All entrance layer
			olObj.markers = new OpenLayers.Layer.Markers( 'Building entrances' );

			olObj.map.addLayer( olObj.markers );

			// Center the map
			olObj.map.setCenter( new OpenLayers.LonLat( 2777592, 8437735 ), olObj.zoom );

			// Set marker icon
			var size = new OpenLayers.Size( 21, 25 );
			var offset = new OpenLayers.Pixel( -( size.w / 2 ), -size.h );
			olObj.markerIcon = new OpenLayers.Icon( '/img/marker.png', size, offset );

		},


		/**
		 * Add markers to a specific layer
		 */
		addMarkers: function( features ) {

			var fromProjection	= new OpenLayers.Projection( 'EPSG:4326' );
			var toProjection	= new OpenLayers.Projection( olObj.map.getProjection() );

			angular.forEach ( features.osm.node, function( f ) {

				coordinates = new OpenLayers.LonLat( f._lon, f._lat ).transform( fromProjection, toProjection );

				olObj.markers.addMarker( new OpenLayers.Marker( coordinates, olObj.markerIcon.clone() ) );

			});

		},


		/**
		 * Changes the default settings of the OpenLayers handler
		 *
		 * @param {object}	customSettings	Set of key/value pair with the settings to be changed
		 *
		 * @returns void
		 */
		changeSettings: function( customSettings ) {

			angular.forEach ( customSettings, function( v, k ) {

				olObj[k] = v;

			});

		},


		/**
		 * Gets the current user location using Geolocation and centers the user in that specific location
		 *
		 * @returns void
		 */
		getUserLocation: function() {

			var fromProjection	= new OpenLayers.Projection( 'EPSG:4326' );
			var toProjection	= new OpenLayers.Projection( olObj.map.getProjection() );

			navigator.geolocation.getCurrentPosition( function( position ) {

				var currentLonLat = new OpenLayers.LonLat( position.coords.longitude, position.coords.latitude ).transform( fromProjection, toProjection );

				olObj.map.setCenter( currentLonLat, 16 );

			});

		}


	};

});



















/**
 *
 **/
app.factory( 'osmData', function( $http, $q ) {

	//var osmUrl = 'http://www.overpass-api.de/api/xapi?*[building=entrance][bbox=24.93587,60.15671,24.94755,60.16218]';

	var osmUrl = 'http://www.overpass-api.de/api/xapi?*';

	return {

		/**
		 * Retrieves OSM Features
		 *
		 * @param	{object}	params	Object of key/value pairs => { tag:{k,v}, bbox:'' }
		 *
		 * @returns	{object}	JSON object with OSM features
		 */
		getFeatures: function( params ) {

			var deferred = $q.defer();

			// Generate URL based on call parameters
			var requestUrl = osmUrl + '[' + params.tag.k + '=' + params.tag.v + '][bbox=' + params.bbox + ']';

			// Perform the request
			$http( { method: 'GET', url: requestUrl } ).
				success( function( data, status, headers, config ) {

					var x2js = new X2JS();

					var jsonData = x2js.xml_str2json( data ); // convert XML response into json

					deferred.resolve( jsonData );

				}).
				error( function( data, status, headers, config ) {

					deferred.reject( status );

				});

			return deferred.promise;

		},

		// TODO: Add Feature, not sure will be fully done or through PHP
		addFeature: function( feature ) {

			// var deferred = $q.defer();

			// $http( { method: 'GET', url: osmUrl } ).
			//	success( function( data, status, headers, config ) {

			//		var x2js = new X2JS();

			//		var jsonData = x2js.xml_str2json( data ); // convert XML response into json

			//		deferred.resolve( jsonData );

			//	}).
			//	error( function( data, status, headers, config ) {

			//		deferred.reject( status );

			//	});

			// return deferred.promise;

		}

	};
});