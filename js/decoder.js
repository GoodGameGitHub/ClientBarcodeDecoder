function decodeLeftBarPattern(pattern){
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
}


function decodeRightBarPattern(pattern){
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
}

function getFirstDigit(pattern){
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
}

