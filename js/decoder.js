//Función para decodificar imagen
function decode(image){


    return {"ean13" : ean13,
            "isValid" : isValid,
            "thresh" : thresh}
    ;
}

//Función para decodificar una línea asd
function decodeLine(line){
    //Line es un arreglo bla bla bla
    let bars = readBars(line);


}

//Función que retorna una arreglo de strings con las barras representadas como elemento binario con longitud
//Ej: ejemplo = ["000","11","000"], primer barra con valor 0 y longitud 3, segunda barra con valor 1 y 
//longitud 2, etc
function readBars(line){
    //Line es un arreglo de valores binarios (255 o 0) tomado directamente de la imagen ya procesada
    //y que tiene la información de la distribución de las barras representada como una línea transversal
    //horizontal
    lineLenght = line.length;
    let currentLenght = 1, bars = [], bar = "";
    for(let i = 0; i < lineLenght; i++){
        if(line[i] == line[i+1]){
            currentLenght += 1;
        }
        else{
            for(let j = 0; j < currentLenght; j++){
                bar = bar + ((line[i] == 255)? "1": "0");
            }
            bars.push(bar)
            currentLenght = 1;
            bar = "";
        }
    }
    return bars;
}

//Función para decodificar los 42 espacios a la izquierda del center guard
function decodeLeftBarPattern(pattern){ 
    //Pattern es un número binario de 7 dígitos en forma de string
    leftPatternObject = {
        "0001101" : 
        {code : 0, parity : "O"},
        "0100111" : 
        {code : 0, parity : "E"},
        "0011001" : 
        {code : 1, parity : "O"},
        "0110011" : 
        {code : 1, parity : "E"},
        "0010011" : 
        {code : 2, parity : "O"},
        "0011011" : 
        {code : 2, parity : "E"},
        "0111101" : 
        {code : 3, parity : "O"},
        "0100001" : 
        {code : 3, parity : "E"},
        "0100011" :
        {code : 4, parity : "O"},
        "0011101" : 
        {code : 4, parity : "E"},
        "0110001" : 
        {code : 5, parity : "O"},
        "0111001" : 
        {code : 5, parity : "E"},
        "0101111" : 
        {code : 6, parity : "O"},
        "0000101" : 
        {code : 6, parity : "E"},
        "0111011" : 
        {code : 7, parity : "O"},
        "0010001" : 
        {code : 7, parity : "E"},
        "0110111" : 
        {code : 8, parity : "O"},
        "0001001" :
        {code : 8, parity : "E"},
        "0001011" : 
        {code : 9, parity : "E"},
        "0010111" : 
        {code : 9, parity : "E"}
    }
    return leftPatternObject[pattern]
    //Retorna el valor decimal junto con la paridad (odd/impar - even/par) asociado al valor binario introducido
    //Esto sólo para los 42 espacios a la izquierda del center guard
}

//Función para decodificar los 42 espacios a la derecha del center guard
function decodeRightBarPattern(pattern){
    //Pattern es un número binario de 7 dígitos en forma de string
    rightPatternObject = {
        "1110010" : 0,
        "1100110" : 1,
        "1101100" : 2,
        "1000010" : 3,
        "1011100" : 4,
        "1001110" : 5,
        "1010000" : 6,
        "1000100" : 7,
        "1001000" : 8,
        "1110100" : 9
    }

    return rightPatternObject[pattern]
    //Retorna el valor decimal asociado al valor binario introducido
    //Esto sólo para los 42 espacios a la derecha del center guard
}

//Función para calcular el primer dígito del EAN-13
function getFirstDigit(pattern){
    //Pattern es la secuencia de paridades de los dígitos decodificados a la izquierda del center guard
    parityPatternObject = {
        "OOOOOO" : 0,
        "OOEOEE" : 1,
        "OOEEOE" : 2,
        "OOEEEO" : 3,
        "OEOOEE" : 4,
        "OEEOOE" : 5,
        "OEEEOO" : 6,
        "OEOEOE" : 7,
        "OEOEEO" : 8,
        "OEEOEO" : 9
    }
    return parityPatternObject[pattern]
    //Retorna el valor del primer dígito de acuerdo a la paridad de los dígitos de la izquierda
}

