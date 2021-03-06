angular.module('doodleApp').controller('loginController', function($http, $location, nameKeeper){
  var vm = this;

  vm.logInput = function(){

    var loginPackage = {};
    loginPackage.username = vm.username;
    loginPackage.password = vm.password;
    nameKeeper.setName(vm.username);
  //  console.log(nameKeeper.getName());

    //console.log(loginPackage);

    $http.post('/login/',loginPackage).then(successHandler, failureHandler);

    function successHandler(res){
      //Right now - res is html sent back from login.js
    //  console.log(res);

      $location.path('/home');

    }

    function failureHandler(res){
      console.log('Posting Issue');
    }
  };


});
