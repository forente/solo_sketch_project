angular.module('doodleApp').controller('padController',function($http){
  var vm = this;
  console.log('loaded');
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

  function sketch(){

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

    function updateColor (jscolor){
      brushColor = '#' + jscolor;
      //console.log(jscolor);
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

     ctx.lineWidth = 1;
     ctx.globalAlpha =1;


    function draw (lX, lY, cX, cY){
      ctx.moveTo(lX, lY);
      ctx.lineTo(cX, cY);

      ctx.strokeStyle = brushColor;
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

  }



  sketch();

});
