var timeLeft = 60;

var question1 = {
    title: "What is my favorite color",
    options: ["silver","blue","black","white"],
    correctAnswer: 0
}

var question2 = {
    title: "Who is a character in Spongebob",
    options: ["Tom","Steve","Rick","Patrick"],
    correctAnswer: 3
}

var question3 = {
    title: "What comes after 2?",
    options: ["1","2","3","4"],
    correctAnswer: 2
}

var question4 = {
    title: "What is my favorite article of clothing",
    options: ["hat","pants","hoodie","shirt"],
    correctAnswer: 2
}

var question5 = {
    title: "What music do I like to listen to?",
    options: ["Indie","Country","Pop","Funk"],
    correctAnswer: 0
}

questionBank = [question1,question2,question3,question4,question5]

var sections = ["start","coding-prompt","results-screen"]


function startButton() {
    flipScreen(1)
    timer();
    nextQuestion(0);  
}

function flipScreen(section) {
    console.log(sections)
    for (let i = 0; i < sections.length; i++) {
        console.log(section)
        if (section === i) {
            document.getElementById(sections[i]).style.display = "block";
        } else {
            document.getElementById(sections[i]).style.display = "none";
        }
    }
}

function nextQuestion(i) {
    if (i >= questionBank.length) {
        flipScreen(2);
        let score = timeLeft
        timeLeft = 0
        document.getElementById("score").textContent = score
    }    
    //TODO: Display the question and answers
    var question = questionBank[i].title
    var answers = questionBank[i].options
        
    var displayPrompt = document.getElementById("coding-question");
    displayPrompt.textContent = question
        
    //TODO: How do you split up an array to individual strings to separate to buttons?
    var buttons = [
            document.getElementById("button1"),
            document.getElementById("button2"),
            document.getElementById("button3"),
            document.getElementById("button4")
        ]

        for (let j = 0; j < buttons.length; j++) {
            let newButton = buttons[j].cloneNode(true)
            buttons[j].replaceWith(newButton)
            buttons[j] = newButton
            buttons[j].textContent = answers[j];
            if (questionBank[i].correctAnswer === j) {
                buttons[j].addEventListener("click", function() {
                    rightAnswer(i+1)
                  })
            } else {
                buttons[j].addEventListener("click", function() {
                    wrongAnswer(i+1)
                  })
            }
        }
      
    }


function rightAnswer(i) {
    nextQuestion(i)
}

function wrongAnswer(i) {
    timeLeft -= 10
    nextQuestion(i)
}

function timer() {   
    var timerCountdown = setInterval(function(){
        if (timeLeft <=0) {
            clearInterval(timerCountdown);
            document.getElementById("timer").innerHTML = "Finished";
        } else {
            document.getElementById("timer").innerHTML = timeLeft + " seconds remaining";
        }
        timeLeft -= 1;
    }, 1000);
}
