class Canvas{
    constructor(Element, width, height){
        this.htmlElement = document.getElementById(Element);
        this.ctx = this.htmlElement.getContext("2d");
        this.htmlElement.width = width;
        this.htmlElement.height = height;
        this.pixelsLenght = width*height*4;
    }
    
    getImage(){
        this.imgData = this.ctx.getImageData(0, 0, this.htmlElement.width, this.htmlElement.height);
        let mat = new cv.Mat(this.htmlElement.height, this.htmlElement.width, cv.CV_8UC4);
        let length = this.imgData.data.length;
        for(let i = 0; i < length; i++){
            mat.data[i] = this.imgData.data[i];
        }
        return mat;
    }

    setImage(mat){//en lugar de pixels, es matriz
        cv.imshow(this.htmlElement.id,mat);
    }
}