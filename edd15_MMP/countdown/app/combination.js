module.exports = (function() {

    let operator;
    let value1;
    let value2;
    let value;
    let combination_count;

    /*

    */
    function Combination(operator, value1, value2) {
        this.operator = operator;
        this.value1 = value1;
        this.value2 = value2;
        this.value = operator.calculate(value1.value, value2.value);
        this.combination_count = value1.combination_count + value2.combination_count + 1;
    }

    Combination.prototype.equals = function(combination) {
        if (!(combination instanceof Combination)) {
            return false;
        }
        if (this.operator != combination.operator) {
            return false;
        }
        if (this.value != combination.value) {
            return false;
        }
        if (this.combination_count != combination.combination_count) {
            return false;
        }
        if (this.value1.equals(combination.value1) && this.value2.equals(combination.value2)) {
            return true;
        }
        if (this.operator.commutative) {
            /*
              Cover the case when at least one value is a combination with the same operator as this combination
              and the operator in question is commutative
            */
            return this.arraysAreEqual(this.expandOneLevel(), combination.expandOneLevel());
        }
        return false;
    }

    Combination.prototype.expandOneLevel = function() {
        let values = [];
        if ((this.value1 instanceof Combination) && this.value1.operator == this.operator) {
            values.push(this.value1.value1, this.value1.value2);
        } else {
            values.push(this.value1);
        }
        if ((this.value2 instanceof Combination) && this.value2.operator == this.operator) {
            values.push(this.value2.value1, this.value2.value2);
        } else {
            values.push(this.value2);
        }
        return values;
    }

    Combination.prototype.swapArray = function(arr, indices) {
        let copy = [];
        for (let i = 0, len = arr.length, indexOfIndex = 0, done = false; i < len; ++i) {
            if (!done && i == indices[indexOfIndex]) {
                done = (++indexOfIndex == indices.length);
            } else {
                copy.push(arr[i]);
            }
        }
        return copy;
    }

    //array's are equal
    Combination.prototype.arraysAreEqual = function(array1, array2) {
        if (array1.length != array2.length) {
            return false;
        }
        if (array1.length == 0) {
            return true;
        }
        for (let i = 0, len = array1.length, j, jLen; i < len; ++i) {
            for (j = 0, jLen = array2.length; j < jLen; ++j) {
                if (array1[i].equals(array2[j]) && this.arraysAreEqual(this.swapArray(array1, [i]), this.swapArray(array2, [j]))) {
                    return true;
                }
            }
        }
        return false;
    }

    Combination.prototype.toStringForCombination = function(operator) {
        return (operator.commutative && operator == this.operator) ?
            this.toString() : "(" + this.toString() + ")";
    }

    Combination.prototype.toString = function() {
        return this.value1.toString(this.operator) + " " + this.operator.symbol + " " + this.value2.toString(this.operator);
    }

    return Combination;

})();
