var Source = "#boxcard1";
var imgPath = "../Game/wwwroot/Images/img";
var TimerCount;


function countdownTimer() {
    var timer = 5;
     TimerCount = setInterval(function () {
        if (timer > 0) {
            timer -= 1;
            $("#timer").text("Images will hide in " + timer);
        }
        else {
            $("#timer").text("Arrange images");
            $(".gamepicture").css('display', 'none');
            $("#boxcardimg, #resultmsg").css('display', 'block');
        }
    }, 1000);
}


function RandomFunction(MaxValue, MinValue) {
    return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
}

function ShuffleImages() {
    
    var ImgAll = $("#boxcard").children();
    var ImgThis = $("#boxcard" + " div:first-child");
    var RanNumArray = new Array();

    ImgThis = $("#boxcard" + " div:first-child");

    for (var z = 0; z < 9; z++) {
        var RandomNumber = RandomFunction(0, ImgAll.length - 1);
        $("#boxcard1").append("<div id=card" + RandomNumber + "><img class = gamepicture  src=" + imgPath + "" + (RandomNumber + 1) + ".png />");
        ImgAll.splice(RandomNumber, 1);
        ImgThis = ImgThis.next();
        RanNumArray[z] = RandomNumber;
    }
    var RandomNumber1 = RandomFunction(0, RanNumArray.length - 1);
    $("#boxcardimg").append("<div id=card" + RanNumArray[RandomNumber1] + "><img src=" + imgPath + "" + (RanNumArray[RandomNumber1] + 1) + ".png />");
}

$(document).ready(function () {
    //TimerCount = setInterval(countdownTimer, 1000);
    //$.each(ImgSource, function (i, val) {
    //    $("#boxcard").append("<div id=card" + i + "><img src=" + val + " />");
    //});
    for (var imgArray = 0; imgArray < 20; imgArray++) {
        $("#boxcard").append("<div id=card" + imgArray + "><img src=" + imgPath + "" + (imgArray + 1) + ".png />");
    }
    countdownTimer();
    ShuffleImages();
    //Reset the game
    $(window).load(function () {
        $("#resetGame").click(function (e) {
            $("#boxcard1,#boxcardimg").children("div").remove();
            $("#boxcardimg,#boxbuttons,#resultmsg").css('display', 'none');

            countdownTimer();
            ShuffleImages();
            $(".gamepicture").css('display', 'block');
            e.preventDefault();

        });

        $("#boxcard1").on('click', 'div', function (e) {
            
            $("#resultmsg").text("Wrong selection");
            if (this.id == $("#boxcardimg").children("div").attr("id")) {
                $("#resultmsg").text("Great, Selected right Image");
                clearInterval(TimerCount);
                $("#boxbuttons").css('display', 'block');
                $("#" + this.id).children("img").css('display', 'block');
            }
            e.preventDefault();
        });
    });
});