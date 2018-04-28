//set an array of colors for the squares
var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var header = document.querySelector(".mainContent h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
const TROPPINK = "#F5AB99";
const SUNSET = "#FEB47B";
const HEATWAVE = "#FF7E5F";
const PARADISE = "#765285";
const NIGHTFALL = "#351C4D";
init();

function init() {
    setUpModeButtons();
    setUpSquares();
    reset();
}

//set up event listeners for the "mode class" buttons (Easy & Hard)
function setUpModeButtons() {
    for (var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3 : numSquares = 6;
            reset();
        });
    }
}

//loop thru all squares and assign a color and a click event listener
function setUpSquares() {
    for (var i = 0; i < squares.length; i++){
        //connect each square to a click event
        squares[i].addEventListener("click", function(){
            var clickedColor = this.style.backgroundColor;
            //user guesses correctly
            if (clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                header.style.backgroundColor = pickedColor;
                changeColors(clickedColor);
            }
            //user guesses incorrectly
            else{
                this.style.backgroundColor = HEATWAVE;
                messageDisplay.textContent = "Keep Trying";
            }
        });
    }
}
//reset the screen to a fresh set of squares
function reset(){
    //generate all new colors
    colors = generateRandomColors(numSquares);
    //pic new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked color number
    colorDisplay.textContent = pickedColor;
    //clear the "Correct!" message
    messageDisplay.textContent = "";
    //change colors of squares on page
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        }else{
            squares[i].style.display = "none";
        }
    }
    resetButton.textContent = "New Colors";
    header.style.backgroundColor = HEATWAVE;
}

//connect the "New Colors" button to the click event
resetButton.addEventListener("click", function (evt) {
    reset();
});

//changes the color of all squares to a single color
function changeColors(color) {
    for (var i = 0; i < colors.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

//returns one random color from the array of pre-generated colors
function pickColor(){
    var random =  Math.floor(Math.random() * colors.length);
    return colors[random];
}

//returns an array of 'n' rgb colors
function generateRandomColors(num) {
    //make an array
    var arr = [];
    //add num random colors
    for (var i = 0; i < num; i++){
        //get random color and push into array
        arr.push(randomColor());
    }
    //return array
    return arr;
}

//returns a valid 'rgb(r, g, b)' color value
function randomColor() {
    //red value 0-255
    var r = Math.floor(Math.random() * 256);
    //green value 0-255
    var g = Math.floor(Math.random() * 256);
    //blue value 0-255
    var b = Math.floor(Math.random() * 256);
    // "rgb(r, g, b)"
    return "rgb(" + r + ", " + g + ", " + b + ")";
}