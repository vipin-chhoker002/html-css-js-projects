document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) { // Adjust the scroll threshold as needed
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

function showcard() {
    // let db=document.getElementById
    let show = document.getElementById("show-2");
    if (show.style.display === "none") {
        show.style.display = "flex"
        document.getElementById("button-hide").style.display = "none"
        document.getElementById("b2b-div").style.background = ""
        document.getElementById("b2c-div").style.background = "#ff914d"
    }
    // else{
    //     document.getElementById("b2c-div").style.background=""

    // }
}


let hide = document.getElementById("button-hide").style.display = "none";
function show() {  //show hide button display
    let show2 = document.getElementById("show-2");
    let hide = document.getElementById("button-hide")
    if (hide.style.display === "none") {
        hide.style.display = "flex"
        document.getElementById("b2c-div").style.background = ""
        show2.style.display = "none"
        document.getElementById("b2b-div").style.background = "#ff914d"
    }
    // else{
    //     document.getElementById("b2b-div").style.background=""

    // }

};

document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.question');

    questions.forEach(function (question) {
        question.addEventListener('click', function () {
            const answer = question.nextElementSibling;
            const allAnswers = document.querySelectorAll('.answer');

            allAnswers.forEach(function (a) {
                if (a !== answer) {
                    a.style.display = 'none';
                }
            });

            answer.style.display = answer.style.display === 'none' ? 'block' : 'none';
        });
    });
});

function navshow() {
    let bars = document.getElementById("bars");
    // bars.style.left = "530px";
    if (bars.style.left === "830px") {
        bars.style.left = "550px";

    }
    else {
        bars.style.left = "830px";
    };
}
function vipin() {
    // document.getElementById("bars").style.display="none";
    let bars = document.getElementById("bars");
    // bars.style.left = "530px";
    if (bars.style.display === "none") {
        bars.style.display="block"
    


    }else{
        bars.style.display="none"
    }
    
}

















