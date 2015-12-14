var app = angular.module('MahaloKnightsApp', ['ngRoute', 'ngAnimate', 'ClothingCtrls', 'HomeCtrls']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'app/views/home.html',
    controller: "HomeCtrl"
  })
  .when('/clothing', {
  	templateUrl: 'app/views/clothing.html',
    controller: "ClothingCtrl"
  })
  // .when('/new', {
  //   templateUrl: 'app/views/newplane.html',
  //   controller: "AirplaneNewCtrl"
  // })
  // .when('/:id', {
  //   templateUrl: 'app/views/airplane.html',
  //   controller: "AirplaneShowCtrl"
  // })
  .otherwise({
    templateUrl: 'app/views/error.html',
    controller: "HomeCtrl"
  });


  $locationProvider.html5Mode(true);
}]);