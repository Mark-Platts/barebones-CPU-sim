function saveState() {
    savState["acc"] = document.getElementById("accumulator").innerHTML;
    savState["neg"] = document.getElementById("negativeFlag").innerHTML;
    savState["zer"] = document.getElementById("zeroFlag").innerHTML;
    savState["ovr"] = document.getElementById("overflowFlag").innerHTML;
    savState["stp"] = document.getElementById("InstAddReg").innerHTML;
}

//Highlights current address from counter
function highlightCurrentAddress() {
    for (let i = 0; i < 15; i++) {
        if (i == counterNumber) {
            document.getElementById('row'+String(i)).className = 'counterTurn';
        }
        else {
            document.getElementById('row'+String(i)).className = '';
        }
    }
}



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