module.exports = (function() {

    let value;
    let combination_count;

    function NumberValue(num) {
        this.value = num;
        this.combination_count = 0;
    }

    NumberValue.prototype.toString = function() {
        return this.value.toString();
    }

    NumberValue.prototype.equals = function(val) {
        return val instanceof NumberValue && val.value == this.value;
    }

    return NumberValue;

})();
