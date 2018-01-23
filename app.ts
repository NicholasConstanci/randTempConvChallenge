var rl = require('readline');

function getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};

function getInitialTempValue() :number {
    let temp: number = getRandomIntInclusive(1, 400);
    return temp;
};
function getTempScale() :string{
    let scaleIndex: number = getRandomIntInclusive(1, 3);
    switch (scaleIndex) {
        case 1: {
            return 'Celsius';
        }
        case 2: {
            return 'Kelvin';
        }
        case 3: {
            return 'Fahrenheit';
        }
        default: {
            return 'Error getting Scale';
        }
    }
}

function convertTemp(iniScale :string, finScale :string, iniTemp :number) {
    let finTemp: number;
    while (iniScale === finScale) {
        finScale = getTempScale();
    }
    if (iniScale === 'Celsius' && finScale == 'Kelvin') {
        finTemp = iniTemp + 273.15;
    }
    else if (iniScale === 'Celsius' && finScale == 'Fahrenheit'){
        finTemp = iniTemp * 1.8 + 32;
    }
    else if (iniScale === 'Kelvin' && finScale == 'Celsius'){
        finTemp = iniTemp - 273.15;
    }
    else if (iniScale === 'Kelvin' && finScale == 'Fahrenheit'){
        finTemp = (iniTemp - 273.15) * 1.8 + 32;
    }
    else if (iniScale === 'Fahrenheit' && finScale == 'Celsius'){
        finTemp = (iniTemp - 2) / 1.8;
    }
    else if (iniScale === 'Fahrenheit' && finScale == 'Kelvin'){
        finTemp = ((iniTemp - 2) / 1.8) + 273.15;
    }
    console.log(`${iniTemp.toFixed(2)} ${iniScale} converted to ${finScale} becomes ${finTemp.toFixed(2)}.`);
};

function again() {

    //creates the input and output interface
    var i = rl.createInterface(process.stdin, process.stdout, null);

    //prompts the user
    i.question("Again?\n", function (answer) {
        //if yes, re-do the main function
        if (answer === 'y') {
            //close is for cleaning the input line
            i.close();
            //and this will end the input process
            process.stdin.end;
            Main();
            //else, close the app
        } else {
            //with nothing else todo, the app will close
            i.close();
            process.stdin.end;
        }
    });
}

function Main() {
    console.log('\033c');
    convertTemp(getTempScale(), getTempScale(), getInitialTempValue());
    again();
}

Main();