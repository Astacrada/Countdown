module.exports = [
  /*
    This defines all the operators, it will also remove
    all counterproductive moves, such as a + b would give
    the same result as b + a. However a - b and b - a would
    give totally different results
  */
  {
      name: "add",
      symbol: "+",
      commutative: true,
      calculate: function(x, y) {
        return x + y;
      },
      canCalculate: function() {
        return true;
      },
      checkOperatorMatch: function(operator) {
        if(this.name == operator || this.symbol == operator) {
          return true;
        }
        return false;
      }
  },
  {
    name: "multiply",
    symbol: "\u00d7",
    commutative: true,
    calculate: function(x, y) {
       return x * y;
     },
    canCalculate: function(x, y) {
       return x != 1 && y != 1;
     },
     checkOperatorMatch: function(operator) {
       if(this.name == operator || this.symbol == operator) {
         return true;
       }
       return false;
     }
   },
  {
    name: "subtract",
    symbol: "-",
    commutative: false,
    calculate: function(x, y) {
       return x - y;
     },
    canCalculate: function(x, y) {
       return x > y;
     },
     checkOperatorMatch: function(operator) {
       if(this.name == operator || this.symbol == operator) {
         return true;
       }
       return false;
     }
   },
  {
    name: "divide",
    symbol: "\u00f7",
    commutative: false,
    calculate: function(x, y) {
       return x / y;
     },
    canCalculate: function(x, y) {
       return y != 1 && x % y == 0;
     },
     checkOperatorMatch: function(operator) {
       if(this.name == operator || this.symbol == operator) {
         return true;
       }
       return false;
     }
   }
];
