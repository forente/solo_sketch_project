
  var can = document.getElementById("ddd");
  console.log(can);
  var ctx = can.getContext("2d");

  var img = new Image();
  img.src = '../image/13YellowEye.jpg';

  img.onload = function(){
    ctx.drawImage(img, 0,0);
    img.style.display = 'none';
  };

  var brush = ctx.createImageData(150,150);

    function randomNum(a,b){
      return Math.floor((Math.random() * a) +b);
    }



  var paint = function(event){

    for (var i = 0; i < brush.data.length; i+=4) {
      brush.data[i] = randomNum(155,100);
      brush.data[i+1] = randomNum(55, 200);
      brush.data[i+2] = randomNum(105, 150);
      brush.data[i+3] = i%255;
    }

    var x = event.offsetX - 75;
    var y = event.offsetY -75;
    ctx.putImageData(brush,x,y);
  }

  console.log(brush);


  console.log(ctx.getImageData(0,0,can.width,can.height));

  var color = document.getElementById('color');
  function pick(event){
    var x = event.layerX;
    var y = event.layerY;

    var pixel = ctx.getImageData(x, y, 1,1);
    var data = pixel.data;
    var rgba = 'rgba(' + data[0] + ',' + data[1] +',' + data[2] + ',' + data[3] + ')';

    color.style.background =  rgba;
    color.textContent = rgba;
    console.log(rgba);
  }
  // beginning of the line draw


  var isDrawing = false;

  var lastX;
  var lartY;
  var currentX;
  var currnetY;
  var brushColor = "#000000";

  function updateColor (jscolor){
    brushColor = '#' + jscolor;
    console.log(jscolor);
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






  console.log(can.toDataURL());
  //can.addEventListener('click',pick);
  //can.addEventListener("mousemove",paint);

  can.addEventListener('mousedown',startDraw);
  can.addEventListener('mousemove', drawLine);
  can.addEventListener('mouseup', stopDraw);
  can.addEventListener('mouseout',stopDraw)
