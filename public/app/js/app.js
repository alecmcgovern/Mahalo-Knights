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
	  .otherwise({
	    templateUrl: 'app/views/error.html',
	    controller: "HomeCtrl"
	});

	// $.cloudinary.config({ 
	//   	cloud_name: 'CLOUDINARY_CLOUD_NAME', 
	//   	api_key: 'CLOUDINARY_API_KEY'
	// });

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