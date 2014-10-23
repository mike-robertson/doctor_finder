'use strict';

angular.module('mrWebdesignApp')
  .controller('MainCtrl', ['$scope', '$http', 'socket', 'Auth', 'geoService', 'sunlightAPI',
    function ($scope, $http, socket, Auth, geoService, sunlightAPI) {
    $scope.loading = true;

    $scope.address = {
      streetNo: '',
      streetName: '',
      city: '',
      state: 'Alabama'    
    };


    // Bind the Auth functions to scope so it is easy to access in our html.
    $scope.isAdmin = Auth.isAdmin;
    $scope.isLoggedIn = Auth.isLoggedIn;

    // Get the promise from the geoService which retreives coords.
    // TODO: add some error handling, such as making user input their address.
    var promise = geoService.getCoords();

    $scope.coordObj = '';
    promise.then(function(coords) {
      $scope.coordObj = coords;
      console.log($scope.coordObj);
    }, function(reason) {
      console.log('Failed: ' + reason);
      //handle the error here somehow, maybe pop up to make user enter their address
    }, function(update) {
      console.log('Update: ' + update);
    });

    // Get the promise from the sunlightAPI service which retreives reps.
    // TODO: add some error handling.
    var promiseSunlight = promise.then(function(){
      var promiseAPI = sunlightAPI.getReps($scope.coordObj);

      promiseAPI.then(function(reps) {
        $scope.repInfo = reps;
        console.log($scope.repInfo);
        $scope.repArray = reps.results;
        $scope.loading = false;
      }, function(reason) {
        console.log('Failed: ' + reason);
        $scope.loading = false;
        //handle the error here somehow, maybe pop up to make user enter their address
      }, function(update) {
        console.log('Update: ' + update);
      });
    });

    $scope.setState = function(newState) {
      $scope.address.state = newState;
    };

    this.stringifyAddress = function() {
      return $scope.address.streetNo + ' ' + $scope.address.streetName + ', '
        + $scope.address.city + ', ' + $scope.address.state;
    };

    $scope.updateLocation = function() {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': $scope.address.streetNo + ' ' + $scope.address.streetName + ', '
        + $scope.address.city + ', ' + $scope.address.state }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          $scope.coordObj = {
            latitude: results[0].geometry.location.lat(),
            longitude: results[0].geometry.location.lng()
          };
          console.log($scope.coordObj);
          $scope.loading = true;
          $scope.repArray = [];
          var promiseUpdate = sunlightAPI.getReps($scope.coordObj);

          promiseUpdate.then(function(reps) {
            console.log('fulfilled promise');
            $scope.repInfo = reps;
            console.log($scope.repInfo);
            $scope.repArray = reps.results;
            $scope.loading = false;
          }, function(reason) {
            console.log('Failed: ' + reason);
            $scope.loading = false;
            //handle the error here somehow, maybe pop up to make user enter their address
          }, function(update) {
            console.log('Update: ' + update);
          });
        }
        // Reset the address to a blank template again.
        $scope.address = {
          streetNo: '',
          streetName: '',
          city: '',
          state: 'Alabama'
        };
      });
    };
    
    $scope.states = [      
      "Alabama",      "Alaska",      "Arizona",      "Arkansas",
      "California",      "Colorado",      "Connecticut",      "Delaware",
      "Florida",      "Georgia",      "Hawaii",      "Idaho",
      "Illinois",      "Indiana",      "Iowa",      "Kansas",
      "Kentucky",      "Louisiana",      "Maine",      "Maryland",
      "Massachusetts",      "Michigan",      "Minnesota",      "Mississippi",
      "Missouri",      "Montana",      "Nebraska",      "Nevada",
      "New Hampshire",      "New Jersey",      "New Mexico",      "New York",
      "North Carolina",      "North Dakota",      "Ohio",      "Oklahoma",
      "Oregon",      "Pennsylvania",      "Rhode Island",      "South Carolina",
      "South Dakota",      "Tennessee",      "Texas",      "Utah",
      "Vermont",      "Virginia",      "Washington",      "West Virginia",
      "Wisconsin",      "Wyoming"
    ];

  }]);
