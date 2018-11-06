(function () {
	
	angular
		.module('recipebook')
		.controller('homeCtrl', homeCtrl);
		
	homeCtrl.$inject = ['$uibModal', 'recipebookData', 'authentication'];
	function homeCtrl ($uibModal, recipebookData, authentication) {
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
		
		if(authentication.isLoggedIn()) {
			vm.getData();
		} else {
			vm.message = "Please Sign in to view your recipes"
		}
		
		vm.popupNewRecipeModal = function() {
			const modalInstance = $uibModal.open({
				templateUrl: '/newRecipeModal/newRecipeModal.view.html',
				controller: 'newRecipeModalCtrl',
				controllerAs: 'vm',
				windowClass: 'app-modal-window'
			});
			
			modalInstance.result.then(function (data) {
				vm.data.recipes.push(data);
			}, function(res){
				//on cancel
			});
		};
		
		vm.popupEditRecipeModal = function(id) {
			var editId;
			const modalInstance = $uibModal.open({
				templateUrl: '/editRecipeModal/editRecipeModal.view.html',
				controller: 'editRecipeModalCtrl',
				controllerAs: 'vm',
				windowClass: 'app-modal-window',
				resolve : {
					recipeData : function () {
						for(let i = 0, numRecipes = vm.data.recipes.length; i < numRecipes; i++) {
							if(vm.data.recipes[i]._id === id) {
								var recipeToEdit = vm.data.recipes[i];
								editId = i;
							}
						}
						
						return {
							recipe : recipeToEdit
						};
					}
				}
			});
			
			modalInstance.result.then(function (data) {
				vm.data.recipes[editId] = data;
			}, function(res){
				//on cancel
			});
		};
				
		
	}
}) ();