// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron');
const shell = require('electron').shell;
const path = require('path');

let mainWindow = electron.remote.getCurrentWindow();

$('#titlebar #page-title').html(document.title);

checkFullscreen = function() {
  if(mainWindow.isFullScreen()) {
    $('#titlebar').css('padding-left', '8px');
  }
  if(!mainWindow.isFullScreen()) {
    $('#titlebar').css('padding-left', '80px');
  }
};

$(window).resize(function() {
  checkFullscreen();
});

$(window).ready(function() {
  checkFullscreen();
});

const countdown = require('./countdown.js');

var pickNumbers = function() {
    // add logo to the UI
    let big = '';
    let big_number = 'COUNTDOWN';
    for(let i = 0; i < big_number.length; i++) {
        big += '<span class="big-number-digit">' + big_number.charAt(i) + '</span>';
    }
    $('.big-number').html(big);

    $('.equation').html('<p>Pick the amount of big numbers:</p>');

    let big_numbers = '';
    for(let i = 0; i < 5; i++) big_numbers += '<button class="option amount-of-big-numbers">' + i + '</button>';
    $('.options').html(big_numbers);

    $(document).on('click', '.amount-of-big-numbers', function() {
        countdown.setAmoutOfBigNumbers(parseInt($(this).html()));
        calculate();
    });
}

var calculate = function() {
    // add big number to the UI
    let big = '<p>Target Number</p>';
    console.log(countdown.getBigNumber() + " calculate");
    let big_number = String(countdown.getBigNumber());
    for(let i = 0; i < big_number.length; i++) {
        big += '<span class="big-number-digit">' + big_number.charAt(i) + '</span>';
    }
    $('.big-number').html(big);

    $('.equation').html('<p>Equation</p><div class="input-container"><div class="equation-input"></div><i class="fa fa-minus-circle delete-item" aria-hidden="true"></i></div>'); // show the equation UI element

    // add the buttons the the UI in the first state
    $('.options').html(countdown.getButtons());

    // listen for clicks on the option buttons
    $(document).on('click', '.option', function() {
        if(countdown.numbersLeft() == 0) return; // if there are no numbers left don't continue

        let buttonValue = $(this).html(); // get the value of the button clicked

        // move the value to the use array
        countdown.addToUsed(parseInt(buttonValue));
        buttonValue = '<span>' + buttonValue + '</span>';
        countdown.equation.push(buttonValue);

        $(".equation-input").html($(".equation-input").html() + buttonValue); // add the value to the equation UI element

        countdown.swapButtonState(); // change the state of the buttons e.g. numbers or operators
        $('.options').html(countdown.getButtons()); // show the new button state in the UI

        $('.options').html($('.options').html() + '<button id="check">Check Anwser</button>');
    });

    $('.delete-item').click(function() {
        if(countdown.equation.length == 0) return; // if there is nothing to delete then don't continue

        countdown.swapButtonState(); // change the state of the buttons e.g. numbers or operators

        countdown.equation.splice(countdown.equation.length - 1, 1); // remove the value from the equation array

        let option = $('.equation .equation-input span').last(); // get the last emement
        countdown.addToUnused(parseInt(option.html())); // move the value to the unused array

        $('.options').html(countdown.getButtons()); // show the new button state in the UI
        option.remove(); // remove the value from the UI
    });

    $(document).on('click', '#check', function() {
      let total = 0;
      let i = 0;

      let value1;
      let value2;
      let operator;

      var numberValue = require('./number_value.js');
      var operators = require('./operators.js');

      $('.equation-input span').each(function() {
        console.log(i);
        if(i == 0) { // value1 only first case
          value1 = new numberValue(parseInt($(this).html()));
          i++;
        } else if(i == 1) { //
          operator = $(this).html();
          i++;
        } else if(i == 2) {
          value2 = new numberValue(parseInt($(this).html()));

          for(j = 0; j < operators.length; j++) {
            if (operators[j].canCalculate(value1.value, value2.value) && operators[j].checkOperatorMatch(operator)) {
              console.log('pass');
              value1 = new numberValue(parseInt(operators[j].calculate(value1.value, value2.value)));
              total = value1;
              break;
            }
          }

          i--;
        }
      });

      let difference = countdown.big_number - total.value;
      console.log("userTotal: " + total.value);
      $('.options').html("");
      $('.equation').html("");
      $('.big-number').html("");

      let score = String(0);

      if(difference == 0){
        score = String(10);
      } else if(difference <= 5 && difference >= 0){
        score = String(7);
      } else if(difference <= 10 && difference >=6){
        score = String(5);
      }

      let big = '';
      for(let i = 0; i < score.length; i++) {
          big += '<span class="big-number-digit">' + score.charAt(i) + '</span>';
      }
      $('.big-number').html('<p>Your Score:</p>' + big);

    });
}

pickNumbers();
