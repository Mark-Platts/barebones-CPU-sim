//set 0 n and o to false before op, let op set them back again if needs be.
let step = 0;
let counterNumber = 0;
let halt = false;
let currentInstruction = '';
let currentOperation = '';
let currentValue = '0001';
let play = false;
let playSpeed = 4000;


//Gets the code at a given address and returns it as an object with keys: instr, op and val
function receiveCode(addr) {
    let hold = {};
    let divName = 'data'+String(binToDec(addr));
    let instruction = document.getElementById(divName).value;
    hold['instr'] = instruction;
    hold['op'] = instruction.slice(0,4);
    hold['val'] = instruction.slice(4);
    return(hold);
}

//fetch: justs makes it clear that the counterNumber address is being looked at
function fetch() {
    document.getElementById("negativeFlag").innerHTML = 0;
    document.getElementById("zeroFlag").innerHTML = 0;
    document.getElementById("overflowFlag").innerHTML = 0;
    document.getElementById("cyclePart").innerHTML = 'F';
    highlightCurrentAddress();
    step = 1;
}

//decode: updates the data ready for the operation to be executed
function decode() {
    let divName = 'data'+String(counterNumber);
    document.getElementById("cyclePart").innerHTML = 'D';
    currentInstruction = document.getElementById(divName).value;
    currentOperation = currentInstruction.slice(0,4);
    document.getElementById("instructionDecode").innerHTML = currentOperation;
    currentValue = currentInstruction.slice(4);
    step = 2;
    console.log('Current Op: '+currentOperation);
    console.log('Current Val: '+currentValue);
}

//Execute: executes the current operation and turns the counter (each subOp is responsible for the counter turn, in case of jumps)
function execute() {
    document.getElementById("cyclePart").innerHTML = 'E';
    switch(currentOperation) {
        case "0001":
            loadOP();
            console.log('Doing: Load');
            break;
        case "0002":
            storeOp()
            console.log('Doing: Store');
            break;
        case "0003":
            addOp()
            console.log('Doing: Add');
            break;
        default:
            counterNumber++;
            break;
    }
    step = 0;
}

//resets the program
function reset() {
    if (play) {
        playPause();
    }
    step = 0;
    counterNumber = 0;
    halt = false;
    currentInstruction = '';
    currentOperation = '';
    currentValue = '';
    document.getElementById("accumulator").innerHTML = '0000';
    document.getElementById("instructionDecode").innerHTML = '0000';
    document.getElementById("negativeFlag").innerHTML = 0;
    document.getElementById("zeroFlag").innerHTML = 0;
    document.getElementById("overflowFlag").innerHTML = 0;
    document.getElementById("InstAddReg").innerHTML = '0000';
    document.getElementById("cyclePart").innerHTML = 'S';
    resetHighlights();
}

//Completes the current step
function doStep() {
    if (halt) {
        return
    }
    if (step == 0) {
        fetch();
    }
    else if (step == 1) {
        decode();
    }
    else if (step == 2) {
        execute();
    }
    updateCounter();
}

//In case of halt, checks if play is true
function haltCheck() {
    if (play) {
        clearInterval(playTimer);
    }
}

//starts or stops the program at the chosen speed
function playPause() {
    if (play) {
        clearInterval(playTimer);
        play = false;
    }
    else {
        getPlaySpeed();
        playTimer = setInterval(doStep, playSpeed);
        play = true;
    }
}


//opCode: 0001, loads value from address into acc
function loadOP() {
    document.getElementById("accumulator").innerHTML = currentValue;
    counterNumber++;
}

//opCode: 0002, stores acc value at the address
function storeOp() {
    let addressDecNumber = binToDec(currentValue);
    let divName = 'data'+String(addressDecNumber);
    document.getElementById(divName).value = '0000'+document.getElementById("accumulator").innerHTML;
    counterNumber++;
}

//opCode: 0003, Adds the value at the address to the acc
function addOp() {
    let acc = binToDec(document.getElementById("accumulator").innerHTML);
    let add = binToDec(currentValue);
    let val = document.getElementById('data'+String(add)).value;
    let num = binToDec(val.slice(4));
    let fin = acc + num;
    if (fin > 15) {
        fin -= 15;
        document.getElementById("overflowFlag").innerHTML = 1;
    }
    document.getElementById("accumulator").innerHTML = decToBin(fin);
    counterNumber++;
}