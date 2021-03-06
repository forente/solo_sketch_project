angular.module('doodleApp').controller('registerController', function($http){
  var vm = this;



  vm.logInput = function(){

    var registerPackage = {};
    registerPackage.email    = vm.email;
    registerPackage.username = vm.username;
    registerPackage.password = vm.password;

    $http.post('/register/createData',registerPackage).then(successHandler, failureHandler);

    function successHandler(res){
      console.log(res);
    }

    function failureHandler(res){
      console.log('Posting Issue');
    }
  };
});
