var app = angular.module('MahaloKnightsApp', ['MKServices', 'ngRoute', 'ngAnimate', 'ClothingCtrls', 'HomeCtrls', 'AuthCtrls', 'CartCtrls']);

app.config([
	'$routeProvider', 
	'$locationProvider', 
	function($routeProvider, $locationProvider) {
	  $routeProvider.when('/', {
	    templateUrl: 'app/views/home.html',
	    controller: "HomeCtrl"
	  })
	  .when('/about', {
	  	templateUrl: 'app/views/about.html',
	    controller: "HomeCtrl"
	  })
	  .when('/contact', {
	  	templateUrl: 'app/views/contact.html',
	    controller: "HomeCtrl"
	  })
	  .when('/clothing', {
	  	templateUrl: 'app/views/clothing.html',
	    controller: "ClothingCtrl"
	  })
	  .when('/clothing/:id/edit', {
	  	templateUrl: 'app/views/edit_item.html',
	    controller: "EditItemCtrl"
	  })
	  .when('/login', {
	    templateUrl: 'app/views/login.html',
	    controller: "LoginCtrl"
	  })
	  .when('/newitem', {
	    templateUrl: 'app/views/new_item.html',
	    controller: "NewItemCtrl"
	  })
	  .when('/cart', {
	    templateUrl: 'app/views/cart.html',
	    controller: "CartCtrl"
	  })
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