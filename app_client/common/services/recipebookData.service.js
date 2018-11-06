(function () {
	
	angular
		.module('recipebook')
		.service('recipebookData', recipebookData);
		
	recipebookData.$inject = ['$http', 'authentication'];
	function recipebookData ($http, authentication) {
		const allRecipes = function() {
			return $http.get('/api/recipes' , {
				headers: {
					Authorization: 'Bearer ' +  authentication.getToken()
				}
			});
		};
		
		const recipeById = function(recipeid) {
			return $http.get('/api/recipes/' + recipeid);
		};
		
		const addRecipe = function(data) {
			return $http.post('/api/recipes', data, {
				headers: {
					Authorization: 'Bearer ' + authentication.getToken()
				}
			});
		};
		
		const editRecipe = function(recipeid , data) {
			return $http.put('/api/recipes/' + recipeid, data, {
				headers: {
					Authorization: 'Bearer ' + authentication.getToken()
				}
			});
		};
		
		//Takes in an array and boolean (extraLine), and returns a string with newlines 
		//characters inserted. extraLine puts a blank line between each string
		const addLineBreaks = function(array, extraLine) {
			const length = array.length;
			let output = "";
			
			for(let i = 0; i < length; i++) {
				if(i < length - 1) {
					output += (extraLine ? array[i] + "\n\n" : array[i] + "\n");
				} else {
					output += array[i];
				}
			}
			return output;
		}
	
		return {
			allRecipes : allRecipes,
			recipeById : recipeById,
			addRecipe : addRecipe,
			editRecipe : editRecipe,
			addLineBreaks : addLineBreaks
		};
	};
}) ();
	
	