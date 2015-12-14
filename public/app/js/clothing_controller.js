angular.module('ClothingCtrls', ['MKServices'])
	.controller('ClothingCtrl', ['$scope', '$http', 'Item', function($scope, $http, Item) {
		$scope.items = [];
		Item.query(function success(data) {
			$scope.items = data;
			// console.log(data);
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

	}])
	// .controller('ItemShowCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location){
	// 	$http({
	// 		url: "/api/clothing/"+$routeParams.id,
	// 		method: 'GET'
	// 	}).then(function(res){
	// 		if(res.status === 200){
	// 			$scope.item = res.data;
	// 		}
	// 	}, function(res) {
	// 		console.log("Everything went horribly awry");
	// 		console.log(res);
	// 	});


	// }])
	.controller('NewItemCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
		// $scope.formWarning = true;
		// $scope.manufacturer = '';
		// $scope.model = '';
		// $scope.engines = 0;
		// $scope.image = '';
		// $scope.createPlane = function(){
		// 	if ($scope.manufacturer && $scope.model &&
		// 		$scope.engines && $scope.imageUrl){
				
		// 		$http({
		// 			url: "/api/airplanes",
		// 			method: 'POST',
		// 			data: {
		// 				manufacturer: $scope.manufacturer,
		// 				model: $scope.model,
		// 				engines: parseInt($scope.engines, 10),
		// 				imageUrl: $scope.imageUrl
		// 			}
		// 		}).success(function(){
		// 			$location.path('/');
		// 		});

		// 	}else{
		// 		// $scope.formwarning = true;
		// 		console.log("false");
		// 	}
			
		// }



	}]);