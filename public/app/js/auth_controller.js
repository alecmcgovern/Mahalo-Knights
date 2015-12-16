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
	        	if (res.data.token) Auth.saveToken(res.data.token);
	        	// $scope.currentAdmin = res.data.
	        	$location.path('/clothing');
	      	}, function(res) {
	        	console.log(res.data);
	      	});
	    };

	    $scope.getAdmin = function() {

	    };
	}]);