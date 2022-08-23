function detect(processingImage){
    //cv.bitwise_not(processingImage, processingImage);
    let scale_percent = 640/processingImage.size()["width"];
    let width = 640;
    let height = ~~(processingImage.size()["height"] * scale_percent);
    
    cv.resize(processingImage, 
        processingImage,
        new cv.Size(width,height),
        0,
        0,
        cv.INTER_AREA);

    //cv.cvtColor(processingImage, processingImage, cv.COLOR_RGBA2GRAY, 0);
    //cv.threshold(processingImage, processingImage, 200, 255, cv.THRESH_BINARY + cv.THRESH_OTSU);
    return processingImage;
}