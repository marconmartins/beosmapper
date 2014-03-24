/**
 *
 **/
app.factory( 'osmData', function( $http, $q, $base64 ) {

	//var osmUrl = 'http://www.overpass-api.de/api/xapi?*[building=entrance][bbox=24.93587,60.15671,24.94755,60.16218]';

	var osmOverpassUrl = 'http://www.overpass-api.de/api/xapi?*';
	
	var osmCreateChangesetUrl = 'http://api06.dev.openstreetmap.org/api/0.6/changeset/create';
	var osmCreateNodeUrl =		'http://api06.dev.openstreetmap.org/api/0.6/node/create';

	var osmData = {};

	osmData.changeset = {
		id: null,
		created: null,
		modified: null
	};

	/**
	 * Retrieves OSM Features
	 *
	 * @param	object	params	Object of key/value pairs => { tag:{k,v}, bbox:'' }
	 *
	 * @returns	object	JSON object with OSM features
	 */
	osmData.getFeatures = function( params ) {

		var deferred = $q.defer();

		// Generate URL based on call parameters
		var requestUrl = osmOverpassUrl + '[' + params.tags.tag.k + '=' + params.tags.tag.v + '][bbox=' + params.bbox + ']';

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

	};


	osmData.addFeature = function( entry ) {

		var requestData = '';
		var operationId = false;

		var deferred = $q.defer();

		var auth = entry.login.username + ':' + entry.login.password;
		$http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode( auth );
		$http.defaults.headers.common['X-StatusOnLoginFail'] = '418';

		// Changeset
		var now = Math.round(new Date().getTime() / 1000);
		var yesterday = now - ( 24 * 3600 );
		var hourAgo = now - 3600;

		if ( osmData.changeset.id === null || ( osmData.changeset.created < yesterday ) || ( osmData.changeset.modified < hourAgo ) ) {

			osmData.createChangeset( entry, auth )
				.then( function() { return osmData.addRequest( entry, auth ); })
				.then(
					function( data ) { deferred.resolve( data ); },
					function( status ) { deferred.reject( status ); }
				);
		}
		else {

			osmData.addRequest( entry, auth ).then(function( data ) {
				deferred.resolve( data );
			});

		}

		return deferred.promise;

	};
	

	osmData.createChangeset = function( entry, auth ) {

		var requestData = '';

		$http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode( auth );

		requestData = '<osm> \
			<changeset> \
				<tag k="created_by" v="' + entry.login.username +'" /> \
				<tag k="comment" v="BeosMapper: Adding building entrances" /> \
			</changeset> \
		</osm>';

		var deferred = $q.defer();

		$http( { method: 'PUT', url: osmCreateChangesetUrl, data: requestData } ).
			success( function( data, status, headers, config ) {
				
				var timestamp = Math.round( new Date().getTime() / 1000 );

				osmData.changeset.id = data;

				osmData.changeset.created = timestamp;

				osmData.changeset.modified = timestamp;

				deferred.resolve();

			}).
			error( function( data, status, headers, config ) {

				//console.log( 'ay caramba... ' + data );

				deferred.reject( status );

			});

		return deferred.promise;

	};


	osmData.addRequest = function( entry, auth ) {

		var deferred = $q.defer();

		var requestData = '<osm>';

		requestData += '<node changeset="' + osmData.changeset.id + '" lat="' +  entry.location.lat + '" lon="' +  entry.location.lon + '">';

		angular.forEach ( entry.tags, function( v, k ) {

			k = k.replace( '_', ':' ); // For subtags '_' need to be replaced with ':''

			requestData += '<tag k="' + k + '" v="' + v + '"/>';

		});

		requestData += '</node></osm>';

		$http( { method: 'PUT', url: osmCreateNodeUrl, data: requestData } ).
			success( function( data, status, headers, config ) {

				deferred.resolve( data );

			}).
			error( function( data, status, headers, config ) {
				
				deferred.reject( status );

			});

		return deferred.promise;

	};

	return osmData;
});