/*
AngularJS sparks:
	- For IE support don't use tag directives use class or
	attribute directives instead;

	- ...

	- We need to specify a different icons for:
		- User area selection
		- User entrance location
		- One diffent icon for each feature type


TODO:
	- Display Lat/Lon in area selection
	- Add descriptions to each marker
	- Prevent user from opening next tabs
*/

app.controller( "MainController", function( $scope, $http, olHandler, osmData ) {

	$scope.pageTitle = "Beosmapper";


	/**
	 * User entry model
	 **/
			// entrance: {
			// 		k: 'entrance',
			// 		v: 'yes;main;service;exit;emergency'
			// },
			
			// access:	{
			// 		k: 'access',
			// 		v: 'yes;no;delivery;private'
			// 	},
				
			// wheelchair: 'yes;no'
					

	$scope.entry = {
		featureType: '',
		tags: [ ],
		/*tag: {
			k: 'entrance',
			v: 'yes'
		},*/
		description: '',
		location: '',
		login: {
			username: '',
			password: ''
		}
	};


	/**
	 * App initialization
	 **/
	olHandler.initOSM( 'map', '../css/theme/default/style.css' );

	olHandler.initAreaSelectionClick( $scope );

	olHandler.initEntryClick( $scope );

	olHandler.disableClickEvents( 'entry' );

	//olHandler.enableClickEvent( 'area-selection' );


	/**
	 * Area selection functionality
	 **/

	// Initializes the area selection OpenLayers click event
	$scope.initAreaSelection = function() {

		olHandler.enableClickEvent( 'area-selection' );

	};






	$scope.selectFeatureType = function() {

		olHandler.disableClickEvents( 'all' );

	};


	$scope.selectLocation = function() {

		olHandler.disableClickEvents( 'all' );

		olHandler.enableClickEvent( 'entry' );

	};


	$scope.submitEntry = function() {

		// if ( $scope.entry.featureType == 'entrance' ) {

		// 	$scope.entry.tags.push( { entrance: 'yes' } );

		// }

		osmData.addFeature( $scope.entry );

	};



	/**
	 * Geolocation
	 **/
	$scope.locate = function() {

		olHandler.getUserLocation();

	};



	/**
	 *
	 * Map click callback functions
	 *
	 **/

	/**
	 *
	 * @param object	lonlat	OpenLayers Latitude/Longitude object with the user area click location
	 *
	 **/
	$scope.olHandlerAreaSelectionClickCallback = function( lonlat ) {

		olHandler.clearOSMFeaturesMarkers();

		$scope.entry.areaLocation = lonlat;

		var boundingBox = olHandler.createBboxFromLonLat( lonlat ); // Gets the bbox polygon

		// Currently we only fetch building entrances. Will be extended to other features.
		var args = {
			tags: {
				tag: {
					k: 'entrance',
					v: 'yes'
				}
			},
			bbox: boundingBox.bottomLeft.x + ',' + boundingBox.bottomLeft.y + ',' + boundingBox.topRight.x + ',' + boundingBox.topRight.y
		};

		features = osmData.getFeatures( args ).then( function( features ) {
console.log(features); // ToDo: Remove this
			olHandler.addOSMFeaturesMarkers( features );

		}, function( status ) {

			console.log( 'Ay caramba... looks like something went wrong.' );

		});

	};


	$scope.olHandlerEntryClickCallback = function( e ) {

		$scope.entry.location = e;


	};



	/**
	 * Menu functionality
	 **/
	$scope.nextSection = function( e ) {

		var activeSection = jQuery( '.collapse.in' );

		jQuery( '.collapse' ).removeClass( 'in' );

		jQuery( activeSection ).parent().nextAll( '.panel-default' ).find( '.collapse' ).eq(0).addClass( 'in' );

	};

});