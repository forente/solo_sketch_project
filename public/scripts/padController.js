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
