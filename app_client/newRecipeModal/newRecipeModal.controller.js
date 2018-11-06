(function () {
	angular
		.module('recipebook')
		.controller('newRecipeModalCtrl', newRecipeModalCtrl);
		
	newRecipeModalCtrl.$inject = ['$uibModalInstance', 'recipebookData'];
	function newRecipeModalCtrl($uibModalInstance, recipebookData) {
		const vm = this;
		
		vm.modal = {
			close: function(result) {
				$uibModalInstance.close(result);
			},
			cancel: function() {
				$uibModalInstance.dismiss('cancel');
			}
		};
		
		vm.onSubmit = function() {
			vm.formError = "";
			if(!vm.formData || !vm.formData.name || !vm.formData.ingredients || !vm.formData.directions) {
				vm.formError = "Name, Ingredients, and Directions are required";
				return false;
			} else {
				vm.doAddRecipe(vm.formData);
			}
		};
		
		vm.doAddRecipe = function(formData) {
			recipebookData.addRecipe({
				name: formData.name,
				sourceUrl: formData.sourceUrl,
				ingredients: formData.ingredients,
				directions: formData.directions,
				rating: formData.rating,
				photoUrl: formData.photoUrl,
				notes: formData.notes,
				prepTime: formData.prepTime,
				cookTime: formData.cookTime,
				servings: formData.servings,
				course: formData.course,
				mainIngredient: formData.mainIngredient,
				tags: formData.tags
			})
					.then(function(response) {
						vm.modal.close(response.data);
					}, function(response) {
						vm.formError = "Your recipe has not been saved, try again";
					});
			return false;
		};
	}
}) ();