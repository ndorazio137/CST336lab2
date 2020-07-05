 $(document).ready(function() {
     
    //Global Variables
    var score = 0;
    var attempts = localStorage.getItem("total_attempts");
    
    //event listeners 
    $("button").on("click", gradeQuiz);
    $(".q5Choice").on("click", function() {
        $(".q5Choice").css("background", "");
        $(this).css("background", "rgb(255, 255, 0)");
    });
    
    dispayQ4Choices();
    dispayQ7Choices();
    
    //Loads Q4 radio buttons
    function dispayQ4Choices() {
        let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
        q4ChoicesArray = _.shuffle(q4ChoicesArray);
        
        let i;
        for(i = 0; i < q4ChoicesArray.length; i++) {
            $("#q4Choices").append(`<input type="radio" name="q4" id="${q4ChoicesArray[i]}" 
                value="${q4ChoicesArray[i]}"><label for=${q4ChoicesArray[i]}"> 
                    ${q4ChoicesArray[i]}</label>`);
        }
    }
    
    //Loads Q7 radio buttons
    function dispayQ7Choices() {
        let q7ChoicesArray = ["California Gull", "Brown Pelican", "Western Meadowlark", "California Quail"];
        q7ChoicesArray = _.shuffle(q7ChoicesArray);
        
        let i;
        for(i = 0; i < q7ChoicesArray.length; i++) {
            $("#q7Choices").append(`<input type="radio" name="q7" id="${q7ChoicesArray[i]}" 
                value="${q7ChoicesArray[i]}"><label for=${q7ChoicesArray[i]}"> 
                    ${q7ChoicesArray[i]}</label>`);
        }
    }
    
    function isFormValid() {
        let isValid = true;
        if ($("#q1").val() == "") {
            isValid = false;
            $("#validationFdbk").html("Question 1 was not answered");
        }
        return isValid;
    }
    
    //Displays correct answer banner and updates score
    function rightAnswer(index) {
        $(`#q${index}Feedback`).html("Correct!");
        $(`#q${index}Feedback`).attr("class", "bg-success text-white");
        $(`#markImg${index}`).html("<img src='img/checkmark.png' alt='checkmark'>");
        score += 12.50;
    }
    
    //Displays wrong answer banner
    function wrongAnswer(index) {
        $(`#q${index}Feedback`).html("Incorrect!");
        $(`#q${index}Feedback`).attr("class", "bg-warning text-white");
        $(`#markImg${index}`).html("<img src='img/xmark.png' alt='xmark'>");
    }
    
    function gradeQuiz() {
        $("#validationFdbk").html(""); //resets validation feedback
        
        if (!isFormValid()) {
            return;
        }
        
        //variables
        score = 0;
        let q1Response = $("#q1").val().toLowerCase();
        let q2Response = $("#q2").val();
        let q4Response = $("input[name=q4]:checked").val();
        let q6Response = $("#q6").val();
        let q7Response = $("input[name=q7]:checked").val();
        let q8Response = $("#q8").val().toLowerCase();
        
        //Question 1
        if (q1Response == "sacramento") {
            rightAnswer(1);
        }
        else {
            wrongAnswer(1);
        }
        
        //Question 2
        if (q2Response == "mo") {
            rightAnswer(2);
        }
        else {
            wrongAnswer(2);
        }
        
        //Question 3
        if ($("#Jefferson").is(":checked") 
            && $("#Roosevelt").is(":checked") 
            && !$("#Jackson").is(":checked") 
            && !$("#Franklin").is(":checked")) {
            rightAnswer(3);
        }
        else {
            wrongAnswer(3);
        }
        
        //Question 4
        if (q4Response == "Rhode Island") {
            rightAnswer(4);
        }
        else {
            wrongAnswer(4);
        }
        
        //Question 5
        if ($("#seal2").css("background-color") == "rgb(255, 255, 0)") {
            rightAnswer(5);
        }
        else {
            wrongAnswer(5);
        }
        
        //Question 6
        if (q6Response == "su") {
            rightAnswer(6);
        }
        else {
            wrongAnswer(6);
        }
        
        //Question 7
        if (q7Response == "California Quail") {
            rightAnswer(7);
        }
        else {
            wrongAnswer(7);
        }
        
        //Question 8
        if (q8Response == "alaska") {
            rightAnswer(8);
        }
        else {
            wrongAnswer(8);
        }
        
        //Display score
        $("#totalScore").html(`Total Score: ${score}`);
        if (score < 80) {
            $("#totalScore").attr("class", "bg-danger text-white");
        }
        else {
            $("#totalScore").attr("class", "bg-success text-white");
            alert("Well Done!");
        }
        //Display total attempts
        $("#totalAttempts").html(`Total Attempts: ${++attempts}`);
        localStorage.setItem("total_attempts", attempts);
    }
}) //ready
