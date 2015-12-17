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
			console.log($scope.items[0]._id);
			//$scope.length = $scope.items.length
			for (var i=0; i<$scope.items.length; i++){
				var id = $scope.items[i]._id;
				
				Item.get({id: id}, function success(data) {
					$scope.item = data;
					$http({
						url: "/api/clothing/"+ id,
						method: 'PUT',
						data: {
					 		quantity: $scope.item.quantity + 1
						}
					}).then(function(res){
						if(res.status === 200){
							// $scope.items.splice(i,1);
							// $window.localStorage['cart-items'] = JSON.stringify($scope.items);
						}
					}, function(res) {
						console.log("Everything went horribly awry");
						console.log(res);
					});
				}, function error(data) {
					console.log(data);
				});
			}
			$scope.items = [];
			$window.localStorage['cart-items'] = JSON.stringify($scope.items);


		}

		$scope.toStore = function(){
			$location.path('/clothing');
		}
	}]);