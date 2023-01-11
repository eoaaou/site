

(function () {
var words = ["Hello", "Welcome!" ],
i = 0;
setInterval(function(){ $('#words').fadeOut(function(){
    $(this).html(words[(i = (i + 1) % words.length)]).fadeIn();
    }); }, 3000)
})();

var img = new Image();
img.onload = start;
img.src = "/images/grad.png";

function start() {

  var canvas = document.querySelector("canvas");
  var ctx = canvas.getContext("2d");
  var clientX = 0;
  var clientY = 0;
  
  canvas.addEventListener("mousemove", function(evt) {
    clientX = evt.clientX / canvas.width;
    clientY = evt.clientY / canvas.height;
  });
  
  function mix(a, b, l) {
    return a + (b - a) * l;
  }
  
  function upDown(v) {
    return Math.sin(v) * 0.5 + 0.5;
  }
  
  function render(time) {
    time *= 0.0005;

    resize(canvas);

    var t1 = time;
    var t2 = time * 0.37;

    // for each line in the canvas
    for (var dstY = 0; dstY < canvas.height; ++dstY) {
      
      // v is value that goes 0 to 1 down the canvas
      var v = dstY / canvas.height;
      
      // compute some amount to offset the src
      var off1 = Math.sin((v + clientX) * mix(3, 12, upDown(t1))) * 200;
      var off2 = Math.sin((v + clientY) * mix(3, 12, upDown(t2)));
      var off = off1 + off2;
      
      // compute what line of the source image we want
      // NOTE: if off = 0 then it would just be stretching
      // the image down the canvas.
      var srcY = dstY * img.height / canvas.height + off;
      
      // clamp srcY to be inside the image
      srcY = Math.max(0, Math.min(img.height - 1, srcY));

      // draw a single line from the src to the canvas
      ctx.drawImage(
        img, 
        0, srcY, img.width, 1, 
        0, dstY, canvas.width, 1);
    }    
    
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  function resize(canvas) {
    var width = canvas.clientWidth;
    var height = canvas.clientHeight;
    if (width != canvas.width || height != canvas.height) {
      canvas.width = width;
      canvas.height = height;
    }
  }
}
