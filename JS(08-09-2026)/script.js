// Function Declaration
function calculateTotal(marks) {

    let total = 0;

    for (let mark of marks) {
        total += mark;
    }

    return total;
}


// Function Expression
const calculateAverage = function(total, numberOfSubjects) {

    return total / numberOfSubjects;
};


// Arrow Function
const getGrade = (average) => {

    if (average >= 90) {
        return "A";
    }
    else if (average >= 75) {
        return "B";
    }
    else if (average >= 60) {
        return "C";
    }
    else if (average >= 50) {
        return "D";
    }
    else {
        return "F";
    }
};


// Rest Parameter
function findHighest(...marks) {

    let highest = marks[0];

    for (let mark of marks) {

        if (mark > highest) {
            highest = mark;
        }
    }

    return highest;
}


// Course Message
function getCourseMessage(course = "javascript") {

    switch (course) {

        case "javascript":
            return "You selected JavaScript.";

        case "react":
            return "You selected React.";

        case "fullstack":
            return "You selected Full Stack.";

        default:
            return "Unknown course.";
    }
}


// Form Submit
document
    .getElementById("studentForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        // Get values
        const name =
            document.getElementById("studentName").value;

        const javascriptMarks =
            Number(document.getElementById("javascriptMarks").value);

        const reactMarks =
            Number(document.getElementById("reactMarks").value);

        const htmlMarks =
            Number(document.getElementById("htmlMarks").value);

        const cssMarks =
            Number(document.getElementById("cssMarks").value);

        const attendance =
            Number(document.getElementById("attendance").value);

        const course =
            document.getElementById("course").value;


        // Store marks in an array
        const marks = [
            javascriptMarks,
            reactMarks,
            htmlMarks,
            cssMarks
        ];


        // Check invalid marks
        for (let mark of marks) {

            if (mark < 0 || mark > 100) {

                document.getElementById("resultMessage").innerHTML =
                    "Please enter marks between 0 and 100.";

                return;
            }
        }


        // Calculate total
        const total =
            calculateTotal(marks);


        // Calculate average
        const average =
            calculateAverage(total, marks.length);


        // Get grade
        const grade =
            getGrade(average);


        // Find highest mark
        const highest =
            findHighest(...marks);


        // Pass / Fail
        let status;

        if (average >= 50) {

            status = "PASS";

        } else {

            status = "FAIL";
        }


        // Attendance check
        let attendanceMessage;

        if (attendance >= 75) {

            if (average >= 50) {
                attendanceMessage =
                    "Eligible for final assessment.";
            } else {
                attendanceMessage =
                    "Attendance is good, but marks need improvement.";
            }

        } else {

            attendanceMessage =
                "Attendance is below 75%.";
        }


        // Ternary operator
        const performance =
            average >= 75 ? "Excellent Performance" : "Needs Improvement";


        // Course message
        const courseMessage =
            getCourseMessage(course);


        // Display result
        document.getElementById("resultMessage").innerHTML = `

            <strong>Student:</strong> ${name}
            <br>

            <strong>Total Marks:</strong> ${total} / 400
            <br>

            <strong>Average:</strong> ${average.toFixed(2)}%
            <br>

            <strong>Grade:</strong> ${grade}
            <br>

            <strong>Status:</strong> ${status}
            <br>

            <strong>Highest Mark:</strong> ${highest}
            <br>

            <strong>Attendance:</strong> ${attendance}%
            <br>

            <strong>Performance:</strong> ${performance}
            <br>

            <strong>${courseMessage}</strong>
            <br>

            ${attendanceMessage}

        `;

    });


    condition ? true : false