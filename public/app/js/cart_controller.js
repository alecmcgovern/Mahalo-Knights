angular.module('CartCtrls', [])
	.controller('CartCtrl', ['$scope', '$location', '$window', '$http', 'Item', function($scope, $location, $window, $http, Item) {
		
		$scope.items = [];
		if($window.localStorage['cart-items']!==""){
			$scope.items = JSON.parse($window.localStorage['cart-items']);
		}	

		$scope.removeFromCart = function(id, index) {
			$scope.items = JSON.parse($window.localStorage['cart-items']);
			$scope.items.splice(index, 1);
			$window.localStorage['cart-items'] = JSON.stringify($scope.items);


			Item.get({id: id}, function success(data) {
				console.log("putting back on shelves");
					$scope.item = data;
					$http({
						url: "/api/clothing/"+id,
						method: 'PUT',
						data: {
					 		quantity: $scope.item.quantity + 1
						}
					}).then(function(res){
						if(res.status === 200){
							
						}
					}, function(res) {
						console.log("Everything went horribly awry");
						console.log(res);
					});
				}, function error(data) {
					console.log(data);
				});
		}

		$scope.clearAll = function() {
			$window.localStorage['cart-items'] = "";
			console.log("cart cleared:");
			$scope.items = {};
		}

		$scope.toStore = function(){
			$location.path('/clothing');
		}
	}]);