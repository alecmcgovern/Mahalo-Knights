angular.module('NavCtrls', ['MKServices'])
	.controller('NavCtrl', [
		'$scope',
		'$http',
  		'$location',
  		'Auth',
  		'$window',
		function($scope, $http, $location, Auth, $window) {
			$scope.$watch(function(){
				$scope.email = $window.localStorage["admin.email"];
							
			});

	}]);