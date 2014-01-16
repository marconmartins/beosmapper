/*
AngularJS sparks:
	- For IE support don't use tag directives use class or
	attribute directives instead;

	- ...

*/

app.controller( "MainController", function( $scope, $http, olHandler, osmData ) {

	$scope.pageTitle = "Beosmapper";


	/**
	 * User entry model
	 **/
	$scope.entry = {
		tag: {
		entrance: {
			k: 'entrance',
			v: 'yes';'main';'service';'exit';'emergency',
			
			access:	{
					k: 'access',
					v: 'yes','no','delivery','private'
				}
				
			wheelchair: 'yes','no'
			
			}
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

	$scope.userClick = olHandler.initClick( $scope );

	features = osmData.getFeatures({
		tag: {
			k: 'building',
			v: 'entrance'
		},
		bbox: '24.93587,60.15671,24.94755,60.16218'
	}).then( function( features ) {

		olHandler.addMarkers( features );

	}, function( status ) {
		// Error
	});


	/**
	 * User bound functions
	 **/
	$scope.locate = function() {

		olHandler.getUserLocation();

	};


	/**
	 * Callback for OpenLayers click
	 **/
	$scope.olHandlerClickCallback = function( e ) {

		$scope.entry.location = e;

	};

	$scope.submitEntry = function() {

		osmData.addFeature( $scope.entry );

	};


	/**
	* Bootstrap
	**/
	console.log( jQuery('body') );


});