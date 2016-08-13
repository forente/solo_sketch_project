angular.module('doodleApp').controller('padController',function($http, $scope, nameKeeper){
  var vm = this;

  vm.grabImageName = function(){
    var photo =  angular.element(document.querySelector("#pad"));

    var photoPackage = {};
    photoPackage.imageName = vm.imageName;
    photoPackage.photo = photo[0].toDataURL();
    photoPackage.username = nameKeeper.getName();
    console.log(photoPackage);


    $http.post('/save',photoPackage).then(successHandler, failureHandler);

    function successHandler(res){
      console.log(res);
    }

    function failureHandler(res){
      console.log('Posting Issue');
    }

    console.log(photo[0]);
    //vm.ctxf.lineWidth = 33;
  //  console.log(vm.ctxf.lineWidth);


  };


    // setting up canvas
    var can = document.getElementById("pad");
    console.log(can);
    var ctx = can.getContext("2d");

    var img = new Image();
    img.src = '../image/13YellowEye.jpg';

    img.onload = function(){
      ctx.drawImage(img, 0,0);
      img.style.display = 'none';
    };


    var color = document.getElementById('color');

    // beginning of the line draw


    var isDrawing = false;

    var lastX;
    var lartY;
    var currentX;
    var currnetY;
    var brushColor = "#000000";
    var lineThickness = 3;



    vm.updateColor = function(){
      brushColor = vm.color;
      //console.log(vm.color);
    };
    vm.widthChange = function(){
      lineThickness = vm.lineTk;
    }

    var startDraw = function (event){
      if(event.offsetY!= undefined ){
        lastX = event.offsetX;
        lastY = event.offsetY;
      }
      ctx.beginPath();
      isDrawing = true;
    };

    var drawLine = function (event){
      if (isDrawing){
        if(event.offsetY!= undefined ){
          currentX = event.offsetX;
          currentY = event.offsetY;
        }
        draw(lastX, lastY, currentX, currentY );

        lastX = currentX;
        lastY = currentY;

      }
    };




    function draw (lX, lY, cX, cY){
      ctx.moveTo(lX, lY);
      ctx.lineTo(cX, cY);
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = lineThickness;
      ctx.globalAlpha =1;
      ctx.stroke();

    }

    var stopDraw = function(){
      isDrawing = false;
    };

    //console.log(can.toDataURL());
    //can.addEventListener('click',pick);
    //can.addEventListener("mousemove",paint);

    can.addEventListener('mousedown',startDraw);
    can.addEventListener('mousemove', drawLine);
    can.addEventListener('mouseup', stopDraw);
    can.addEventListener('mouseout',stopDraw)







});
