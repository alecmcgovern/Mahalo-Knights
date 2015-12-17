angular.module('ClothingCtrls', ['MKServices'])
	.controller('ClothingCtrl', [
		'$scope', 
		'$http', 
		'Item', 
		'$location', 
		'$routeParams',
		function($scope, $http, Item, $location, $routeParams) {
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

			$scope.addToCart = function(id) {
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


			//Pagination
			// $scope.currentPage = 1;
   //  		$scope.pageSize = 3;
			// $scope.numberOfPages=function(){
		 //        return Math.ceil($scope.items.length/$scope.pageSize);                
		 //    }
			
			// $scope.startPageOn = function() {

			// }
			// app.filter('startFrom', function() {
			//     return function(input, start) {
			//         start = +start; //parse to int
			//         return input.slice(start);
			//     }
			// });

	}])
	.controller('NewItemCtrl', [
		'$scope', 
		'$location', 
		'Item', 
		function($scope, $location, Item) {
			$scope.imageUploadUrl = 'hey';

			$scope.addItem = function() {
				console.log('attempting to add item');
				var params = {
					name: $scope.item.name,
					type: $scope.item.type,
					price: $scope.item.price,
					quantity: $scope.item.quantity,
					description: $scope.item.description,
					imageUrl: $scope.imageUploadUrl
				}
				var newItem = new Item(params);
				newItem.$save();
				$location.path('/clothing');
			}

			$scope.uploadPhoto = function() {
				cloudinary.openUploadWidget({ cloud_name: 'dbyw3rhhs', upload_preset: 'u7xi2rf8'},
			        function(error, result) {
			           	$scope.$apply(function(){
							$scope.imageUploadUrl = result[0].secure_url;
						});
			    });
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