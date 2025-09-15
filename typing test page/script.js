const passage = document.getElementById('passage');
const userInput = document.getElementById('userInput');
const startBtn = document.getElementById('startBtn');
const result = document.getElementById('result');
const refresh = document.getElementById("refresh");
const stopBtn = document.getElementById("stop");
stopBtn.addEventListener('click', stop)
let startTime;
let endTime;

const typingContent =
    ["The internet is a vast and ever-changing resource that has become an integral part of our lives. We use it for everything from staying connected with friends and family to researching school projects and finding new jobs. But with so much information available at our fingertips, it can be easy to get overwhelmed. That's where arrays come in.", "An array is a data structure that stores a collection of items in a specific order. This makes it easy to access and manipulate the data. Arrays are used in all sorts of programming languages, and they're a powerful tool for organizing and managing data", "To create an array, you first need to specify the data type of the items that you want to store. For example, you could create an array of integers, strings, or objects. Once you know the data type, you can declare the array and specify its size.", "To add items to an array, you can use the push() method. This method takes an item as its argument and adds it to the end of the array. To remove items from an array, you can use the pop() method. This method removes the last item from the array and returns it.", "You can also access items in an array by using their index. The index of an item is its position in the array. The first item in the array has an index of 0, the second item has an index of 1, and so on. To access an item by its index, you can use the  operator.", "Arrays are a powerful tool for organizing and managing data. They can be used to store all sorts of information, such as names, addresses, phone numbers, and grades. Arrays can also be used to store more complex data, such as objects and images."
    ]

let oldtext = passage.innerHTML;

let num = 0;
const contentValue = () => {

    num = 0;
    let val = Math.floor(Math.random() * 6)
    passage.innerText = typingContent[val];
    userInput.value = "";
    startTime = Date.now()
    oldtext = typingContent[val]

}
refresh.addEventListener('click', contentValue);
startBtn.addEventListener('click', startTest);
function startTest() {
    startBtn.disabled = true;
    userInput.focus();
    userInput.value = "";
    userInput.addEventListener('input', startTyping)
}

let newText;
let textValueArray;
let oldtextValueArray;
function handleSpaceKeyPress(event) {
    newText = userInput.value;
    textValueArray = newText.trim().split(' ');
    oldtextValueArray = oldtext.trim().split(' ');
    if (event.code === 'Space') {
        let oldtext = oldtextValueArray[num];
        let newText = textValueArray[num];
        if (oldtext == newText) {
            passage.style.color = 'black';
        }
        else {
            passage.style.color = 'red';
        }
        console.log(num)

        num += 1;

    } else if (event.code == 'Backspace') {
        num -= 1;

    }
}
function startTyping() {
    document.addEventListener("keydown", handleSpaceKeyPress);
}

function stop() {

    let text = passage.textContent.trim().split(' ');
    let userText = userInput.value.trim().split(' ');

    let ResultF = text.filter((char, index) => {
        return char == userText[index]
    })

    let finnalresult = (ResultF.length / text.length) * 100;
    result.innerText = finnalresult;

}



