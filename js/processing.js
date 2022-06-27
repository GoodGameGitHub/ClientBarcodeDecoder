//Declaración de objetos
var canvasShown = new Canvas("canvasShown");
var canvasProcess = new Canvas("canvasProcess");

//Dimensiones de canvasShown y cámara
var widthCanvasShown = heightCanvasShown = 500;
canvasShown.initialize(widthCanvasShown, heightCanvasShown);

var vOptions = {
    audio:false,
    video:{width:500, height:500}
};


//Dimensiones del espacio de trabajo
var x1 = 50, x2 = 449;
var y1 = 100, y2 = 299;
var bP = 0.35; //Porcentaje de brillo
var thres = 150; //Valor de umbral
var detected = false;

var widthCanvasProcess = x2-x1+1, heightCanvasProcess = y2-y1+1;
canvasProcess.initialize(widthCanvasProcess, heightCanvasProcess);

function showCamera(){
    if(navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia(vOptions)
            .then(function(stream) {
                video.srcObject = stream;
                canvasInput();
            })
            .catch(function(err) {
                console.log("Something went wrong:",err);
            })
    }
    else {
        console.log("Something went wrong: getUserMedia doesn't exist");
    }
}

function canvasInput(){
    canvasShown.ctx.drawImage(video,0,0,widthCanvasShown,heightCanvasShown,0,0,widthCanvasShown,heightCanvasShown);
    canvasProcess.ctx.drawImage(video,x1,y1,(x2-x1+1),(y2-y1+1),0,0,(x2-x1+1),(y2-y1+1)); //CHECALO
    canvasShown.getImage();
    canvasProcess.getImage();
    canvasShownPutImage();
    canvasProcessPutImage();

    if(detected){
        return;
    }
    else{
        setTimeout(canvasInput,10);
    }
}

function canvasShownPutImage(){
    let pixelsLenght = canvasShown.pixelsLenght;
    let pixels = canvasShown.pixels;
    let width = canvasShown.htmlElement.width;
    for(let i = 0; i < pixelsLenght; i +=4){
        pixel = Math.floor(i/4);
        row = Math.floor(pixel/width);
        column = pixel%width;
        if(column >= x1 && column <= x2 && row >= y1 && row <= y2){
            continue;
        }
        else{
            pixels[i] = Math.floor(pixels[i]*bP);
            pixels[i+1] = Math.floor(pixels[i+1]*bP);
            pixels[i+2] = Math.floor(pixels[i+2]*bP);
        }
    }
    canvasShown.setImage(pixels);
}

function canvasProcessPutImage(){
    let pixelsLenght = canvasProcess.pixelsLenght;
    let pixels = canvasProcess.pixels;
    let val = 0;
    let width = canvasProcess.htmlElement.width;
    for(let i = 0; i < pixelsLenght; i += 4){
        pixel = Math.floor(i/4);
        row = Math.floor(pixel/width);
        column = pixel%width;
        val = (pixels[i] <= thres && pixels[i+1] <= thres && pixels[i+2] <= thres)? 0 : 255;
        
        pixels[i] = val;
        pixels[i+1] = val;
        pixels[i+2] = val;
    }
    canvasProcess.setImage(pixels);
}

