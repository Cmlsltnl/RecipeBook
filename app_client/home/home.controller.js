(function () {
	
	angular
		.module('recipebook')
		.controller('homeCtrl', homeCtrl);
		
	homeCtrl.$inject = ['recipebookData'];
	function homeCtrl (recipebookData) {
		let vm = this;
		vm.pageHeader = {
			title: 'RecipeBook',
			strapline: 'Store your recipes in one place!'
		};
		
		vm.sidebar = {
			content: "Tired of recipes getting lost? Store all recipes on " +
				"RecipeBook! Create a mealplan and automatically create " + 
				"your shopping list!"
		};
		
		vm.message = "No Recipes";
		
		vm.getData = function() {
			vm.message = "Loading your Recipes";
			recipebookData.allRecipes()
				.then(
					function(response) {
						vm.message = response.data.length > 0 ? "" : "No recipes found";
						vm.data = { recipes: response.data };
					}, function(response) {
						vm.message = "Sorry, something's gone wrong";
						console.log(response.status);
					});
		};
		vm.getData();
		vm.showError = function(error) {
			$scope.$apply(function () {
				vm.message = error.message;
			});
		};
	}
}) ();