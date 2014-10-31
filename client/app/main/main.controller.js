'use strict';

angular.module('mrWebdesignApp')
  .controller('MainCtrl', ['$timeout', '$http', 'GoogleMapApi'.ns(), 
    function ($timeout, $http, GoogleMapApi) {

    var ctrl = this;

    // In case there is a delay, display loading gif for map.
    ctrl.loading = true;

    // Set our map to San Antonio center coords, zoom 13.
    ctrl.map = {
      center: {latitude: 40.1451, longitude: -29.4167 }, 
      zoom: 13, 
      bounds: {},
      control: {}
    };
    ctrl.options = {scrollwheel: false};

    ctrl.doctors = [];

    // If this were an actual api call, we would use a get, so this is simulating getting the json in our local file.
    $http.get('././assets/search.json')
      .success(function(data, status, headers, config) {
        // Turn off loading gif.
        ctrl.loading = false;

        // Set our doctors array to the data in the json.
        ctrl.doctors = data.professionals;

        // This is the latLong object which contains the current location's latitude and longitude.
        ctrl.currentLocation = {
          longitude: ctrl.doctors[0].locations[0].address.longitude,
          latitude: ctrl.doctors[0].locations[0].address.latitude
        };

        // On the next $digest, we want to update the center to the first doctor's location.
        $timeout(function() {
          ctrl.map.control.refresh(ctrl.currentLocation);
        });

        console.log(ctrl.doctors);
      })
      .error(function(data, status, headers, config) {
        alert('The data failed to load');
        ctrl.loading = false;
      });

    GoogleMapApi.then(function() {
      // Turn off the loading gif.
      ctrl.loading = false;
    });

    // When this is called from ng-click on the doctor names, it will update the center of the map to their location.
    ctrl.centerMap = function(lon, lat) {
      ctrl.currentLocation = {
        longitude: lon,
        latitude: lat
      };
      $timeout(function() {
        ctrl.map.control.refresh(ctrl.currentLocation);
      });
    };

  }]);
