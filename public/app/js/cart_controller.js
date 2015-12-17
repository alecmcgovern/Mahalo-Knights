angular.module('CartCtrls', [])
	.controller('CartCtrl', ['$scope', '$location', '$window', function($scope, $location, $window) {
		
		$scope.items = [];
		if($window.localStorage['cart-items']!==""){
			$scope.items = JSON.parse($window.localStorage['cart-items']);
		}	

		$scope.removeFromCart = function(index) {
			$scope.items = JSON.parse($window.localStorage['cart-items']);
			$scope.items.splice(index, 1);
			$window.localStorage['cart-items'] = JSON.stringify($scope.items);
		}

		$scope.clearAll = function() {
			$window.localStorage['cart-items'] = "";
			console.log("cart cleared:");
			$scope.items = {};
		}
	}]);