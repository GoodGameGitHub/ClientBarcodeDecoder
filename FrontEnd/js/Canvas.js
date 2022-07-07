class Canvas{
    constructor(Element){
        this.htmlElement = document.getElementById(Element);
        this.ctx = this.htmlElement.getContext("2d");
    }

    initialize(width, height){
        this.htmlElement.width = width;
        this.htmlElement.height = height;
        this.pixelsLenght = width*height*4;
    }

    getImage(){
        this.imgData = this.ctx.getImageData(0, 0, this.htmlElement.width, this.htmlElement.height);
        this.pixels = this.imgData.data;
    }

    setImage(pixels){
        this.pixels = pixels;
        //this.imgData.data = this.pixels;
        this.ctx.putImageData(this.imgData, 0, 0);
    }
}