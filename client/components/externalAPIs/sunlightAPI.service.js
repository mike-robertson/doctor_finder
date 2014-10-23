'use strict';

// This is the service to get the geo coordinates. It is simple, it uses $q to use promises
angular.module('mrWebdesignApp')
	.factory('sunlightAPI', ['$q', '$http', function sunLightAPI($q, $http) {
		var apiKey = '3084917ca0a54b46b2c410c9ae0cbc5a';
		return {
			getReps: function(coordObj) {
				var latitude = coordObj.latitude;
				var longitude = coordObj.longitude;

			  var deferred = $q.defer();
			  var url = 'http://congress.api.sunlightfoundation.com/legislators/locate?latitude='+latitude+'&longitude='+longitude+'&apikey='+apiKey;
		    

		    deferred.notify('getting representatives and senators now...');

		    $http.get(url).success(function(repInfo) {
		    	console.log('success in the api');
		    	console.log(repInfo);
				  deferred.resolve(repInfo);
		    });
			  return deferred.promise;
			}
		}
	}]);