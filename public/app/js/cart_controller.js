angular.module('CartCtrls', [])
	.controller('CartCtrl', ['$scope', '$location', '$window', '$http', 'Item', function($scope, $location, $window, $http, Item) {
		
		$scope.items = [];
		if($window.localStorage['cart-items']!=="" && $window.localStorage['cart-items']){
			$scope.items = JSON.parse($window.localStorage['cart-items']);
		}


		$scope.clearAll = function() {
			async.each($scope.items, function(item, callback){
				var x = 0;
				Item.get({id: item._id}, function success(data) {
					var item = data;
						$http({
							url: "/api/clothing/"+ item._id,
							method: 'PUT',
							data: {
						 		quantity: item.quantity + 1
							}
						}).then(function(res){
							if(res.status === 200){
								console.log($scope.items);
								$scope.items.splice(x,1);
								x++;
								$window.localStorage['cart-items'] = JSON.stringify($scope.items);
							}
						}, function(res) {
							console.log("Everything went horribly awry");
							console.log(res);
						});
				}, function error(data) {
					console.log(data);
				});
			}, function(err){
				if(err){
			    	console.log(err);
				}else{
					console.log("mission success");
				}
			});
		}


		$scope.addToCart = function(id) {
			var cartTimer = setTimeout($scope.clearAll, 5000);
			Item.get({id: id}, function success(data) {
				$scope.item = data;
				$http({
					url: "/api/clothing/"+id,
					method: 'PUT',
					data: {
				 		quantity: $scope.item.quantity -1
					}
				}).then(function(res){
					if(res.status === 200){
						if(!window.localStorage['cart-items'] || 
							window.localStorage['cart-items']==="" ||
							window.localStorage['cart-items']==="[]"){
							$scope.temp = [];
							$scope.temp.push($scope.item);
						}else{
							$scope.temp = JSON.parse(window.localStorage['cart-items']);
							$scope.temp.push($scope.item);
						}
						window.localStorage['cart-items'] = JSON.stringify($scope.temp);
						$location.path('/cart');	
					}
				}, function(res) {
					console.log("Everything went horribly awry");
					console.log(res);
				});
			}, function error(data) {
				console.log(data);
			});
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



		$scope.toStore = function(){
			$location.path('/clothing');
		}
	}]);