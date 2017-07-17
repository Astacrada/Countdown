module.exports = (function() {

    let numbers;
    let target;
    let time_taken;
    let exact_solutions;
    let nearest_solutions;

    function Solver() {}

    function Solver(numbers, target) {
        this.numbers = numbers;
        this.target = target;

        this.solve();
    }

    Solver.prototype.solve = function() {
        let start = new Date();

        let numbersSolver = require('./solver.js');
        let solutions = new numbersSolver(this.numbers, this.target, 10);

        this.exact_solutions = [];
        this.nearest_solutions = [];

        for (let i = 0, solution, previous, current_solutions = this.exact_solutions; solution = solutions[i++]; ) {
            if (previous && solution.value != previous.value) { // check if the solution doesn't exist
                if (Math.abs(solution.value - this.target) == Math.abs(previous.value - this.target)) { // check if the new solution is closer to the target than the previous
                    current_solutions = nearest_solutions;
                } else {
                    break;
                }
            }
            current_solutions.push(solution); // add the solution
            previous = solution;
        }

        let end = new Date();
        this.time_taken = end - start;
    }

    Solver.prototype.setNumbers = function(numbers) {
        this.numbers = numbers;
    }

    Solver.prototype.getNumbers = function() {
        return this.numbers;
    }

    Solver.prototype.setTarget = function(target) {
        this.target = target;
    }

    Solver.prototype.getTarget = function() {
        return this.target;
    }

    Solver.prototype.getSolutions = function() {
        return this.exact_solutions;
    }

    Solver.prototype.getNearestSolutionDistance = function() {
        console.log(this.target + ' ' + this.exact_solutions[0].value + ' ' + parseInt( Math.abs(this.exact_solutions[0].value - this.target) ));
        return parseInt( Math.abs(this.exact_solutions[0].value - this.target) );
    }

    Solver.prototype.exactMatch = function() {
        return (this.exact_solutions.length > -1 && this.exact_solutions[0].value == this.target);
    }

    Solver.prototype.timeTakenToCalculate = function() {
        return this.time_taken;
    }

    return Solver;

})();


// print to the UI
/*
document.addEventListener("DOMContentLoaded", function(event) {
    let solver;
    do {
        let random = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        solver = new numbers_solver([3, 4, 7, 25, 50, 100], random );
    } while(solver.exactMatch() == false && solver.getNearestSolutionDistance() < 10);

    let output = "";
    if(solver.exactMatch()) {
        output += "Exact solutions for target " + solver.getTarget() + ": <br />";
        output += solver.getSolutions().join("<br />");
    } else {
        output += "Solutions for " + solver.getSolutions()[0].value + " (" + solver.getNearestSolutionDistance() + " away from " + solver.getTarget() + "): <br />";
        output += solver.getSolutions().join("<br>");
    }

    document.getElementById("output").innerHTML = output;

});
*/
