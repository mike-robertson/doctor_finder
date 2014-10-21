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
    }

    $scope.submitAddress = function() {
      //do something here with the input information
    }
  }]);
