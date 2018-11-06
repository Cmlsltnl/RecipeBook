(function () {
	
	angular
		.module('recipebook')
		.controller('viewRecipeCtrl', viewRecipeCtrl);
		
	viewRecipeCtrl.$inejct = ['$routeParams', 'recipebookData'];
	function viewRecipeCtrl ($routeParams, recipebookData) {
		const vm = this;
		vm.recipeid = $routeParams.recipeid;
		
		recipebookData.recipeById(vm.recipeid)
			.then(function (response) {
				vm.data = { recipe : response.data };
				vm.pageHeader = {
					title: vm.data.recipe.name
				};
			} , function (response) {
				vm.message = "Sorry, something's gone wrong";
				console.log(response.status);
			});
	}
}) ();