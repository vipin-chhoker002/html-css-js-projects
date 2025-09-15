let temp = document.getElementById("temp");
let temp1 = document.getElementById("temp1");
let inputBox = document.getElementById("number");
let outputBox = document.getElementById("output");
function slefChange() {
    if (temp.value == 'f') {
        temp1.value = "d";
    } else {
        temp1.value = "f"
    }
    // console.log("hey")
}
function ferhanight() {
    let val = inputBox.value;
    outputBox.value = ((val * 9 / 5) + 32).toFixed(5);
}
function degree() {
    let val = inputBox.value;
    outputBox.value = ((val - 32) / (9 / 5)).toFixed(5);
}
function result() {
    if (temp.value == temp1.value) {
        outputBox.value = inputBox.value;
    }
    else if (temp.value == "f" && temp1.value == "d") {

        degree();
    }
    else if (temp.value == "d" && temp1.value == "f") {
        ferhanight();
    };
};
temp.addEventListener("change", function () {
    slefChange();
    if (inputBox.value != "" && inputBox.value != 0) {
        result();
        temp1.addEventListener("change", function () {
            result();
        })
    }
});
inputBox.addEventListener("input", function () {
    if (temp.value != "n" && temp.value != "n") {
        result()
    }
})

