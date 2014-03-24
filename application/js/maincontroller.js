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
	$scope.entry = {
		featureType: 'entrance', // Default value = entrance
		tags: {
			attribution: 'Created with Beosmapper'
		},
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

		osmData.addFeature( $scope.entry ).then(
			function( data ) {

				$scope.submission.failure = false;
				$scope.submission.failAuth = '';
				$scope.submission.success = true;

				$scope.entry = {
					featureType: 'entrance',
					tags: {
						attribution: 'Created with Beosmapper',
						building: 'entrance'
					},
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
	$scope.olHandlerAreaSelectionClickCallback = function( lonlat, wsg84LonLat ) {

		olHandler.clearOSMFeaturesMarkers();

		$scope.entry.areaLocation = lonlat;
		$scope.entry.location = wsg84LonLat;

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

		var $activeSection = jQuery( '.panel-collapse.in' );

		$activeSection.removeClass( 'in' );
		$activeSection.addClass( 'collapse' );

		$activeSection.parent().nextAll( '.panel-default' ).find( '.panel-collapse' ).eq(0).addClass( 'in' );

		return true;
	};


	// Disable the submit if the required section are not set ( login + location + entrance type )
	$scope.disableSubmit = function() {

		if ( $scope.entry.featureType !== '' && $scope.entry.location !== '' && $scope.entry.login.username !== '' && $scope.entry.login.password !== '' ) { return false; }

		return true;

	};


	// Toggles the visibility of the submit button based on the response
	$scope.toggleSubmit = function() {

		if ( $scope.submission.failure || $scope.submission.success ) { return true; }

		return false;

	};

});