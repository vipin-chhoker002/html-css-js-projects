const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");
let userMessage = null;
const suggestion = document.querySelectorAll(".suggestion");
const toggleThemeButton = document.querySelector("#toggleThemeButton");
const deleChatButton = document.querySelector('#deleteChatButton');
let isReponseGretting = false;



// api configuration
const API_KEY = 'AIzaSyDDbptPiueyZyfUKW8FC4pNmEgL1UbKH7s'
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

// create chat element for add chat div in chat-list container//


const fetchDataLocalStorage = () => {
    const savedChats = localStorage.getItem('savedChats')
    let isLightMode = (localStorage.getItem("themeColor") == 'light_mode');
    document.body.classList.toggle("light_mode", isLightMode);
    toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";

    chatList.innerHTML = savedChats || " ";
    document.body.classList.toggle("hide-header", savedChats)
    chatList.scrollTo(0, chatList.scrollHeight)

}
fetchDataLocalStorage();


const createMeassageElement = (content, ...className) => {
    const div = document.createElement('div')
    div.classList.add('message', ...className);
    div.innerHTML = content;
    return div;

}
// showing effect by display each words 
const ShowTypingEffect = (text, textElement, incomingMessageDiv) => {
    const words = text.split(' ');
    let currnetWordIndex = 0;

    const typingInterval = setInterval(() => {
        textElement.innerHTML += (currnetWordIndex === 0 ? " " : " ") + words[currnetWordIndex++];
        incomingMessageDiv.querySelector('.icon').classList.add('hide');
        if (currnetWordIndex === words.length) {
            isReponseGretting = false;
            clearInterval(typingInterval)
            incomingMessageDiv.querySelector('.icon').classList.remove('hide');
            localStorage.setItem('savedChats', chatList.innerHTML); // save the chats to local storage
        }
        chatList.scrollTo(0, chatList.scrollHeight)
    }, 75);


}

// calling api using fetch or try and catch method to handle error;
const generateAPIResponse = async (incomingMessageDiv) => {
    const textElement = incomingMessageDiv.querySelector(".text");
    console.log(userMessage);
    
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json " },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{ text: userMessage }]
                }]
            })
        });
        const data = await response.json();
        console.log(data);
        
        if(!response.ok) throw new Error(data.error.message);
        
        // get the text from api request;

        const APIResponse = data.candidates[0].content.parts[0].text;
        ShowTypingEffect(APIResponse, textElement, incomingMessageDiv)
        // textElement.textContent=APIResponse;
    } catch (error) {
        isReponseGretting = false;
        ShowTypingEffect(error, textElement)
        textElement.classList.add('error')
        // console.log(error)
    } finally {
        incomingMessageDiv.classList.remove('loading')
    }
}

// showing a loading response while api response;
const showLoadingAnimation = () => {
    let html = `<div class="message-content">
                <img src="./google-gemini-icon.svg" alt="geni" class="avtar">
                <p class="text"></p>
                <div class="loading-indicator">
                    <div class="loading-bars"></div>
                    <div class="loading-bars"></div>
                    <div class="loading-bars"></div>
                </div>

            </div>
            <span onClick="copyMessage(this)" class=" icon material-symbols-outlined">
                content_copy
            </span>`
    const incomingMessageDiv = createMeassageElement(html, "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);
    generateAPIResponse(incomingMessageDiv)
    chatList.scrollTo(0, chatList.scrollHeight)

}

// copy message to clipboard fucntion

const copyMessage = (copyIcon) => {
    const messageContent = copyIcon.parentElement.querySelector(".text").innerText;
    // console.log(messageContent)
    window.navigator.clipboard.writeText(messageContent)
    copyIcon.innerHTML = "done";
    setTimeout(() => {
        copyIcon.innerHTML = "content_copy"
    }, 1000)
}
// add user chat in chat list box

const handleOutgoingChat = () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim() || userMessage;
    if (!userMessage || isReponseGretting) return // exit when user not exist
    let html =
    `
     <div class="message-content">
        <img src="./Max-R_Headshot (1).jpg" alt="geni" class="avtar">
        <p class="text"> </p>

    </div>
                
    `
    isReponseGretting = true;
    const outGoingMessageDiv = createMeassageElement(html, "outgoing");
    outGoingMessageDiv.querySelector(".text").innerText = userMessage;

    chatList.appendChild(outGoingMessageDiv)
    typingForm.reset()
    setTimeout(showLoadingAnimation, 500);

    document.body.classList.add("hide-header")
    chatList.scrollTo(0, chatList.scrollHeight)
}
suggestion.forEach((item) => {
    item.addEventListener("click", () => {
        userMessage = item.querySelector(".text").innerText;
        handleOutgoingChat();
    })
})

// create response on click suggestion

deleChatButton.addEventListener('click', () => {
    if (confirm("Are you sure to delete all chat")) {
        localStorage.removeItem("savedChats")
        fetchDataLocalStorage();
    }
})
// change theme light to dark
toggleThemeButton.addEventListener('click', () => {
    const isLightMode = document.body.classList.toggle('light_mode');
    localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode")
    toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";

});
typingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingChat()
})