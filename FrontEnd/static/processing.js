//Dimensiones de canvasShown, cámara y matriz CV
var widthCanvasShown = heightCanvasShown = 500;

var test;
var vOptions = {
    audio:false,
    video:{width:widthCanvasShown, height:heightCanvasShown, deviceId:undefined}
};

var cameraDevices = [];
var iter = 0;
//Dimensiones del espacio de trabajo
var x1 = 50, x2 = 449;
var y1 = 100, y2 = 299;
var bP = 0.35; //Porcentaje de brillo
var thres = 150; //Valor de umbral
var detected = false;

var widthCanvasProcess = x2-x1+1, heightCanvasProcess = y2-y1+1;

//Declaración de objetos
//canvasShown es el canvas que se muestra al usuario
//canvasProcess es el canvas que se utilizará para la decodificación del código de barras
var canvasShown = new Canvas("canvasShown", widthCanvasShown, heightCanvasShown); 
var canvasProcess = new Canvas("canvasProcess", widthCanvasProcess, heightCanvasProcess); 


var destinyCV, sourceCV, capCV, openCVLoaded = false;

function setOpenCV(){
    console.log("OpenCV is loaded");
    destinyCV = new cv.Mat(heightCanvasProcess,widthCanvasProcess, cv.CV_8UC1);
    sourceCV = new cv.Mat(heightCanvasShown,widthCanvasShown, cv.CV_8UC4);
    capCV = new cv.VideoCapture(document.getElementById("videoHTML"));
    openCVLoaded = true;
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
        video:{width:500, height:500, deviceId:cameraDevices[iter]}
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
    canvasShown.ctx.drawImage(videoHTML,0,0,widthCanvasShown,heightCanvasShown,0,0,widthCanvasShown,heightCanvasShown);
    canvasProcess.ctx.drawImage(videoHTML,x1,y1,(x2-x1+1),(y2-y1+1),0,0,(x2-x1+1),(y2-y1+1));
    

    canvasShownPutImage(canvasShown.getImage());
    canvasProcessPutImage(canvasProcess.getImage());

    if(detected){
        return;
    }
    else{
        setTimeout(canvasInput,1);
    }
}

function canvasShownPutImage(mat){
    let pixelsLenght = mat.data.length;
    let width = canvasShown.htmlElement.width;

    for(let i = 0; i < pixelsLenght; i +=4){
        pixel = Math.floor(i/4);
        row = Math.floor(pixel/width);
        column = pixel%width;
        if(column >= x1 && column <= x2 && row >= y1 && row <= y2){
            continue;
        }
        else{
            mat.data[i] = Math.floor(mat.data[i]*bP);
            mat.data[i+1] = Math.floor(mat.data[i+1]*bP);
            mat.data[i+2] = Math.floor(mat.data[i+2]*bP);
        }
    }
    canvasShown.setImage(mat);
}

function canvasProcessPutImage(mat){
    let pixelsLenght = mat.data.length;
    let val = 0;
    let width = canvasProcess.htmlElement.width;
    for(let i = 0; i < pixelsLenght; i += 4){
        pixel = Math.floor(i/4);
        row = Math.floor(pixel/width);
        column = pixel%width;
        val = (mat.data[i] <= thres && mat.data[i+1] <= thres && mat.data[i+2] <= thres)? 0 : 255;
        
        mat.data[i] = val;
        mat.data[i+1] = val;
        mat.data[i+2] = val;
    }
    //Detectar y procesar
    canvasProcess.setImage(mat);
}

