angular.module('MKServices', ['ngResource'])
.factory('Item', ['$resource', 'Auth', function($resource, Auth) {
	return $resource('/api/clothing/:id');
}])
.factory('Auth', ['$window', function($window) {
	return {
		saveToken: function(token, admin) {
			$window.localStorage['admin-token'] = token;
			$window.localStorage["admin.email"] = admin.email;
		},
		getToken: function() {
			return $window.localStorage['admin-token'];
		},
		removeToken: function() {
			$window.localStorage.removeItem('admin-token');
			$window.localStorage.removeItem["admin.email"];
		},
		adminLoggedIn: function() {
			var token = this.getToken();
			return token ? true : false;
		}
	};
}])
.factory('AuthInterceptor', ['Auth', function(Auth) {
	return {
		request: function(config) {
			var token = Auth.getToken();

			if(token) {
				config.headers.Authorization = 'Bearer ' +token;
			}
			return config;
		}
	};
}]);