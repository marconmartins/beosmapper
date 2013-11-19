var app = angular.module( "BeosmapperApp", [] );
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

});