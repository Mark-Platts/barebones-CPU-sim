
binDecOb = {
    "0000":0,
    "0001":1,
    "0010":2,
    "0011":3,
    "0100":4,
    "0101":5,
    "0110":6,
    "0111":7,
    "1000":8,
    "1001":9,
    "1010":10,
    "1011":11,
    "1100":12,
    "1101":13,
    "1110":14,
    "1111":15
};

//Index gives the binary equivalent
binDecArr = ["0000","0001","0010","0011","0100","0101","0110","0111","1000","1001","1010","1011","1100","1101","1110","1111"];


//Takes binary string and returns equivalent integer between 0 and 15
function binToDec(bin){
    return(binDecArr.indexOf(bin));
}

//Takes number between 0 and 15 returns equivalent binary string
function decToBin(dec){
    return(binDecArr[dec]);
}

//current state
state = {
    "acc": "0000",
    "neg": 0,
    "zer": 0,
    "ovr": 0,
    "stp": "0000",
    "RAM": ["0000","0000","0000","0000","0000","0000","0000","0000","0000","0000","0000","0000","0000","0000","0000","0000"]
}

//saved state
savState = {
    "acc": "0000",
    "neg": 0,
    "zer": 0,
    "ovr": 0,
    "stp": "0000",
    "RAM": ["0000","0000","0000","0000","0000","0000","0000","0000","0000","0000","0000","0000","0000","0000","0000","0000"]
}