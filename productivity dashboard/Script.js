function openFeature() {

    let allElems = document.querySelectorAll('.elem');
    let fullElems = document.querySelectorAll('.fullElem');
    let fullElemsBakcbtn = document.querySelectorAll('.fullElem .back');


    allElems.forEach(elem => {
        elem.addEventListener('click', () => {

            fullElems[elem.id].style.display = "block"
        });
    });

    fullElemsBakcbtn.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            fullElems[index].style.display = "none"
        });


    })
}

const themeBtn = document.querySelector(".theme i");

themeBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("light-theme");

    if (document.documentElement.classList.contains("light-theme")) {
        localStorage.setItem("theme", "light");
        themeBtn.classList.replace("ri-sun-line", "ri-moon-fill"); // 🌙
    } else {
        localStorage.setItem("theme", "dark");
        themeBtn.classList.replace("ri-moon-fill", "ri-sun-line"); // ☀️
    }
});


window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.documentElement.classList.add("light-theme");
        themeBtn.classList.replace("ri-sun-line", "ri-moon-fill");
    }
});
openFeature();

let input = document.querySelector('.add-task form input[type="text"]');
let textAera = document.querySelector('.add-task form textarea');
let allTask = document.querySelector(".all-task");
let checkBox = document.querySelector('#checkbox');
let form = document.querySelector(".add-task form");
let dayPlanner = document.querySelector(".daily-planner")

const todoTask = () => {
    let currentTask = [];

    if (localStorage.getItem("currentTask")) {
        currentTask = JSON.parse(localStorage.getItem("currentTask"));
    } else {
        console.warn("No existing data in localStorage");
    }

    function renderTask(task) {
        let sum = '';
        task.forEach((val, index) => {
            sum += `
        <div class="task " data-index="${index}">
            <h5 class="${val.isCompleted ? 'completed' : ''}"> ${val.task} <span>${val.imp ? '<i class="ri-star-fill"></i>' : ''}</span></h5>
           
           <div> <button class="mark-btn">${!val.isCompleted ? '<i class="mark-btn ri-chat-unread-fill"></i>' : '<i class="ri-check-double-line mark-btn"></i>'}</button>
            <button class="delete-btn"><i class=" delete-btn    ri-delete-bin-line"></i></button></div>
        </div>
        `;
        });
        allTask.innerHTML = sum;
    }

    renderTask(currentTask);

    // ✅ Add Task
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (input.value.trim() !== "") {
            const newTask = {
                task: input.value,
                details: textAera.value,
                imp: checkBox.checked,
                isCompleted: false
            };

            currentTask.push(newTask);
            localStorage.setItem("currentTask", JSON.stringify(currentTask));
            renderTask(currentTask);

            input.value = "";
            textAera.value = "";
            checkBox.checked = false;
        }
    });

    // ✅ Event Delegation for Mark/Undo and Delete
    allTask.addEventListener('click', function (e) {
        const parentTask = e.target.closest('.task');
        const index = parentTask?.dataset?.index;

        if (e.target.classList.contains('mark-btn')) {
            currentTask[index].isCompleted = !currentTask[index].isCompleted;
            localStorage.setItem("currentTask", JSON.stringify(currentTask));
            renderTask(currentTask);
        }

        if (e.target.classList.contains('delete-btn')) {
            currentTask.splice(index, 1);
            localStorage.setItem("currentTask", JSON.stringify(currentTask));
            renderTask(currentTask);
        }
    });


}
todoTask();
//
const dailyTask = () => {
    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanerData')) || {};

    let hours = Array.from({ length: 18 }, (elem, idx) => (`${6 + idx}:00 - ${7 + idx}:00`));
    var holeDaySum = " "
    hours.forEach((item, idx) => {
        holeDaySum += `<div class="day-planner-time">
            <p>${item}</p>
            <input id=${idx}   type="text" placeholder="..." />
          </div>`
    });

    dayPlanner.innerHTML = holeDaySum;
    let dayPlannerInput = document.querySelectorAll(".daily-planner  input")



    dayPlannerInput.forEach((items, idx) => {
        if (dayPlanData[idx]) {
            items.value = dayPlanData[idx];
        }
        items.addEventListener('input', (e) => {
            dayPlanData[items.id] = items.value;
            localStorage.setItem('dayPlanerData', JSON.stringify(dayPlanData))
        })

    })

}
dailyTask();

