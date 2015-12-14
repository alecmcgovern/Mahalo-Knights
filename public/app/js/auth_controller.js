angular.module('AuthCtrls', ['MKServices'])
	.controller('LoginCtrl', [
		'$scope',
		'$http',
  		'$location',
  		'Auth',
		function($scope, $http, $location, Auth) {
			$scope.admin = {
     		email: '',
   			password: ''
    	};
	   // $scope.actionName = 'Login';
	    $scope.userAction = function() {
	      	$http.post('/api/auth', $scope.admin).then(function(res) {
	      		console.log(res);
	        	Auth.saveToken(res.data.token);
	        	$location.path('/');
	      	}, function(res) {
	        	console.log(res.data);
	      	});
	    };
	}]);