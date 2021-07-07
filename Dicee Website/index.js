function checkRefresh()
{
    if (!sessionStorage.getItem("rollDice"))
    {
        sessionStorage.setItem("rollDice", "extra")

    } else
        rollDice()
}

function rollDice()
{
    let randomNumber1 = Math.floor(Math.random() * 6);
    let image1 = "images/dice" + (randomNumber1+1) + ".png";
    document.querySelector(".img1").setAttribute("src", image1);


    let randomNumber2 = Math.floor(Math.random() * 6);
    let image2 = "images/dice" + (randomNumber2+1) + ".png";
    document.querySelector(".img2").setAttribute("src", image2);


    if(randomNumber1 > randomNumber2)
        document.querySelector(".container h1").innerHTML = "🚩Player1 Wins!";
    else if(randomNumber1 < randomNumber2)
        document.querySelector(".container h1").innerHTML = "Player2 Wins🚩!";
    else
        document.querySelector(".container h1").innerHTML = "Draw!";
}

document.querySelector("body").onload = checkRefresh();