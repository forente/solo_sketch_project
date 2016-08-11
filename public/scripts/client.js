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
      //Right now - res is html sent back from login.js
      console.log(res);

      //$location.path('/home');

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

angular.module('doodleApp').controller('padController',function($http, $element){
  var vm = this;




  vm.grabImageName = function(){
    var photo =  angular.element(document.querySelector("#pad"));

    var photoPackage = {};
    photoPackage.imageName = vm.imageName;
    photoPackage.photo = photo[0].toDataURL();
    console.log(photoPackage);

    $http.post('/save',photoPackage).then(successHandler, failureHandler);

    function successHandler(res){
      console.log(res);
    }

    function failureHandler(res){
      console.log('Posting Issue');
    }

  };
});
