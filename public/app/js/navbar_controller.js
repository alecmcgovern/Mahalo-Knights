angular.module('NavCtrls', ['MKServices'])
	.controller('NavCtrl', [
		'$scope',
		'$http',
  		'$location',
  		'Auth',
  		'$window',
		function($scope, $http, $location, Auth, $window) {
			$scope.email = $window.localStorage["admin.email"];

	}]);