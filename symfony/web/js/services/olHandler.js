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


















