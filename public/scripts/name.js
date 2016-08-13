angular.module('doodleApp').factory('nameKeeper',function(){

  var data = {};


  var setName = function(n){
    data.name = n;
  };

  var getName = function(){
    return data.name;
  };



  return {
    data: data,
    setName: setName,
    getName: getName
  }
});
