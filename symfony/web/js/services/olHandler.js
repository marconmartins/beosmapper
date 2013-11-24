app.factory( 'olHandler', function() {

	/**
	 * OpenLayers handler default settings
	 */
	var olObj = {
		map: '',
		layer: '',
		markers: {
			userInput: '',
			features: ''
		},
		markerIcon: {},
		projection: 'EPSG:900913',
		center: '',
		zoom: 13
	};

	var olHandler = {};


	/**
	 * Initialize a OpenLayers Map with OSM base layers
	 *
	 * @param {string}	div			DOM element in which the map will be displayed
	 * @param {string}	themePath	Path to the OpenLayers theme stylesheet
	 *
	 * @returns	void
	 */
	olHandler.initOSM = function( div, themePath ) {

		olObj.map = new OpenLayers.Map( div, {
			theme:		themePath,
			projection: olObj.projection
		});

		// Add base layer
		olObj.layer = new OpenLayers.Layer.OSM( 'OSM' );

		olObj.map.addLayer( olObj.layer );

		// Marker layers: OSM Features and User Input
		olObj.markers.userInput = new OpenLayers.Layer.Markers( 'User Input' );
		olObj.markers.features	= new OpenLayers.Layer.Markers( 'OSM Features' );

		angular.forEach ( olObj.markers, function( m ) {

			olObj.map.addLayer( m );

		});


		// Center the map
		olObj.map.setCenter( new OpenLayers.LonLat( 2777592, 8437735 ), olObj.zoom );

		// Set marker icons
		var size = new OpenLayers.Size( 21, 25 );
		var offset = new OpenLayers.Pixel( -( size.w / 2 ), -size.h );
		olObj.markerIcon.features = new OpenLayers.Icon( '/img/marker-green.png', size, offset );
		olObj.markerIcon.userInput = new OpenLayers.Icon( '/img/marker.png', size, offset );

	};


	/**
	 * Initialize user click
	 */
	olHandler.initClick = function( $scope ) {

		OpenLayers.Control.Click = OpenLayers.Class( OpenLayers.Control, {

			defaultHandlerOptions: {
				'single': true,
				'double': false,
				'pixelTolerance': 0,
				'stopSingle': false,
				'stopDouble': false
			},

			initialize: function( options ) {

				this.handlerOptions = OpenLayers.Util.extend( {}, this.defaultHandlerOptions );

				OpenLayers.Control.prototype.initialize.apply( this, arguments );

				this.handler = new OpenLayers.Handler.Click( this, {
						'click': this.trigger
					}, this.handlerOptions
				);

			},

			trigger: function( e ) {

				var lonlat = olObj.map.getLonLatFromViewPortPx( e.xy );

				olObj.markers.userInput.clearMarkers();

				olObj.markers.userInput.addMarker( new OpenLayers.Marker( lonlat, olObj.markerIcon.userInput.clone() ) );

				$scope.olHandlerClickCallback( e );

			}

		});


		click = new OpenLayers.Control.Click();

		olObj.map.addControl( click );

		click.activate();

	};


	/**
	 * Add markers to a specific layer
	 */
	olHandler.addMarkers = function( features ) {

		var fromProjection	= new OpenLayers.Projection( 'EPSG:4326' );
		var toProjection	= new OpenLayers.Projection( olObj.map.getProjection() );

		angular.forEach ( features.osm.node, function( f ) {

			coordinates = new OpenLayers.LonLat( f._lon, f._lat ).transform( fromProjection, toProjection );

			olObj.markers.features.addMarker( new OpenLayers.Marker( coordinates, olObj.markerIcon.features.clone() ) );

		});
	};


	/**
	 * Changes the default settings of the OpenLayers handler
	 *
	 * @param {object}	customSettings	Set of key/value pair with the settings to be changed
	 *
	 * @returns void
	 */
	olHandler.changeSettings = function( customSettings ) {

		angular.forEach ( customSettings, function( v, k ) {

			olObj[k] = v;

		});
	};


	/**
	 * Gets the current user location using Geolocation and centers the user in that specific location
	 *
	 * @returns void
	 */
	olHandler.getUserLocation = function() {

		var fromProjection	= new OpenLayers.Projection( 'EPSG:4326' );
		var toProjection	= new OpenLayers.Projection( olObj.map.getProjection() );

		navigator.geolocation.getCurrentPosition( function( position ) {

			var currentLonLat = new OpenLayers.LonLat( position.coords.longitude, position.coords.latitude ).transform( fromProjection, toProjection );

			olObj.map.setCenter( currentLonLat, 16 );

		});
	};




	return olHandler;

});


















