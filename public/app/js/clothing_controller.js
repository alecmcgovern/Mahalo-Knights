angular.module('ClothingCtrls', [])
	.controller('ClothingCtrl', ['$scope', '$http', function($scope, $http) {
		$http({
			url: "/api/clothing",
			method: 'GET'
		}).then(function(res){
			if(res.status === 200){
				$scope.items = res.data;
			}
		}, function(res) {
			console.log("Everything went horribly awry");
			console.log(res);
		});
	}])
	.controller('ItemShowCtrl', ['$scope', '$routeParams', '$http', '$location', function($scope, $routeParams, $http, $location){
		$http({
			url: "/api/clothing/"+$routeParams.id,
			method: 'GET'
		}).then(function(res){
			if(res.status === 200){
				$scope.item = res.data;
			}
		}, function(res) {
			console.log("Everything went horribly awry");
			console.log(res);
		});


		$scope.deleteItem = function(id) {;
			$http({
				url: "/api/clothing/"+id,
				method: 'DELETE'
			}).then(function(res){
				if(res.status === 200){
					$location.path('/');
				}
			}, function(res) {
				console.log("Everything went horribly awry");
				console.log(res);
			});
		}
	}]);
	// .controller('NewItemCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){
	// 	// $scope.formWarning = true;
	// 	$scope.manufacturer = '';
	// 	$scope.model = '';
	// 	$scope.engines = 0;
	// 	$scope.image = '';
	// 	$scope.createPlane = function(){
	// 		if ($scope.manufacturer && $scope.model &&
	// 			$scope.engines && $scope.imageUrl){
				
	// 			$http({
	// 				url: "/api/airplanes",
	// 				method: 'POST',
	// 				data: {
	// 					manufacturer: $scope.manufacturer,
	// 					model: $scope.model,
	// 					engines: parseInt($scope.engines, 10),
	// 					imageUrl: $scope.imageUrl
	// 				}
	// 			}).success(function(){
	// 				$location.path('/');
	// 			});

	// 		}else{
	// 			// $scope.formwarning = true;
	// 			console.log("false");
	// 		}
			
	// 	}



	// }]);