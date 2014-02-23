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
		var size = new OpenLayers.Size( 20, 25 );
		var offset = new OpenLayers.Pixel( -( size.w / 2 ), -size.h );
		olObj.markerIcon.features = new OpenLayers.Icon( '../img/entgreen.png', size, offset );
		olObj.markerIcon.userInput = new OpenLayers.Icon( '../img/entpink.png', size, offset );

	};

	/**
	 * Initialize user click
	 */
	olHandler.initAreaSelectionClick = function( $scope ) {

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

				$scope.olHandlerAreaSelectionClickCallback( lonlat ); // Returns the lonlat click object

			}

		});


		areaSelectionClick = new OpenLayers.Control.Click();

		olObj.map.addControl( areaSelectionClick );

		areaSelectionClick.activate();

	};



	/**
	 * Initialize user click
	 */
	olHandler.initEntryClick = function( $scope ) {

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

				var fromProjection	= new OpenLayers.Projection( olObj.map.getProjection() );
				var toProjection	= new OpenLayers.Projection( "EPSG:4326" );

				$scope.olHandlerEntryClickCallback( lonlat.transform( fromProjection, toProjection ) );

			}

		});


		entryClick = new OpenLayers.Control.Click();

		olObj.map.addControl( entryClick );

		entryClick.activate();

	};



	olHandler.enableClickEvent = function( eventName ) {

		if ( eventName == 'entry' ) {

			entryClick.activate();

		}

		if ( eventName == 'area-selection' ) {

			areaSelectionClick.activate();

		}
	};

	/**
	 * Disable click events
	 **/
	olHandler.disableClickEvents = function( eventName ) {

		if ( eventName == 'all' ) {

			areaSelectionClick.deactivate();

			entryClick.deactivate();

		}

		if ( eventName == 'area-selection' ) {

			areaSelectionClick.deactivate();

		}

	};




	


	/**
	 * Add markers to a specific layer
	 */
	olHandler.addOSMFeaturesMarkers = function( features ) {

		var fromProjection	= new OpenLayers.Projection( 'EPSG:4326' );
		var toProjection	= new OpenLayers.Projection( olObj.map.getProjection() );

		angular.forEach ( features.osm.node, function( f ) {

			coordinates = new OpenLayers.LonLat( f._lon, f._lat ).transform( fromProjection, toProjection );

			olObj.markers.features.addMarker( new OpenLayers.Marker( coordinates, olObj.markerIcon.features.clone() ) );

		});
	};

	olHandler.clearOSMFeaturesMarkers = function() {

		olObj.markers.features.clearMarkers( );

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


	/**
	 * Creates and displays in the map the bounding box based on a lonlat point
	 *
	 * @param {object} lonlat	Openlayers.LonLat object with the center position of the bounding box
	 *
	 * @returns {object}	bottom-left and top-right xy coordinates in EPSG:4326
	 */
	olHandler.createBboxFromLonLat = function( lonlat ) {

		var vectorLayer = null;

		var bufferSizeMeters = "2500.00";

		// Create the layer if doesn't exist, otherwise get the layer and clear it
		vectorLayerQuery = olObj.map.getLayersByName( "BeosMapper:Vector" );

		if ( vectorLayerQuery.length === 0 ) {

			vectorLayer = new OpenLayers.Layer.Vector( "BeosMapper:Vector" );
		
			olObj.map.addLayer( vectorLayer );

		}
		else {

			vectorLayer = vectorLayerQuery.pop(); // Get the first result out of the array

			vectorLayer.removeAllFeatures();

		}

		var center = new OpenLayers.Geometry.Point( lonlat.lon, lonlat.lat );

		var boxPolygon = new OpenLayers.Geometry.Polygon.createRegularPolygon( center, bufferSizeMeters, 4, 0 );

		vectorLayer.addFeatures( [ new OpenLayers.Feature.Vector( boxPolygon, null, null ) ] );


		var boundingBox = { bottomLeft: null, topRight: null };

		// Get bounding box polygons
		boundingBox.bottomLeft = new OpenLayers.Geometry.Point( boxPolygon.bounds.left, boxPolygon.bounds.bottom );
		boundingBox.topRight = new OpenLayers.Geometry.Point( boxPolygon.bounds.right, boxPolygon.bounds.top );

		// Transform coordinates
		var fromProjection	= new OpenLayers.Projection( olObj.map.getProjection() );
		var toProjection	= new OpenLayers.Projection( "EPSG:4326" );

		boundingBox.bottomLeft = boundingBox.bottomLeft.transform( fromProjection, toProjection );
		boundingBox.topRight = boundingBox.topRight.transform( fromProjection, toProjection );

		return boundingBox;

	};


	return olHandler;
});


















