function detect(processingImage){
    if(document.getElementById('canvasProcessCheckbox1').checked){
        cv.imshow('canvasProcess1',processingImage);
    }
    else{
        cv.imshow('canvasProcess1',new cv.Mat.zeros(processingImage.rows, processingImage.cols, cv.CV_8UC3));
    }
    let contours = new cv.MatVector(); 
    let hierarchy = new cv.Mat(); 
    let candidates = [], index = 0, added_index = [];
    let dst = new cv.Mat.zeros(processingImage.rows, processingImage.cols, cv.CV_8UC3);
    cv.resize(processingImage, 
        processingImage,
        new cv.Size(d_width,d_height),
        0,
        0,
        cv.INTER_AREA);
    cv.cvtColor(processingImage, processingImage, cv.COLOR_RGBA2GRAY, 0);
    if(document.getElementById('canvasProcessCheckbox2').checked){
        cv.imshow('canvasProcess2',processingImage);
    }
    else{
        cv.imshow('canvasProcess2',new cv.Mat.zeros(processingImage.rows, processingImage.cols, cv.CV_8UC3));
    }
    
    cv.threshold(processingImage, processingImage, 180, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);
    cv.bitwise_not(processingImage, processingImage); 
    if(document.getElementById('canvasProcessCheckbox3').checked){
        cv.imshow('canvasProcess3',processingImage);
    }
    else{
        cv.imshow('canvasProcess3',new cv.Mat.zeros(processingImage.rows, processingImage.cols, cv.CV_8UC3));
    }
    cv.dilate(processingImage, processingImage, d_kernel, d_anchor_point, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
    if(document.getElementById('canvasProcessCheckbox4').checked){
        cv.imshow('canvasProcess4',processingImage);
    }
    else{
        cv.imshow('canvasProcess4',new cv.Mat.zeros(processingImage.rows, processingImage.cols, cv.CV_8UC3));
    }
    cv.resize(processingImage, 
        processingImage,
        d_originalSize,
        0,
        0,
        cv.INTER_AREA);
    cv.findContours(processingImage, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);
    if(document.getElementById('canvasProcessCheckbox5').checked){
        cv.imshow('canvasProcess5',processingImage);
    }
    else{
        cv.imshow('canvasProcess5',new cv.Mat.zeros(processingImage.rows, processingImage.cols, cv.CV_8UC3));
    }
    
    for(let i = 0; i < contours.size(); i++){
        let contour = contours.get(i);
        let vertices = cv.RotatedRect.points(cv.minAreaRect(contour));

        for(let j = 0; j < 4; j++){
            cv.line(dst,vertices[j], vertices[(j+1)%4], new cv.Scalar(0,255,0), 2, cv.LINE_AA, 0);
        }
    }

    let color = new cv.Scalar(255,255,255);
    cv.drawContours(dst, contours, -1, color, 1, cv.LINE_8, hierarchy, 100);
    if(document.getElementById('canvasProcessCheckbox6').checked){
        cv.imshow('canvasProcess6',dst);
    }
    else{
        cv.imshow('canvasProcess6',new cv.Mat.zeros(dst.rows, dst.cols, cv.CV_8UC3));
    }
    processingImage.delete();hierarchy.delete();contours.delete();
    return dst;
}





function cropRectangle(rectangle, box, image){

}



