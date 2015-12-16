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

	    $scope.userAction = function() {
	      	$http.post('/api/auth', $scope.admin).then(function(res) {
	        	if (res.data.token) {
	        		Auth.saveToken(res.data.token, res.data.admin);
	        		$location.path('/clothing');
	        	}else{
	        		$location.path('/login');
	        	}
	      	}, function(res) {
	        	console.log(res.data);
	      	});
	    };

	    $scope.getAdmin = function() {

	    };
	}])
	.controller('SignupCtrl', [
		'$scope',
		'$http',
  		'$location',
  		'Auth',
		function($scope, $http, $location, Auth) {
			$scope.admin = {
	     		email: '',
	   			password: ''
    		};

	    $scope.userAction = function() {
	      $http.post('/api/admin', $scope.admin).then(function (res) {
	      		$location.path('/');
	      }, function (res) {
	          console.log(res.data);
	      });
	    }

	}]);