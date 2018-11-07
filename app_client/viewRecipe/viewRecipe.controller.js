(function () {
	
	angular
		.module('recipebook')
		.controller('viewRecipeCtrl', viewRecipeCtrl);
		
	viewRecipeCtrl.$inejct = ['$routeParams', '$window', '$uibModal', 'recipebookData'];
	function viewRecipeCtrl ($routeParams, $window, $uibModal, recipebookData) {
		const vm = this;
		vm.recipeid = $routeParams.recipeid;
		
		recipebookData.recipeById(vm.recipeid)
			.then(function (response) {
				vm.data = { recipe : response.data };
			} , function (response) {
				vm.message = "Sorry, something's gone wrong";
				console.log(response.status);
			});
			
		vm.popupEditRecipeModal = function() {
			const modalInstance = $uibModal.open({
				templateUrl: '/editRecipeModal/editRecipeModal.view.html',
				controller: 'editRecipeModalCtrl',
				controllerAs: 'vm',
				windowClass: 'app-modal-window',
				resolve : {
					recipeData : function () {
												
						return {
							recipe : vm.data.recipe
						};
					}
				}
			});
			
			modalInstance.result.then(function (data) {
				vm.data.recipe = data;
			}, function(res){
				//on cancel
			});
		};
		
		vm.popupConfirmModal = function() {
			const modalInstance = $uibModal.open({
				templateUrl: '/confirmModal/confirmModal.view.html',
				controller: 'confirmModalCtrl',
				controllerAs: 'vm',
				windowClass: 'app-modal-confirm',
			});
			
			modalInstance.result.then(function () {
				vm.deleteRecipe();
			}, function(res){
				//on cancel
			});
		};
		
		vm.deleteRecipe = function () {
			recipebookData.deleteRecipe(vm.recipeid)
				.then(function (response) {
					$window.location.href = '/';
				} , function (response) {
					vm.message = "Recipe not deleted, please try again.";
				});
					
		}
	}
}) ();