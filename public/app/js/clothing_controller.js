angular.module('ClothingCtrls', ['MKServices'])
	.controller('ClothingCtrl', [
		'$scope', 
		'$http', 
		'Item', 
		'$location', 
		function($scope, $http, Item, $location) {
			$scope.items = [];
			$scope.dataLoading = true;
			Item.query(function success(data) {
				$scope.items = data;
				$scope.dataLoading = false;
			}, function error(data) {
				console.log(data);
			});


			$scope.deleteItem = function(id, index) {
				Item.delete({id: id}, function success(data) {
					$scope.items.splice(index, 1);
				}, function error(data) {
					console.log(data);
				});
			}

			$scope.editItem = function(id) {
				$location.path('/clothing/'+id+'/edit');
			}

	}])
	.controller('NewItemCtrl', [
		'$scope', 
		'$location', 
		'Item', 
		function($scope, $location, Item) {
			$scope.addItem = function() {
				var params = {
					name: $scope.item.name,
					type: $scope.item.type,
					price: $scope.item.price,
					quantity: $scope.item.quantity,
					description: $scope.item.description,
					imageUrl: $scope.item.imageUrl
				}
				var newItem = new Item(params);
				newItem.$save();
				$location.path('/clothing');
			}

			$scope.uploadPhoto = function() {
				
			}
		}
	])
	.controller('EditItemCtrl', [
		'$scope',
		'$http',
		'$routeParams',
		'$location',
		'Item',
		function($scope, $http, $routeParams, $location, Item) {
			Item.get({id: $routeParams.id}, function success(data) {
				$scope.item = data;
			}, function error(data) {
				console.log(data);
			});

			$scope.editItem = function() {
				$http({
					url: "/api/clothing/"+$routeParams.id,
					method: 'PUT',
					data: {
						name: $scope.item.name,
						type: $scope.item.type,
				 		price: $scope.item.price,
				 		quantity: $scope.item.quantity,
				 		description: $scope.item.description,
				 		imageUrl: $scope.item.imageUrl
					}
				}).then(function(res){
					if(res.status === 200){
						$location.path('/clothing');
					}
				}, function(res) {
					console.log("Everything went horribly awry");
					console.log(res);
				});
			}
		}
	]);