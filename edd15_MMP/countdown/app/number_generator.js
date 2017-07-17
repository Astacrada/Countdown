module.exports = (function() {
    let originalResult;
    let userNumbers;
    let numberOut;
    let number;
    let operations;

    function NumberGenerator(numbers) {
        this.originalResult = numbers;
        console.log(this.originalResult);
        this.userNumbers = [];
        this.numberOut = null;
        this.number = 1 + parseInt(Math.random() * 10);
        this.operations = [];
    }

    NumberGenerator.prototype.randomOperation = function() {
        let numOperators;
        while(this.numberOut <= 100 || this.numberOut > 999) {
            this.userNumbers = this.originalResult.slice(0);
        	this.operations = [];
            console.log(" ");
        	while(this.userNumbers.length > 1) {
                numOperators = 4;
        		let indexX = parseInt(Math.random() * this.userNumbers.length);
        		let indexY = parseInt(Math.random() * this.userNumbers.length-1);

        		if(indexY >= indexX){
        			indexY++;
        		}

        		let x = this.userNumbers[indexX];
        		let y = this.userNumbers[indexY];

        		if(x - y <= 0){
        			numOperators = 2;
        		} else if((x % y) != 0){
        			numOperators = 3;
        		}

        		let operator = Math.floor(Math.random() * (numOperators - 1 + 1)) + 1;
                let tuple = require('./tuple.js');
        		switch(operator){
        			case 1: // additions case statement
        				this.numberOut = x + y;
        				this.operations.push(new tuple(x, y, '+', this.numberOut));
        				console.log("num["+indexX+"]+num["+indexY+"]="+x+"+"+y+"="+this.numberOut);
        				break;
        			case 2: // multiplications case statement
        				this.numberOut = x * y;
        				this.operations.push(new tuple(x, y, '*', this.numberOut));
        				console.log("num["+indexX+"]*num["+indexY+"]="+x+"*"+y+"="+this.numberOut);
        				break;
        			case 3: // subtractions case statement
        				this.numberOut = x - y;
        				this.operations.push(new tuple(x, y, '-', this.numberOut));
        				console.log("num["+indexX+"]-num["+indexY+"]="+x+"-"+y+"="+this.numberOut);
        				break;
        			case 4: // divisions case statement
        				this.numberOut = x / y;
        				this.operations.push(new tuple(x, y, '/', this.numberOut));
        				console.log("num["+indexX+"]/num["+indexY+"]="+x+"/"+y+"="+this.numberOut);
        				break;
        		}

        		this.userNumbers.push(this.numberOut);
        		if(indexX > indexY){
                    this.userNumbers.splice(indexX, 1);
                    this.userNumbers.splice(indexY, 1);
        		}else{
                    this.userNumbers.splice(indexY, 1);
                    this.userNumbers.splice(indexX, 1);
        		}

        	}
        }

        console.log(this.numberOut + " generator");
        return this.numberOut;
    }


    return NumberGenerator;
})();
