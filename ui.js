function saveState() {
    savState["acc"] = document.getElementById("accumulator").innerHTML;
    savState["neg"] = document.getElementById("negativeFlag").innerHTML;
    savState["zer"] = document.getElementById("zeroFlag").innerHTML;
    savState["ovr"] = document.getElementById("overflowFlag").innerHTML;
    savState["stp"] = document.getElementById("InstAddReg").innerHTML;
}

//Highlights current address from counter
function highlightCurrentAddress() {
    for (let i = 0; i < 16; i++) {
        if (i == counterNumber) {
            document.getElementById('row'+String(i)).className = 'counterTurn';
        }
        else {
            document.getElementById('row'+String(i)).className = '';
        }
    }
}

//Highlights current address if an error occurs
function highlightError() {
    for (let i = 0; i < 16; i++) {
        if (i == counterNumber) {
            document.getElementById('row'+String(i)).className = 'errorHighlight';
        }
        else {
            document.getElementById('row'+String(i)).className = '';
        }
    }
}

//resets all highlights
function resetHighlights() {
    for (let i = 0; i < 16; i++) {
        document.getElementById('row'+String(i)).className = '';
    }
}

//updates the counter with a binary number
function updateCounter() {
    document.getElementById("InstAddReg").innerHTML = decToBin(counterNumber);
}

//gets the currently selected play speed
function getPlaySpeed() {
    if (document.getElementById("0.25hz").checked) {
        playSpeed = 4000;
    }
    else if (document.getElementById("1hz").checked) {
        playSpeed = 1000;
    }
    else if (document.getElementById("10hz").checked) {
        playSpeed = 100;
    }
}


//Checks if a string only contains 0 or 1, returns bool
function checkIfBin(str) {
    let ans = true;
    for (let i=0; i < str.length; i++) {
        let test = str.charAt(i);
        if (test != '0' && test != '1') {
            ans = false;
        }
    }
    return(ans);
}

//Takes an address and translates its code
function translate(addr) {
    let code = receiveCode(addr);
    if (checkIfBin(code.instr) != true) {
        return('INP ERR')
    }
    else if (code.instr.length != 8) {
        return('LEN ERR');
    }
    else {
        let num = binToDec(code.val);
        let opCode = opTrans[code.op];
        return(opCode + ' ' + String(num));
    }
}

//Goes through each RAM address and updates the translation
function updateTrans() {
    for (let i=0; i<16; i++) {
        let addr = decToBin(i);
        document.getElementById('dec'+i).innerHTML = translate(addr);
    }
}

//dictionary for translation of ops
const opTrans = {
    "0000": "NUL",
    "0001": "CLR",
    "0010": "HLT",
    "0011": "ERR",
    "0100": "LOD",
    "0101": "SAV",
    "0110": "ADD",
    "0111": "SUB",
    "1000": "JMP",
    "1001": "JIN",
    "1010": "JIZ",
    "1011": "JOI",
    "1100": "ERR",
    "1101": "ERR",
    "1110": "ERR",
    "1111": "ERR"
};

//updates the flags to the given arguments
function updateFlags(n,z,o) {
    document.getElementById("negativeFlag").innerHTML = n;
    document.getElementById("zeroFlag").innerHTML = z;
    document.getElementById("overflowFlag").innerHTML = o;
}




//Turns the RAM data into one string and saves to clipboard
// function saveToClip() {
//     let saveData = '';
//     for (let i=0; i < 15; i++) {
//         saveData += document.getElementById('data'+String(counterNumber)).value;
//     }
//     /* Select the text field */
//     saveData.select();
//     saveData.setSelectionRange(0, 99999); /* For mobile devices */

//     /* Copy the text inside the text field */
//     document.execCommand("copy");
    
//     /* Alert the copied text */
//     alert("Copied the text: " + saveData.value);
// }

//Makes a div blink
function Ablink(divID) {
    toBlink = document.getElementById(divID);
    toBlink.className = "blinkBacking";
    setTimeout(function() {
        toBlink.className = "backing";
    }, 500);
}

function blink(divID) {
    toBlink = document.getElementById(divID);
    toBlink.className = "blinkBacking";
    toBlink.className = "backing";
}


function blinkTest() {
    blink("accumulator");
    blink("negativeFlag");
    blink("zeroFlag");
}