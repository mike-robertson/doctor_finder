'use strict';

angular.module('mrWebdesignApp')
	.factory('geoService', function geoService() {

		var getCoordinates;

		if ("geolocation" in navigator) {
	      	navigator.geolocation.getCurrentPosition(function(position) {
	      		console.log(position.coords.latitude + ', ' + position.coords.longitude);
				return {
					lat: position.coords.latitude,
					longitude: position.coords.longitude
				};
			});
		} else {
			alert('inside else');
			return {};
		}

	});