// motivation


const motivation = async () => {
    let motivationQuotes = document.querySelector('.motivation-wrapper');

    let quotes = await fetch('https://api.quotable.io/random/')

    let data = await quotes.json();

    motivationQuotes.innerHTML += `     <div class="today-quotes">
              <p>
                <i class="ri-double-quotes-l"></i>
                ${data.content}
                <i class="ri-double-quotes-r"></i>
              </p>
            </div>
            <div class="writer">
              <p>---${data.author}</p>
            </div>`




}


motivation();

function pomo() {


    let workTime = 25 * 60;  // 25 min work
    let breakTime = 5 * 60;  // 5 min break
    let totalSec = workTime;

    const showTimmer = document.querySelector('.pomo-timmer h1');
    const statusText = document.querySelector('.pomo-timmer .status');
    const start = document.querySelector(".pomo-timmer .start-timmer");
    const reset = document.querySelector(".pomo-timmer .reset-timmer");
    const pause = document.querySelector(".pomo-timmer .pause-timmer");

    let timerInterval = null;
    let onWork = true;

    // Display function
    const pomoTimmer = () => {
        let minutes = Math.floor(totalSec / 60);
        let seconds = totalSec % 60;
        showTimmer.innerHTML =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    // Start timer
    const startTimer = () => {
        if (timerInterval) return; // prevent stacking intervals

        timerInterval = setInterval(() => {
            if (totalSec > 0) {
                totalSec--;
                pomoTimmer();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;

                // Switch session automatically
                if (onWork) {
                    totalSec = breakTime;
                    statusText.textContent = "Break Time 💤";
                } else {
                    totalSec = workTime;
                    statusText.textContent = "Work Session 💻";
                }
                onWork = !onWork;
                pomoTimmer();
                startTimer(); // auto start next session
            }
        }, 1000);
    };

    // Pause timer
    function pauseTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // Reset timer
    function resetTimer() {
        clearInterval(timerInterval);
        timerInterval = null;
        totalSec = workTime;
        onWork = true;
        statusText.textContent = "Work Session 💻";
        pomoTimmer();
    }

    // Event listeners
    pause.addEventListener('click', pauseTimer);
    start.addEventListener("click", startTimer);
    reset.addEventListener("click", resetTimer);

    // Show initial timer & status
    pomoTimmer();
    statusText.textContent = "Work Session 💻";

}
pomo()

//weather api
function weather() {

    let headerh1 = document.querySelector(".header1 h1");
    let headerh2 = document.querySelector(".header1 h2");
    let headertemp = document.querySelector(".header2 h2");
    let Humidity = document.querySelector(".Humidity");
    let Wind = document.querySelector(".Wind");
    let prep = document.querySelector(".prip");
    let due = document.querySelector(".due");
    let data = null
    async function weatherApi() {
        let key = '28d73b6c5d0a48b8a33173827252009'
        var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=delhi`)
        data = await response.json();
        headertemp.innerHTML = `${data.current.temp_c} °C`
        Humidity.innerHTML = ` Humidity:${data.current.humidity}`
        Wind.innerHTML = ` wind ${data.current.wind_kph} km/h`
        prep.innerHTML = `Precipation:${data.current.precip_mm} mm`
        due.innerHTML = ` ${data.current.condition.text} `

        console.log(data);


    }





    function timeDate() {
        let day = ["Sunday", "Monday", 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let monthName = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let date = new Date();
        let hours = date.getHours();
        let min = date.getMinutes().toString().padStart(2, "0");
        let sec = date.getSeconds().toString().padStart(2, "0");
        let month = date.getMonth();
        let daate = date.getDate().toString().padStart(2, "0");
        let year = date.getFullYear();

        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // convert to 12-hour format
        hours = hours.toString().padStart(2, "0");

        headerh1.innerHTML = `${day[date.getDay()]} ${hours}:${min}:${sec} ${ampm}`;
        headerh2.innerHTML = `${daate} ${monthName[month]} ${year}`;
    }

    setInterval(() => {

        timeDate()
    }, 1000)


    weatherApi()
}
weather()