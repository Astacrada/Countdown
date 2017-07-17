function Countdown() {
    this.big_numbers = [25, 50, 75, 100];
    this.big_number;
    this.operators = ['+', '-', '\u00d7', '\u00f7'];
    this.used_numbers = [];
    this.unused_numbers = [];
    this.button_state = true;
    this.amout_of_big_numbers;

    this.equation = [];
}

Countdown.prototype.getButtons = function() {
    let buttons = '';

    let button = this.button_state ? this.unused_numbers : this.operators;
    $.each(button, function() {
        buttons += '<button class="option">' + this + '</button>';
    });

    return buttons;
}

Countdown.prototype.swapButtonState = function() {
    this.button_state = this.button_state ? false : true;
}

Countdown.prototype.setButtonState = function(button_state) {
    this.button_state = button_state;
}

Countdown.prototype.getButtonState = function() {
    return this.button_state;
}

Countdown.prototype.numbersLeft = function() {
    return this.unused_numbers.length;
}

Countdown.prototype.addToUsed = function(number) {
    if(!this.button_state) return;

    this.used_numbers.push(number);
    let index = this.unused_numbers.indexOf(number);

    if(index > -1) this.unused_numbers.splice(index, 1);
}

Countdown.prototype.addToUnused = function(number) {
    if(!this.button_state) return;

    this.unused_numbers.push(number);

    let index = this.used_numbers.indexOf(number);
    if(index > -1) this.used_numbers.splice(index, 1);
}

Countdown.prototype.getBigNumber = function() {
    return this.big_number;
}

Countdown.prototype.setAmoutOfBigNumbers = function(amount) {
    this.amout_of_big_numbers = amount;

    let smallNumbers = [];
	for(let i = 0; i < (6 - amount); i++) {
		smallNumbers.push(1 + parseInt(Math.random() * 10));
	}

	let currentNumbers = [];

	for(let i = 0; i < amount; i++) {
		currentNumbers.push(this.big_numbers[i]);
	}

	for(let i = 0; i < smallNumbers.length; i++) {
		currentNumbers.push(smallNumbers[i]);
	}

    this.unused_numbers = currentNumbers;

    let numbers_solver = require('./sorter.js');

    let solver;
    do {
        let random = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        solver = new numbers_solver(this.unused_numbers, random);
    } while(solver.exactMatch() == false && solver.getNearestSolutionDistance() < 10);
    this.big_number = solver.getTarget();
}

module.exports = new Countdown();
