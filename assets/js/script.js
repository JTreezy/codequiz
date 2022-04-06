var timeLeft = 60
var previousClock = 60
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
var sections = ["start","coding-prompt","results-screen","highscore-list"]
var score = 0

function startButton() {
    flipScreen(1)
    timeLeft = 60;
    timer();
    nextQuestion(0);
    runClock();  
}

function flipScreen(section) {
    for (let i = 0; i < sections.length; i++) {
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
        score = timeLeft
        timeLeft = 0
        document.getElementById("score").textContent = score
        console.log("score ",score)
        document.getElementById("submit").addEventListener("click", submit)
        return
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



function submit() {
    var initials = document.getElementById("initials").value;
     // Parse any JSON previously stored in scores
     var existingScores = JSON.parse(localStorage.getItem("scores"));
     if(existingScores == null) existingScores = [];
     var entry = {
         "initials": initials,
         "score": score
     };
     console.log("score ",score)
     console.log("entry ",entry)
     // Save scores back to local storage
     existingScores.push(entry);
     localStorage.setItem("scores", JSON.stringify(existingScores));
     document.getElementById("listlist").innerHTML = localStorage.getItem('scores')
     flipScreen(3)
}
function clearHighscore() {
    localStorage.clear();
    document.getElementById("listlist").innerHTML = ""
}


function displayMessage(message){
    document.getElementById("check").textContent = message
    setTimeout(function() {
        document.getElementById("check").textContent = ""
    },1500)
}


function rightAnswer(i) {
    displayMessage("Correct!!")
    nextQuestion(i)
}

function wrongAnswer(i) {
    timeLeft -= 10
    displayMessage("Wrong!!")
    nextQuestion(i)
}

function timer() {
    setInterval(function() {    
        if (timeLeft > 0) {
            timeLeft -= 1
        }
    }, 1000)
}

function runClock() {
    setInterval(function() {
        if (previousClock !== timeLeft) {
            document.getElementById("timer").innerHTML = timeLeft
            previousClock = timeLeft
        }
    }, 10)
}
