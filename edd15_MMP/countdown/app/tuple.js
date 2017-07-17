module.exports = (function() {
    let numberX;
    let numberY;
    let operator;
    let result;

    function Tuple() {}

    function Tuple(numberX, numberY, operator, result) {
        this.numberX = numberX;
    	this.numberY = numberY;
    	this.operator = operator;
    	this.result = result;
    }

    Tuple.prototype.setNumberX = function(numberX) {
        this.numberX = numberX;
    }

    Tuple.prototype.getNumberX = function() {
        return this.numberX;
    }

    Tuple.prototype.setNumberY = function(numberX) {
        this.numberY = numberY;
    }

    Tuple.prototype.getNumberY = function() {
        return this.numberY;
    }

    Tuple.prototype.setOperator = function(operator) {
        this.operator = operator;
    }

    Tuple.prototype.getOperator = function() {
        return this.operator;
    }

    Tuple.prototype.setResult = function(result) {
        this.result = result;
    }

    Tuple.prototype.getResult = function() {
        return this.result;
    }

    return Tuple;
})();
