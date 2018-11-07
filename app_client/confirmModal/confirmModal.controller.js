(function () {
	angular
		.module('recipebook')
		.controller('confirmModalCtrl', confirmModalCtrl);
		
	confirmModalCtrl.$inject = ['$uibModalInstance'];
	function confirmModalCtrl($uibModalInstance) {
		const vm = this;
		vm.message = "Are you sure you want to delete this recipe?";
		
		vm.modal = {
			close: function(result) {
				$uibModalInstance.close(result);
			},
			cancel: function() {
				$uibModalInstance.dismiss('cancel');
			}
		};
		
		vm.onSubmit = function() {
			vm.modal.close(true);
		};
		
		
	}
}) ();