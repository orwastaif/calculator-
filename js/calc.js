var buttons = document.getElementsByTagName('button');
var display = document.getElementById('display');
var history_text = document.getElementById('history_text');

var display_font_size_em = 3;
var angle = 'DEG';
let save_zero = false;

for (let currButton of buttons) {
    currButton.addEventListener('click', function() {
        if (this.innerHTML == '=' && display.value.length > 0 && display.value.includes('=') == false) {

            history_text.value = display.value;
            save_zero = false;

            for(let i in display.value) {
                if(display.value[i] == '^') {
                    display.value = display.value.replace('^', '**');
                }
            }

            display.value = eval(display.value);

        } else if (this.innerHTML == 'C') {

            save_zero = false;
            history_text.value = '';
            display.value = '0';

        } else if (this.innerHTML == 'π') {

            let wasPI = false;
            if(display.value.includes(Math.PI) == true || wasPI == true || display.value.length > 0) { 
                if(display.value[0] == '0') {
                    display.value = Math.PI;
                    wasPI = true;
                } else {
                    display.value *= Math.PI; 
                    wasPI = true;
                }
            }
            else { display.value = Math.PI; }

        } else if (this.innerHTML == 'e') {

            let wasE = false;
            if(display.value.includes(Math.E) == true || wasE == true || display.value.length > 0) { 
                if(display.value[0] == '0') {
                    display.value = Math.E;
                    wasPI = true;
                } else {
                    display.value *= Math.E; 
                    wasPI = true;
                }
            }
            else { display.value = Math.E; }

        } else if (this.innerHTML == '%') {

            history_text.value = `${display.value}%`;
            display.value = display.value / 100;

        } else if (this.innerHTML == 'cos') {

            history_text.value = `cos(${display.value})`;

            if(angle == 'DEG') {
                display.value = Math.cos(toRadians(display.value));
                display.value = Math.fround(display.value);
            } else {
                display.value = Math.cos(toDegrees(display.value));
                display.value = Math.fround(display.value);
            }
            
        } else if (this.innerHTML == 'sin') {

            history_text.value = `sin(${display.value})`;

            if (angle == 'DEG') {
                display.value = Math.sin(toRadians(display.value));
                display.value = Math.fround(display.value);
            } else {
                display.value = Math.sin(toDegrees(display.value));
                display.value = Math.fround(display.value);

            }

        } else if (this.innerHTML == 'tan') {

            history_text.value = `tan(${display.value})`;

            if (angle == 'DEG') {
                display.value = Math.tan(toRadians(display.value));
                display.value = Math.fround(display.value);
            } else {
                display.value = Math.tan(toDegrees(display.value));
                display.value = Math.fround(display.value);
            }

        } else if (this.innerHTML == 'RAD') {

            angle = 'RAD';
            document.querySelector('.angle_div').innerHTML = angle;

        } else if (this.innerHTML == 'DEG') {

            angle = 'DEG';
            document.querySelector('.angle_div').innerHTML = angle;

        } else if (this.innerHTML == 'n!') {

            if (display.value == 0) { display.value = '1'; }
            else if (display.value < 0) { display.value = NaN; } 
            else {
                let number = 1;
                for (let i = display.value; i > 0; i--) {
                    number *= i;
                }
                display.value = number;
            }

        } else if (this.innerHTML == '√') {

            history_text.value = `√${display.value}`;

            let temp = "", squared = "", rest = "";
            let temp_changed = false;
            for(let i in display.value) {
                if((display.value[i] == '+' || display.value[i] == '-' || display.value[i] == '*' ||
                    display.value[i] == '/' || display.value[i] == '^') && display.value.includes('(') == false) {
                    temp = display.value.substring(0, display.value.indexOf(display.value[i]));
                    rest = display.value.substring(display.value.indexOf(display.value[i]));
                    temp_changed = true;
                    break;
                }
            }
            if(!temp_changed) { 
                temp = display.value; 
                temp = eval(temp);
                display.value = Math.sqrt(temp);
                display.value = Math.fround(display.value);
            } else {
                squared = Math.sqrt(temp);
                squared = Math.fround(squared);
                display.value = eval(squared + rest);
            }
    
        } else if (this.innerHTML == '+/-') {

            if (display.value.charAt(0) == '-') {
                display.value = display.value.slice(1);
            } else {
                display.value = '-' + display.value;
            }

        } else if (this.innerHTML == '&lt;') {

            display.value = display.value.substring(0, display.value.length - 1);

        } else if (this.innerHTML == 'log') {

            display.value = Math.log10(display.value);
            display.value = Math.fround(display.value);
    
        } else if (this.innerHTML == 'ln') {
    
            display.value = Math.log(display.value);
            display.value = Math.fround(display.value);
    
        } else if (this.innerHTML == '.') {
    
            save_zero = true;
            display.value += this.innerHTML;
    
        } else {

            if(display.value.length > 16) {
                if(display_font_size_em > 2) { display_font_size_em -= 0.25; }
                display.style.fontSize = `${display_font_size_em}em`;
            } else {
                display_font_size_em = 3;
                display.style.fontSize = `${display_font_size_em}em`;
            }

            if(display.value[0] == '0' && save_zero == false) {
                display.value = display.value.slice(1);
                save_zero = false;
            }

            display.value += this.innerHTML;

        }
    });
}

