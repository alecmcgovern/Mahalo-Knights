var app = angular.module('MahaloKnightsApp', ['MKServices', 'ngRoute', 'ngAnimate', 'ClothingCtrls', 'HomeCtrls', 'AuthCtrls']);

app.config([
	'$routeProvider', 
	'$locationProvider', 
	function($routeProvider, $locationProvider) {
	  $routeProvider.when('/', {
	    templateUrl: 'app/views/home.html',
	    controller: "HomeCtrl"
	  })
	  .when('/clothing', {
	  	templateUrl: 'app/views/clothing.html',
	    controller: "ClothingCtrl"
	  })
	  .when('/login', {
	    templateUrl: 'app/views/login.html',
	    controller: "LoginCtrl"
	  })
	  // .when('/:id', {
	  //   templateUrl: 'app/views/airplane.html',
	  //   controller: "ClothingCtrl"
	  // })
	  .otherwise({
	    templateUrl: 'app/views/error.html',
	    controller: "HomeCtrl"
	});


  $locationProvider.html5Mode(true);
}])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}])
.run(['$rootScope', 'Auth', '$route', function($rootScope, Auth, $route) {

	$rootScope.logout = function() {
    	Auth.removeToken();
	    $route.reload();
 	};

	$rootScope.adminLoggedIn = function() {
    	return Auth.adminLoggedIn.apply(Auth);
  	}
}]);