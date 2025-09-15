let span = document.querySelector("span");
let down = document.getElementById("down");
let reset = document.getElementById("reset");
let fun = document.getElementById("fun");
let up = document.getElementById("up");

let spanInner = span.innerText;
let spanInnernumber = +spanInner;

function upNumber() {
    color();
    spanInnernumber += 1;
    span.innerText = spanInnernumber;
}
function color() {
    if (spanInnernumber < 0) {
        span.style.color = "red";
    } else {
        span.style.color = "black";

    }
}

// Setup event listener for the "up" button
up.addEventListener("click", upNumber);

console.log(span.innerText);
down.addEventListener("click", function () {
    color();
    spanInnernumber -= 1;
    span.innerText = spanInnernumber;

});
reset.addEventListener("click", function () {
    spanInnernumber = 0;
    color();
    span.innerText = 0;
    clearInterval(a)
    clearInterval(b)
});
let a;
let b;
fun.addEventListener("click", function () {
    color();
    if (spanInnernumber > 0) {
        a = setInterval(() => {
            spanInnernumber -= 1;
            span.innerText = spanInnernumber;
            // console.log(i)
            if (spanInnernumber == 0) {
                clearInterval(a);
            }
        }, 1000);
    }
    else if (spanInnernumber < 0) {
        b = setInterval(() => {
            span.style.color = "red";
            spanInnernumber += 1;
            span.innerText = spanInnernumber;
            // console.log(i)
            if (spanInnernumber == 0) {
                clearInterval(b);
            }
        }, 1000);
    }


})


// professional way to do this task

// let span = document.querySelector("span");
// let btns = document.querySelectorAll(".btns");
// let value = 0; // initial sacle

// btns.forEach((btn) => {
//     btn.addEventListener("click", function (e) {
//         let style = e.currentTarget.classList;
//         if (style.contains("up")) {
//             value++;
//         } else if (style.contains("down")) {
//             value--;
//         }
//         else if (style.contains("reset")) {
//             value=0;
//         }
//         span.innerText = value;

//     })


// })


