$(document).ready(function(){
	var intervalID;
    var numOfQ;
    var status;  //0 means timeout; 1 means correct; 2 means wrong
    var correctRecord=0;
    var wrongRecord=0;
    var unanswered=0;

    var timeCnt;

    var qaArray=["How long does it take for light from the Sun to reach Earth?", 
    		"8min 20sec","9min 0Sec", "9min 30sec", "9min 40sec",
    		"How many time zones are there in the world?",
    		"12", "18", "24", "36",
    		"An octopus can fit through any hole larger than its what?",
    		"Arms", "Eyes", "Beak", "Heart",
    		"By display area, what is the largest art museum in the US?",
    		"Metropolitan Museum of Art", "Art Institute of Chicago",
    		"The National WWII Museum","National Gallery of Art",
    		"What nationality was the chemist Alfred Nobel?",
    		"Switzerland", "Swedish", "Germany", "England",
    		"Liberty Island is located in the harbor of what US city?",
    		"New York", "Miami", "Philadelphia", "Boston",
    		"The fruit 'laraha' is a relative to what better-known fruit?",
    		"Apple",  "Peach",  "Orange", "Grape",
    		"In what month is the longest day in the Northern Hemisphere?",
    		"June", "Junly", "August", "September",
    		"What blood type do you need to be a universal donor?",
    		"Type A", "Type B", "Type AB",  "Type O", 
    		"In what country would you find the Yellow River?",
    		"China", "India", "United State", "Brazil"];

    var rightA=[1,3,3,1,2,1,3,1,4,1];

    var rightMsg="Yes!";
    var wrongMsg="Nope!";
    var tOutMsg="Time is out!";

    var Trivia = {
        showQ: function (numberOfQuestions){
            $(".resultDiv").css("display","none");
            $(".qaDiv").css("display","inline");
            $(".question").html(qaArray[numberOfQuestions*5]);
            $(".answerOneText").html(qaArray[numberOfQuestions*5+1]);
            $(".answerTwoText").html(qaArray[numberOfQuestions*5+2]);
            $(".answerThreeText").html(qaArray[numberOfQuestions*5+3]);
            $(".answerFourText").html(qaArray[numberOfQuestions*5+4]);
            this.timer(numberOfQuestions);
        },

        resultPage: function (numberOfQuestions) {
            clearInterval(intervalID);
            $(".qaDiv").css("display","none");
            $(".resultDiv").css("display","inline");
        
            if (status === 0) {
                $(".resultText").html (tOutMsg);
                unanswered++;
            }
            if (status === 1) {
                $(".resultText").html (rightMsg);
                correctRecord++;
            }
            if (status === 2) {
                $(".resultText").html (wrongMsg);
                wrongRecord++;
            }
            $(".explainText").html("The right answer is: "+qaArray[numberOfQuestions*5+rightA[numberOfQuestions]]);
            console.log(numOfQ);
            if (numOfQ===9) {
                this.finishPage();
            }
            else {
                numOfQ++;
                setTimeout(function(){Trivia.showQ(numOfQ);}, 2000);
            }
            
        },

        finishPage: function (){
            $(".resultDiv").css("display","none");
            $(".completeDiv").css("display", "block");
            $(".correctAnswerDiv").html("Correct Answers: "+ correctRecord);
            $(".wrongAnswerDiv").html("Incorrect Answers: " + wrongRecord);
            $(".unansweredDiv").html("Unanswered: "+ unanswered);
            correctRecord=0;
            wrongRecord=0;
            unanswered=0;
        },

        timer: function(numberOfQuestions) {
            clearInterval(intervalID);
            timeCnt=15;
            intervalID = setInterval(function(){
                timeCnt--;
                $("#timeUpdate").html(timeCnt + " Sec");
                if (timeCnt===0) {
                    status=0;
                    Trivia.resultPage(numberOfQuestions);
                }
            },1000);
        },

        clickOnOption: function (optionNum) {
            if (rightA[numOfQ] === optionNum) {
                status = 1;
                Trivia.resultPage(numOfQ);
            }
            else {
                status = 2;
                Trivia.resultPage(numOfQ);
            }
        },

    }


    $("#startButton").on("click", function (){
        $(".startButtonDiv").css("display","none");
        numOfQ=0;
        Trivia.showQ(numOfQ);
    });


    $(".answerOneText").on("click",function(){
        Trivia.clickOnOption(1);
    });

    $(".answerTwoText").on("click",function(){
        Trivia.clickOnOption(2);
    });

    $(".answerThreeText").on("click",function(){
        Trivia.clickOnOption(3);
    });

    $(".answerFourText").on("click",function(){
        Trivia.clickOnOption(4);
    });


    $("#reStartButton").on("click", function (){
        $(".completeDiv").css("display","none");
        numOfQ=0;
        Trivia.showQ(numOfQ);
    });



});