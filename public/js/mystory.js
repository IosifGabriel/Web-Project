
var ProgressBarValue;
sessionStorage.setItem("accessed", false);


if(sessionStorage.getItem("accessed") == false)
            ChangeProgressState(0);
else
    ChangeProgressState(100);

$(document).keydown(function(event){
    
    sessionStorage.setItem("accessed", true);
    console.log(sessionStorage.getItem("accessed"));

    var x = event.which;
    if(x>= 65 && x<= 67)
    ChangeProgressState(10);
    if(x>= 68 && x<= 70)
    ChangeProgressState(20);
    if(x>= 71 && x<= 73)
    ChangeProgressState(30);
    if(x>= 74 && x<= 76)
    ChangeProgressState(40);
    if(x>= 77 && x<= 79)
    ChangeProgressState(50);
    if(x>= 80 && x<= 82)
    ChangeProgressState(60);
    if(x>= 83 && x<= 84)
    ChangeProgressState(70);
    if(x>= 85 && x<= 86)
    ChangeProgressState(80);
    if(x>= 87 && x<= 88)
    ChangeProgressState(90);
    if(x>= 89 && x<= 90)
    ChangeProgressState(100);
    if((x==13 || x==38 || x == 39) && ProgressBarValue <=90)
    ChangeProgressState(ProgressBarValue+10);
    if((x==37 || x == 40) && ProgressBarValue >0)
    ChangeProgressState(ProgressBarValue-10);


    if(ProgressBarValue == 0)
        Display("0");

    if(ProgressBarValue == 10)
        Display("1");

    if(ProgressBarValue == 20)
        Display("2");

    if(ProgressBarValue == 30)
        Display("3");

    if(ProgressBarValue == 40)
        Display("4")

    if(ProgressBarValue == 50)
        Display("5");
    
    if(ProgressBarValue == 60)
        Display("6")
    
    if(ProgressBarValue == 70)
        Display("7");
    
    if(ProgressBarValue == 80)
        Display("8")
    
    if(ProgressBarValue == 90)
        Display("9");
    
    if(ProgressBarValue == 100)
        Display("10");
});

function ChangeProgressState(Value){
    $(".progress-bar").attr("style","width:" + Value +"%" );
    ProgressBarValue = Value;
}

Display("0");
var LastID = 0;

function Displayfirst(){
    $("#d0").fadeToggle(1000);
}

function DisplayLast(){
    $("#d12").fadeToggle(1000);
}


function Display(ID){
    
    $("#d"+LastID).fadeToggle(500);
    $("#d"+ID).fadeToggle(1000);
    LastID= ID;
}

