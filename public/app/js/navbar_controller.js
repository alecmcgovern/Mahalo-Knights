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

			$scope.itemsInCart = function() {
				if($window.localStorage["cart-items"]==="[]"){
					return false;
				}else{
					$scope.numItems = JSON.parse($window.localStorage["cart-items"]).length;
					return true;
				}
			}
		}
	]);