'use strict';

angular.module('mrWebdesignApp')
  .controller('MainCtrl', ['$scope', '$http', 'socket', 'Auth', 'geoService', 'sunlightAPI',
    function ($scope, $http, socket, Auth, geoService, sunlightAPI) {
    $scope.loading = true;

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


    // $http.get('/api/comments').success(function(comments) {
    //   $scope.comments = comments;
    //   socket.syncUpdates('comment', $scope.comments);
    // });

    // $scope.addComment = function() {
    //   if($scope.newComment.text === '') {
    //     return;
    //   }
    //   // If the user is logged in, use his name. If not logged in, and no name enetered, give it an anonymous name.
    //   if($scope.isLoggedIn()) {
    //     $scope.newComment.name = Auth.getCurrentUser().name;
    //   }
    //   else if($scope.newComment.name === '') {
    //     $scope.newComment.name = 'Anonymous User';
    //   }

    //   $http.post('/api/comments', $scope.newComment);
    //   $scope.newComment = {
    //     text: '',
    //     name: ''
    //   };
    // };

    // // This could be added back in once I figure out how to restrict this to admin.
    // $scope.deleteComment = function(comment) {
    //   $http.delete('/api/comments/' + comment._id);
    // };

    // $scope.$on('$destroy', function () {
    //   socket.unsyncUpdates('comment');
    // });
  }]);
