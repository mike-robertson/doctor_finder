'use strict';

// This is the service to get the geo coordinates. It is simple, it uses $q to use promises
angular.module('mrWebdesignApp')
	.factory('externalAPI', ['$q', 'geoService', function geoService($q, geoService) {

		return {
			getCoords: function() {
				var promise = geoService.getCoords();
				var coordObj;
				promise.then(function(coords) {
					console.log(coords.latitude + ', ' + coords.longitude);
					coordObj = coords;
				}, function(reason) {
					console.log('Failed: ' + reason);
					//handle the error here somehow, maybe pop up to make user enter their address
				}, function(update) {
					console.log('Update: ' + update);
				});
			}
		};

	}]);