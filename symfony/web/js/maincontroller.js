/*
AngularJS sparks:
	- For IE support don't use tag directives use class or
	attribute directives instead;

	- ...

*/

app.controller( "MainController", function( $scope, $http, olHandler, osmData ) {

	$scope.pageTitle = "Beosmapper";

	/**
	 * App initialization
	 **/
	olHandler.initOSM( 'map', '/css/theme/default/style.css' );

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

		// TODO: Add all the tags, login info?!?, into the object and attach it to a submit
		osmData.addFeature( e );

	};

});