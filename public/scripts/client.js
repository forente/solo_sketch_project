angular.module('doodleApp',[]);

angular.module('doodleApp').controller('loginController', function($http, $location){
  var vm = this;

  vm.logInput = function(){

    var loginPackage = {};
    loginPackage.username = vm.username;
    loginPackage.password = vm.password;

    console.log(loginPackage);

    $http.post('/login/',loginPackage).then(successHandler, failureHandler);

    function successHandler(res){
      console.log(res);

    }

    function failureHandler(res){
      console.log('Posting Issue');
    }
  };


});

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
