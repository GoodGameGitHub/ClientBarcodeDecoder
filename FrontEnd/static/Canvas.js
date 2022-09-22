class Canvas{
    constructor(Element, width, height){
        this.htmlElement = document.getElementById(Element);
        this.ctx = this.htmlElement.getContext("2d");
        this.htmlElement.width = width;
        this.htmlElement.height = height;
        this.pixelsLenght = width*height*4;
    }
    
    getImage(type){
        this.imgData = this.ctx.getImageData(0, 0, this.htmlElement.width, this.htmlElement.height);
        return (type == 0) ? this.imgData.data: cv.imread(this.htmlElement.id);//cv.matFromImageData(this.imgData);
    }

    setImage(processed){//Processed es el argumento que tiene una imagen ya procesada que puede ser del tipo cv.Mat o ctx.pixels
        if(processed instanceof cv.Mat){
            cv.imshow(this.htmlElement.id,processed);
        }
        else{
            this.pixels = processed;
            //this.imgData.data = this.pixels;
            this.ctx.putImageData(this.imgData, 0, 0);
        }
    }
} 