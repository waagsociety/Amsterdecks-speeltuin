$(document).ready(init);

function init(){
  var mapElement = document.getElementById('map');
  
  fieldsLoader({ path: '/public/fields/' }, function(err, fields){
    console.log(err || 'starting field system');
    if(err) throw(err);

    //document.querySelector('section').appendChild(motionDisplay.canvas);
    var importedGridOptions = {
      width: window.exportX,//1107,//336,
      height: window.exportY,//1103,//314,
      fields: fields,
      timePassing: true
    };
    
    var winAspect = $(mapElement).innerWidth() / $(mapElement).innerHeight(),
			fieldAspect = importedGridOptions.width / importedGridOptions.height,
			wider = fieldAspect > winAspect,
			scale = !wider ? $(mapElement).innerWidth() / importedGridOptions.width : $(mapElement).innerHeight() / importedGridOptions.height;
    var motionDisplay = new MotionDisplay({
      //debugField: true,
      background: 'rgba(11,41,91,'+ trailLenght +')',
      gridOptions: importedGridOptions,
			width: Math.floor(importedGridOptions.width * scale),
			height: Math.floor(importedGridOptions.height * scale),
			clipPath: window.clipPath
    });
    window.md = motionDisplay;
    
    initMotionDisplayControls(motionDisplay);
    initVariationControls(motionDisplay);
    
    mapElement.appendChild(motionDisplay.canvas);
    
    motionDisplay.canvas.style.width = Math.floor(importedGridOptions.width * scale) + 'px';
		motionDisplay.canvas.style.height = Math.floor(importedGridOptions.height * scale) + 'px';
    
    
    document.addEventListener('keyup', function(e){
      console.log(e.keyCode);
      if(e.keyCode === 13){
        if(motionDisplay.debugField){
          motionDisplay.debugField = false;
          motionDisplay.start();
        } else {
          motionDisplay.debugField = true;
          motionDisplay.running = false;
        }
        return;
      }

      if(e.keyCode === 86){
        motionDisplay.grid.nextVariant();
        return;
      }

      if(e.keyCode === 84){
        motionDisplay.grid.nextTime();
        return;
      }

      if(e.keyCode === 80){
        motionDisplay.grid.toggleTimePassing();
      }
    });

    $(motionDisplay.canvas).on('click', function(e){
      console.log(motionDisplay.grid.getLocalV({ x: e.offsetX, y: e.offsetY }));
      console.log(motionDisplay.grid.getLocalV({ x: e.offsetX + Math.random(), y: e.offsetY + Math.random() }));
    });
  });
}