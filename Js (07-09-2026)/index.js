// script.js

const questions = [

    {
        question: "What is JavaScript?",
        options: [
            "A programming language",
            "A database",
            "An operating system",
            "A browser"
        ],
        answer: "A programming language"
    },

    {
        question: "Which keyword allows a variable to be reassigned?",
        options: [
            "const",
            "let",
            "fixed",
            "constant"
        ],
        answer: "let"
    },

    {
        question: "Which keyword is used when a variable should not be reassigned?",
        options: [
            "var",
            "let",
            "const",
            "static"
        ],
        answer: "const"
    },

    {
        question: "Which is a primitive data type?",
        options: [
            "Object",
            "Array",
            "Number",
            "Function"
        ],
        answer: "Number"
    },

    {
        question: "Which is a reference data type?",
        options: [
            "String",
            "Boolean",
            "Number",
            "Object"
        ],
        answer: "Object"
    },

    {
        question: "What is typeof 'Hello'?",
        options: [
            "text",
            "String",
            "string",
            "character"
        ],
        answer: "string"
    },

    {
        question: "What does Number('100') return?",
        options: [
            "'100'",
            "100",
            "true",
            "NaN"
        ],
        answer: "100"
    },

    {
        question: "What is the result of '10' + 5?",
        options: [
            "15",
            "105",
            "5",
            "NaN"
        ],
        answer: "105"
    },

    {
        question: "What is the result of '10' - 5?",
        options: [
            "105",
            "15",
            "5",
            "NaN"
        ],
        answer: "5"
    },

    {
        question: "Which operator checks value AND data type?",
        options: [
            "=",
            "==",
            "===",
            "!="
        ],
        answer: "==="
    },

    {
        question: "Which logical operator means AND?",
        options: [
            "||",
            "&&",
            "!",
            "%"
        ],
        answer: "&&"
    },

    {
        question: "Which operator is used for assignment?",
        options: [
            "=",
            "==",
            "===",
            "=>"
        ],
        answer: "="
    },

    {
        question: "Which operator is used for multiplication?",
        options: [
            "+",
            "-",
            "*",
            "/"
        ],
        answer: "*"
    },

    {
        question: "Which is a template literal?",
        options: [
            "'Hello ${name}'",
            "\"Hello ${name}\"",
            "`Hello ${name}`",
            "(Hello ${name})"
        ],
        answer: "`Hello ${name}`"
    },

    {
        question: "What is 10 > 5 && 20 > 10?",
        options: [
            "true",
            "false",
            "10",
            "20"
        ],
        answer: "true"
    }

];


let currentQuestion = 0;

let score = 0;

let studentName = "";


function startAssessment() {

    studentName =
        document.getElementById("studentName").value.trim();

    const age =
        Number(
            document.getElementById("studentAge").value
        );


    if (studentName === "") {

        alert("Please enter your name.");

        return;
    }


    if (age <= 0) {

        alert("Please enter a valid age.");

        return;
    }


    currentQuestion = 0;

    score = 0;


    document
        .getElementById("startScreen")
        .classList
        .add("hidden");


    document
        .getElementById("quizScreen")
        .classList
        .remove("hidden");


    showQuestion();
}


function showQuestion() {

    const question =
        questions[currentQuestion];


    document
        .getElementById("questionNumber")
        .textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;


    document
        .getElementById("score")
        .textContent =
        `Score: ${score}`;


    document
        .getElementById("question")
        .textContent =
        question.question;


    const options =
        document.getElementById("options");


    options.innerHTML = "";


    question.options.forEach(function(option) {

        const button =
            document.createElement("button");


        button.textContent = option;

        button.className = "option";


        button.onclick = function() {

            checkAnswer(
                button,
                option
            );

        };


        options.appendChild(button);

    });


    document
        .getElementById("nextBtn")
        .classList
        .add("hidden");
}


function checkAnswer(button, selectedAnswer) {

    const correctAnswer =
        questions[currentQuestion].answer;


    const buttons =
        document.querySelectorAll(".option");


    buttons.forEach(function(button) {

        button.disabled = true;

    });


    if (selectedAnswer === correctAnswer) {

        button.classList.add("correct");

        score++;

    } else {

        button.classList.add("wrong");


        buttons.forEach(function(button) {

            if (
                button.textContent ===
                correctAnswer
            ) {

                button.classList.add("correct");

            }

        });

    }


    document
        .getElementById("score")
        .textContent =
        `Score: ${score}`;


    document
        .getElementById("nextBtn")
        .classList
        .remove("hidden");
}


function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion <
        questions.length
    ) {

        showQuestion();

    } else {

        showResult();

    }
}


function showResult() {

    document
        .getElementById("quizScreen")
        .classList
        .add("hidden");


    document
        .getElementById("resultScreen")
        .classList
        .remove("hidden");


    const percentage =
        Math.round(
            (score / questions.length) * 100
        );


    document
        .getElementById("resultMessage")
        .textContent =
        `Good job, ${studentName}!`;


    document
        .getElementById("finalScore")
        .textContent =
        `${score} / ${questions.length}`;


    document
        .getElementById("percentage")
        .textContent =
        `Percentage: ${percentage}%`;


    if (percentage >= 60) {

        document
            .getElementById("status")
            .textContent =
            "Status: PASSED ✅";

    } else {

        document
            .getElementById("status")
            .textContent =
            "Status: NEEDS IMPROVEMENT ❌";

    }


    console.log(
        `Student: ${studentName}`
    );

    console.log(
        `Score: ${score}/${questions.length}`
    );

    console.log(
        `Percentage: ${percentage}%`
    );
}


// ==========================================
// JAVASCRIPT FUNDAMENTALS PRACTICE
// ==========================================


// var

var language = "JavaScript";


// let

let marks = 80;

marks = 90;


// const

const passingMarks = 40;


// Primitive Data Types

let name = "Althaf";

let age = 22;

let isLearning = true;

let value = null;

let notAssigned;

let symbolValue = Symbol("id");

let bigNumber = 12345678901234567890n;


// Reference Data Types

let student = {
    name: "Althaf",
    age: 22
};


let skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "React"
];


// typeof

console.log(typeof name);

console.log(typeof age);

console.log(typeof isLearning);

console.log(typeof student);

console.log(typeof skills);


// Type Conversion

let convertedNumber =
    Number("100");

console.log(convertedNumber);


let convertedString =
    String(500);

console.log(convertedString);


let convertedBoolean =
    Boolean(1);

console.log(convertedBoolean);


// Type Coercion

console.log("10" + 5);

console.log("10" - 5);


// Arithmetic Operators

console.log(10 + 5);

console.log(10 - 5);

console.log(10 * 5);

console.log(10 / 5);

console.log(10 % 3);


// Assignment Operators

let x = 10;

x += 5;

x -= 2;

x *= 2;

x /= 2;

console.log(x);


// Comparison Operators

console.log(10 == "10");

console.log(10 === "10");

console.log(10 != 20);

console.log(10 > 5);


// Logical Operators

console.log(true && true);

console.log(true || false);

console.log(!true);


// Template Literals

const learner = "Althaf";

const technology = "JavaScript";

const message =
    `Hello ${learner}, you are learning ${technology}.`;

console.log(message);