function toDegrees (angle) {
    return angle * (180 / Math.PI);
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
}


function toLenConv() {
    let calc = document.getElementById("main_calc_id");
    calc.className = 'main_calc calculator off';

    let mass_conv = document.getElementById("main_Mass_conv");
    mass_conv.className = 'main_Mass_conv Mass_conv off';

    let len_conv = document.getElementById("main_len_conv");
    len_conv.className = 'main_len_conv len_conv';

}

function toCalc() {
    let len_conv = document.getElementById("main_len_conv");
    len_conv.className = 'main_len_conv len_conv off';

    let mass_conv = document.getElementById("main_Mass_conv");
    mass_conv.className = 'main_Mass_conv Mass_conv off';

    let calc = document.getElementById("main_calc_id");
    calc.className = 'main_calc calculator';
}

function toMassConv() {
    let calc = document.getElementById("main_calc_id");
    calc.className = 'main_calc calculator off';

    let len_conv = document.getElementById("main_len_conv");
    len_conv.className = 'main_len_conv len_conv off';

    let mass_conv = document.getElementById("main_Mass_conv");
    mass_conv.className = 'main_Mass_conv Mass_conv';

}

// Feet to
function feetToFeet(valNum) {
    document.getElementById("outputFeet").innerHTML = valNum;
}

function feetToCMeters(valNum) {
    document.getElementById("outputCMeters").innerHTML = valNum / 3.2808 * 100;
}

function feetToMeters(valNum) {
    document.getElementById("outputMeters").innerHTML = valNum / 3.2808;
}

function feetToMiles(valNum) {
    document.getElementById("outputMiles").innerHTML = valNum * 0.00018939;
}

function feetToInches(valNum) {
    document.getElementById("outputInches").innerHTML = valNum * 12;
}

// Meters to
function metersToFeet(valNum) {
    document.getElementById("outputFeet").innerHTML = valNum * 3.2808;
}

function metersToCMeters(valNum) {
    document.getElementById("outputCMeters").innerHTML = valNum * 100;
}

function metersToMeters(valNum) {
    document.getElementById("outputMeters").innerHTML = valNum;
}

function metersToMiles(valNum) {
    document.getElementById("outputMiles").innerHTML = valNum * 0.00062137;
}

function metersToInches(valNum) {
    document.getElementById("outputInches").innerHTML = valNum *39.370;
}

// Miles to
function milesToFeet(valNum) {
    document.getElementById("outputFeet").innerHTML = valNum * 5280;
}

function milesToCMeters(valNum) {
    document.getElementById("outputCMeters").innerHTML = valNum / 0.00062137 * 100;
}

function milesToMeters(valNum) {
    document.getElementById("outputMeters").innerHTML = valNum / 0.00062137;
}

function milesToMiles(valNum) {
    document.getElementById("outputMiles").innerHTML = valNum;
}

function milesToInches(valNum) {
    document.getElementById("outputInches").innerHTML = valNum * 63360;
}

// Inches to
function inchesToFeet(valNum) {
    document.getElementById("outputFeet").innerHTML = valNum * 0.083333;
}

function inchesToCMeters(valNum) {
    document.getElementById("outputCMeters").innerHTML = valNum / 39.370 * 100;
}

function inchesToMeters(valNum) {
    document.getElementById("outputMeters").innerHTML = valNum / 39.370;
}

function inchesToMiles(valNum) {
    document.getElementById("outputMiles").innerHTML = valNum * 0.000015783;
}

function inchesToInches(valNum) {
    document.getElementById("outputInches").innerHTML = valNum;
}

//miligram to
function MiligramToMiligram(valNum) {
    document.getElementById("outputMiligram").innerHTML = valNum;
}

function MiligramToGram(valNum) {
    document.getElementById("outputGram").innerHTML = valNum / 1000;
}


function MiligramToKilogram(valNum) {
    document.getElementById("outputKilogram").innerHTML = valNum / 1000000;
}

function MiligramToT(valNum) {
    document.getElementById("outputT").innerHTML = valNum / 1000000000;
}

//Gram
function GramToMiligram(valNum) {
    document.getElementById("outputMiligram").innerHTML = valNum * 1000;
}

function GramToGram(valNum) {
    document.getElementById("outputGram").innerHTML = valNum;
}

function GramToKilogram(valNum) {
    document.getElementById("outputKilogram").innerHTML = valNum / 1000;
}

function GramToT(valNum) {
    document.getElementById("outputT").innerHTML = valNum / 1000000;
}

// Kilogram to
function KilogramToMiligram(valNum) {
    document.getElementById("outputMiligram").innerHTML = valNum * 100000;
}

function KilogramToGram(valNum) {
    document.getElementById("outputGram").innerHTML = valNum * 1000;
}

function KilogramToKilogram(valNum) {
    document.getElementById("outputKilogram").innerHTML = valNum;
}

function KilogramToT(valNum) {
    document.getElementById("outputT").innerHTML = valNum / 1000;
}

// T to
function TToMiligram(valNum) {
    document.getElementById("outputMiligram").innerHTML = valNum / 1000000000
}

function TToGram(valNum) {
    document.getElementById("outputGram").innerHTML = valNum / 1000000;
}

function TToKilogram(valNum) {
    document.getElementById("outputMiles").innerHTML = valNum / 1000000;
}

function TToT(valNum) {
    document.getElementById("outputInches").innerHTML = valNum;
}