(function () {
	
	angular
		.module('recipebook')
		.service('recipebookData', recipebookData);
		
	recipebookData.$inject = ['$http'];
	function recipebookData ($http) {
		let allRecipes = function() {
			return $http.get('/api/recipes');
		};
		
		let recipeById = function(recipeid) {
			return $http.get('/api/recipes/' + recipeid);
		};
	
		return {
			allRecipes : allRecipes,
			recipeById : recipeById
		};
	};
}) ();
	
	