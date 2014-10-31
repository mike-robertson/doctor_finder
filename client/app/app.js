'use strict';

angular.module('mrWebdesignApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'google-maps'.ns()
])
  .config(['GoogleMapApiProvider'.ns(), function (GoogleMapApi) {
      GoogleMapApi.configure({
          key: 'AIzaSyAaZm95uSnPabqgVJx9cpl2UbSKyBCa9Ok',
          v: '3.17',
          libraries: 'weather,geometry,visualization'
      });
  }])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
 
  .run(function () {
  });