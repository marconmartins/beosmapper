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

	$scope.submission = {};
	$scope.submission.success = false;
	$scope.submission.failure = false;

	/**
	 * User entry model
	 **/
	$scope.cleanEntry = {
		featureType: 'entrance', // Default value = entrance
		tags: [ ],
		description: '',
		location: '',
		login: {
			username: '',
			password: ''
		}
	};

	$scope.entry = $scope.cleanEntry;


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

		osmData.addFeature( $scope.entry ).then(
			function( data ) {

				$scope.submission.failure = false;
				$scope.submission.failAuth = '';
				$scope.submission.success = true;

				$scope.entry = {
					featureType: 'entrance',
					tags: [ ],
					description: '',
					location: '',
					login: {
						username: '',
						password: ''
					}
				};
			},
			function( status ) {

				if ( status == 401 ) {
					$scope.submission.failAuth = 'has-error has-feedback';
				}

				$scope.submission.success = false;
				$scope.submission.failure = true;

			}
		);

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

			olHandler.addOSMFeaturesMarkers( features );

		}, function( status ) {

			console.log( 'Ay caramba... looks like something went wrong.' );

		});

	};


	$scope.olHandlerEntryClickCallback = function( e ) {

		$scope.entry.location = e;


	};



	/**
	 * UI flow
	 **/
	$scope.nextSection = function( e ) {

		var activeSection = jQuery( '.collapse.in' );

		jQuery( '.collapse' ).removeClass( 'in' );

		jQuery( activeSection ).parent().nextAll( '.panel-default' ).find( '.collapse' ).eq(0).addClass( 'in' );

	};

	// Disable the submit if the required section are not set ( login + location + entrance type )
	$scope.disableSubmit = function() {

		if ( $scope.entry.login.username && $scope.entry.login.password && $scope.entry.location && $scope.entry.featureType ) { return false; }

		return true;

	};

	

	// Toggles the visibility of the submit button based on the response
	$scope.toggleSubmit = function() {

		if ( $scope.submission.failure || $scope.submission.success ) { return true; }

		return false;

	};

});