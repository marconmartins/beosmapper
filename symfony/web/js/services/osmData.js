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