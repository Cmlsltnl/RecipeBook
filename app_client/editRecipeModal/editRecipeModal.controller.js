(function () {
	angular
		.module('recipebook')
		.controller('editRecipeModalCtrl', editRecipeModalCtrl);
		
	editRecipeModalCtrl.$inject = ['$uibModalInstance', 'recipebookData', 'recipeData'];
	function editRecipeModalCtrl($uibModalInstance, recipebookData, recipeData) {
		const vm = this;
		vm.recipe = recipeData.recipe;
		
		//Set initial data for edit modal
		vm.formData = {
			name: vm.recipe.name,
			rating: vm.recipe.rating,
			ingredients: recipebookData.addLineBreaks(vm.recipe.ingredients, false),
			directions: recipebookData.addLineBreaks(vm.recipe.directions, true),
			sourceUrl: vm.recipe.sourceUrl,
			photoUrl: vm.recipe.photoUrl,
			prepTime: vm.recipe.prepTime,
			cookTime: vm.recipe.cookTime,
			servings: vm.recipe.servings,
			course: vm.recipe.course,
			tags: recipebookData.addLineBreaks(vm.recipe.tags, false),
			notes: vm.recipe.notes
		};
				
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
				vm.doEditRecipe(vm.formData);
			}
		};
		
		vm.doEditRecipe = function(formData) {
			recipebookData.editRecipe(vm.recipe._id, {
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