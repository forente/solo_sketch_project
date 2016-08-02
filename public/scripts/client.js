angular.module('doodleApp',[]);

angular.module('doodleApp').controller('loginController', function($http){
  var vm = this;

  vm.message = "Transfer complete"

  console.log(vm.message);
});
