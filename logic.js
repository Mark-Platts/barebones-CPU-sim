//set 0 n and o to false before op, let op set them back again if needs be.
let step = 0;
let counterNumber = 0;
let halt = false;
let currentInstruction = '';
let currentOperation = '';
let currentValue = '0001';


//fetch: justs makes it clear that the counterNumber address is being looked at
function fetch() {
    highlightCurrentAddress();
}

//decode: updates the data ready for the operation to be executed
function decode() {
    let divName = 'data'+String(counterNumber);
    currentInstruction = document.getElementById(divName).value;
    currentOperation = currentInstruction.slice(0,4);
    document.getElementById("instructionDecode").innerHTML = currentOperation;
    currentValue = currentInstruction.slice(4);
}


//opCode: 0001, loads value from address into acc
function loadOP() {
    document.getElementById("accumulator").innerHTML = currentValue;
}

//opCode: 0002, stores acc value at the address
function storeOp() {
    let addressDecNumber = binToDec(currentValue);
    let divName = 'data'+String(addressDecNumber);
    document.getElementById(divName).value = '0000'+document.getElementById("accumulator").innerHTML;
}

//opCode: 0003, Adds the value at the address to the acc
function addOp() {
    let acc = binToDec(document.getElementById("accumulator").innerHTML);
    let add = binToDec(currentValue);
    let fin = acc + add;
    if (fin > 15) {
        fin -= 15;
        document.getElementById("overflowFlag").innerHTML = 1;
    }
    document.getElementById("accumulator").innerHTML = decToBin(fin);
}