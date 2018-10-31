(function () {
	angular
		.module('recipebook')
		.service('authentication', authentication)
		
	authentication.$inject = ['$http', '$window'];
	function authentication ($http, $window) {
		
		const saveToken = function(token) {
			$window.localStorage['recipebook-token'] = token;
		};
		
		const getToken = function() {
			return $window.localStorage['recipebook-token'];
		};
		
		const register = function(user) {
			return $http.post('/api/register', user).then(function(obj) {
				saveToken(obj.data.token);
			});
		};
		
		const login = function(user) {
			return $http.post('/api/login', user).then(function(obj) {
				saveToken(obj.data.token);
			});
		};
		
		const logout = function() {
			$window.localStorage.removeItem('recipebook-token');
		};
		
		const isLoggedIn = function () {
			const token = getToken();
			
			if(token) {
				const payload = JSON.parse($window.atob(token.split('.')[1]));
				
				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};
		
		const currentUser = function() {
			if(isLoggedIn()) {
				const token = getToken();
				const payload = JSON.parse($window.atob(token.split('.')[1]));
				return {
					email : payload.email,
					name : payload.name
				};
			}
		};
		
		return {
			saveToken : saveToken,
			getToken : getToken,
			register : register,
			login : login,
			logout : logout,
			isLoggedIn : isLoggedIn,
			currentUser : currentUser
		};
	}
	
}) ();