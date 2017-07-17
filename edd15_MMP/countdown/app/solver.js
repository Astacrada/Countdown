module.exports = (function() {

  /*
    Checks to see if indexOfIndex is equal to the value of the indices.
    Then sets done to true if index + 1 is equal to the length of indices.
  */
  function swapArray(arr, indices) {
    let copy = [];
    for (let i = 0, indexOfIndex = 0, done = false; i < arr.length; ++i) {
      if (!done && i == indices[indexOfIndex]) {
        done = (++indexOfIndex == indices.length);
      } else {
        copy.push(arr[i]);
      }
    }
    return copy;
  }
  //Imports the operators
  let operators = require("./operators.js");

  /*
    Returns the value1 and value2 if Combination's operator, value1 and value2 are null.
  */
  function combineIfValid(operator, value1, value2) {
    let Combination = require('./combination.js');
    return operator.canCalculate(value1.value, value2.value) ? new Combination(operator, value1, value2) : null;
  }

  function getCombinations(values) {
    let combinations = [];
    let i1, i2, len, i1Max, value1, value2, remainingValues, j, combination, operator;

    /*
      First for loop:
      Sets the first index to 0. sets len to the lenght of values. Sets the maximum for
      the first index to the array length -1 as the index will start at 0. When the first
      index is smaller than the maximum possilbe value of the index, perform the operations
      and then increment it by one to loop through all indices.

      value1 is set to equal the index value of index1. E.G if 5 is the first value in the string,
      then value1 is set to 5.
    */
    for (i1 = 0, len = values.length, i1Max = len - 1; i1 < i1Max; ++i1) {
      value1 = values[i1];
      /*
        Second for loop:
        The second index is equal to the first index + 1, when the second index is less than
        the length of values, loop through the for loop and increment the second index by one
        afterwards, to get the second index to loop through all the indices.

        value2 is set to equal the value of index2. remainingValues is then set to equal
        swapArray with the values of index 1 and index 2.
      */
      for (i2 = i1 + 1; i2 < len; ++i2) {
        value2 = values[i2];
        remainingValues = swapArray(values, [i1, i2]);
        /*
          Third for loop:
          J is set to 0, when operator is equal to operators, J is incremented.
          combination is equal to operator, value1 and value2. If combination is true,
          then combination will then be added to the combinations array.
        */
        for (j = 0; operator = operators[j++]; ) {
          combination = combineIfValid(operator, value1,  value2);
          if (combination) {
            combinations.push(combination);
            combinations.push.apply(combinations, getCombinations( [combination].concat(remainingValues) ));
          }

          if (!operator.commutative && (combination = combineIfValid(operator, value2, value1))) {
            combinations.push(combination);
            combinations.push.apply(combinations, getCombinations( [combination].concat(remainingValues) ));
          }
        }
      }
    }
    return combinations;
  }

  /*
    constructor
  */
  function solve(numbers, target, within) {
    let numberValues = [];
    let NumberValue = require('./number_value.js');
    for (let i = 0, len = numbers.length; i < len; ++i) {
      numberValues[i] = new NumberValue(numbers[i]);
    }

    /*

    */
    let combinations = numberValues.concat( getCombinations(numberValues) );
    let solutions = [], combination;
    for (i = 0; combination = combinations[i++]; ) {
      if (combination.value == target) {
        solutions.push(combination);
      }
    }

    /*
      Checks to see if closest possible number found is within 10 of
      the target number. Countdown rules state the to be able to receive
      points for an answer it needs to be within 10 of the target number,
      so if there is no possible number within 10 of the target number,
      a new target number will need to be generated.
    */
    if (solutions.length == 0) {
      for (i = 0; combination = combinations[i++]; ) {
        if (Math.abs(combination.value - target) <= within) {
          solutions.push(combination);
        }
      }
    }

    /*
      Sorts the combinations to place the best combination first
    */
    solutions.sort(function(c1, c2) {
      let delta1 = Math.abs(c1.value - target);
      let delta2 = Math.abs(c2.value - target);

      if (delta1 != delta2) {
        return delta1 - delta2;
      } else if (c1.value == c2.value) {
        return c1.combinationCount - c2.combinationCount;
      } else {
        return c1.value - c2.value;
      }
    });

    console.log(solutions);

    // Remove duplicates
    let finalSolutions = [];

    let alreadyExists = function(combination) {
      for (let i = 0, finalSolution; finalSolution = finalSolutions[i++]; ) {
        if (combination.equals(finalSolution)) {
          return true;
        }
      }
      return false;
    };

    for (i = 0, len = solutions.length; i < len; ++i) {
      combination = solutions[i];
      if (!alreadyExists(combination)) {
        finalSolutions.push(combination);
      }
    }

    return finalSolutions;
  }

  return solve;

})();
