function detect(processingImage){
    
    
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
    //Vamos a intentar redimensionarlo con ctx.putimage
    //Se tiene que redimensionar y dimensionar al tamanno original
    cv.cvtColor(processingImage, processingImage, cv.COLOR_RGBA2GRAY, 0);
    cv.threshold(processingImage, processingImage, 180, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);
    cv.bitwise_not(processingImage, processingImage);
    
    cv.dilate(processingImage, processingImage, d_kernel, d_anchor_point, 1, cv.BORDER_CONSTANT, cv.morphologyDefaultBorderValue());
    cv.resize(processingImage, 
        processingImage,
        d_originalSize,
        0,
        0,
        cv.INTER_AREA);
    cv.findContours(processingImage, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);
    
    for(let i = 0; i < contours.size(); i++){
        let contour = contours.get(i);
        let rect = cv.boundingRect(contour);
        //cv.contourArea(cnt, false);
        let sides = new Array(2);
        if(rect.width < 60 || rect.height < 50 /* || (cv.contourArea(contour,false)/(rect.width*rect.height) < 0.6)*/){
            continue;
        }
        
        let angle = calcAngle(contour);
        if((2.5 >= angle && angle >= -2.5) || 
        (92.5 >= angle && angle >= 87.5) || 
        (182.5 >= angle && angle >= 177.5) || 
        (272.5 >= angle && angle >= 267.5)){
            let point1 = new cv.Point(rect.x, rect.y);
            let point2 = new cv.Point(rect.x + rect.width, rect.y + rect.height);
            cv.rectangle(dst, point1, point2, new cv.Scalar(0,255,0), 2, cv.LINE_AA, 0);
            cv.drawContours(dst,contours, i, new cv.Scalar(255,255,255), 1, cv.LINE_8, hierarchy, 100);
            
            //candidates.pop(rect);
        }
        
        
    }
    processingImage.delete();hierarchy.delete();contours.delete();
    return dst;
}


function calcAngle(contour){
    let sides = new Array(2);
    let vertices = cv.RotatedRect.points(cv.minAreaRect(contour));
    for(let j = 0; j < 2; j++){
        sides[j] = Math.sqrt((~~(vertices[j+1].x - vertices[j].x))**2 + (~~(vertices[j+1].y - vertices[j].y))**2);
    }
    if(sides[0] >= sides[1]){
        return Math.atan((vertices[1].x - vertices[0].x)/(vertices[1].y - vertices[0].y))*180/Math.PI;
    }
    else{
        return Math.atan((vertices[2].x - vertices[1].x)/(vertices[2].y - vertices[1].y))*180/Math.PI;
    }
}