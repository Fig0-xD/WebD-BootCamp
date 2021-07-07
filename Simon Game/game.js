let buttonColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let gameLevel = 0;
let countClick = 0;
let keyPressed = false;

function pickColor() {

    gameLevel++;
    $("#level-title").text("Level " + gameLevel);
    userPattern = [];

    let randomColor = buttonColors[Math.floor(Math.random() * 4)];
    gamePattern.push(randomColor);

    $("#" + randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function animateButton (color) {
    $("#" + color).addClass("pressed");
    setTimeout(function () {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function playSound(color){
    let audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function checkAnswer(level) {

    if(userPattern[countClick - 1] === gamePattern[countClick - 1])
    {
        if(countClick === level)
        {
            countClick = 0;
            setTimeout(pickColor, 1000);
        }
    }
    else
    {
        $("#level-title").text("Game Over!");
        $("#level-subtitle").css({"visibility" : "visible"});
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        startOver();
    }
}

function startOver() {
    keyPressed = false;
    gamePattern = [];
    gameLevel = 0;
    countClick = 0;
}



$(".btn").on("click", function (event) {
    countClick++;

    userPattern.push(event.target.classList[1]);
    playSound(event.target.id);
    animateButton(event.target.id);

    checkAnswer(gameLevel);
});


$("body").keypress(function () {
    if(!keyPressed)
    {
        pickColor();
        keyPressed = true;

        $("#level-subtitle").css({"visibility" : "hidden"});
    }
});

