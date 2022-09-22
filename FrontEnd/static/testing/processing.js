//Dimensiones de canvasShown, cámara y matriz CV
var widthCanvasShown = 400, heightCanvasShown = 200;


var vOptions = {
    audio:false,
    video:{width:widthCanvasShown, height:heightCanvasShown, deviceId:undefined}
};

var cameraDevices = [];
var iter = 0;
//Dimensiones del espacio de trabajo
var x1 = 50, x2 = 349;
var y1 = 50, y2 = 149;
var bP = 0.35; //Porcentaje de brillo
var thres = 150; //Valor de umbral
var detected = false;

var widthCanvasProcess = x2-x1+1, heightCanvasProcess = y2-y1+1;

//Declaración de objetos
//canvasShown es el canvas que se muestra al usuario
//canvasProcess es el canvas que se utilizará para la decodificación del código de barras
var canvasShown = new Canvas("canvasShown", widthCanvasShown, heightCanvasShown); 
var canvasProcess1 = new Canvas("canvasProcess7", widthCanvasProcess, heightCanvasProcess);

var openCVLoaded = false;

// constantes de la función «detect»
var d_scale_percent, d_width, d_height, d_originalSize, d_kernel, d_anchor_point;

function setOpenCV(){
    console.log("OpenCV is loaded");
    openCVLoaded = true;
    // constantes de la función «detect»
    d_scale_percent = 640/(x2-x1+1);
    d_width = 640;
    d_height = ~~((y2-y1+1) * d_scale_percent);
    d_originalSize = new cv.Size(x2-x1+1, y2-y1+1);
    d_kernel = cv.Mat.ones(2,20,cv.CV_8U);
    d_anchor_point = new cv.Point(-1, -1);
}

function showCamera(){
    if(navigator.mediaDevices.getUserMedia && cameraDevices.length == 0){
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            devices.forEach((device) => {
                if(device.kind == "videoinput"){
                    cameraDevices.push(device.deviceId);
                }
            });
        }).catch(function(err) {
            console.log("Something went wrong: ",err);
        })
    }
    else {
        console.log("Something went wrong: getUserMedia doesn't exist");
    }

    var vOptions = {
        audio:false,
        video:{width:500, height:500, deviceId:cameraDevices[iter]}
    }

    if(openCVLoaded){
        navigator.mediaDevices.getUserMedia(vOptions)
        .then(function(stream) {
            videoHTML.srcObject = stream;
            canvasInput();
        })
        .catch(function(err) {
            console.log("Something went wrong: ",err);
        });
    }
    
}


function changeCamera(){
    iter = (cameraDevices.length-1 == iter)? 0: iter + 1;
    vOptions = {
        audio:false,
        video:{width:widthCanvasShown, height:heightCanvasShown, deviceId:cameraDevices[iter]}
    }
    navigator.mediaDevices.getUserMedia(vOptions)
    .then(function(stream) {
        videoHTML.srcObject = stream;
        canvasInput();
    })
    .catch(function(err) {
        console.log("Something went wrong: ",err);
    });
}


function canvasInput(){
    try{
        canvasShown.ctx.drawImage(videoHTML,0,0,widthCanvasShown,heightCanvasShown,0,0,widthCanvasShown,heightCanvasShown);
        canvasProcess1.ctx.drawImage(videoHTML,x1,y1,(x2-x1+1),(y2-y1+1),0,0,(x2-x1+1),(y2-y1+1));
        canvasShownPutImage(canvasShown.getImage(0));
        canvasProcessPutImage(canvasProcess1.getImage(1));
    }
    catch(error){
        console.log(error);
        detected = false;
        canvasProcessPutImage(new cv.Mat.zeros(heightCanvasProcess, widthCanvasProcess, cv.CV_8UC3));
    }
    if(detected){
        return;
    }
    else{
        setTimeout(canvasInput,1);
    }
}

function canvasShownPutImage(pixels){
    let pixelsLenght = pixels.length;
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

function canvasProcessPutImage(mat){
    let processingImage = detect(mat);
    /*
    let pixelsLenght = mat.data.length;
    let val = 0;
    let width = canvasProcess.htmlElement.width;
    let dest = new cv.Mat();
    let low = new cv.Mat(mat.rows, mat.cols, mat.type(), [100,100,100,0]);
    let high = new cv.Mat(mat.rows, mat.cols, mat.type(), [255,255,255,0]);;
    cv.inRange(mat, high, low, dest);
    
    for(let i = 0; i < pixelsLenght; i += 4){
        pixel = Math.floor(i/4);
        row = Math.floor(pixel/width);
        column = pixel%width;
        val = (mat.data[i] <= thres && mat.data[i+1] <= thres && mat.data[i+2] <= thres)? 0 : 255;
        
        mat.data[i] = val;
        mat.data[i+1] = val;
        mat.data[i+2] = val;
    }
    */
    //Detectar y procesar
    canvasProcess1.setImage(processingImage);
} 

