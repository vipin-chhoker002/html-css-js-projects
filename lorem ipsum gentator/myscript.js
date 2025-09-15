const tagOptions = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span",];

const wordsSlider = document.getElementById("words");
const wordsValue = document.getElementById("wordsValue"); // span id
const paragraphsSlider = document.getElementById("paragraphs");
const paragraphValue = document.getElementById("paragraphsValue");// span id
const includeHtml = document.getElementById("include");
const tagsSelect = document.getElementById("tags");
const generat = document.getElementById("generate");
const output = document.querySelector('.output');

let a = `<p>`;
let yes = true;

function yesno() {

    // console.log(yes)
    if (includeHtml.value === "No") {
        yes = false
    } else {
        yes = true
    }
}

function main() {

    tagOptions.forEach((tag) => {
        let option = document.createElement("option");
        option.textContent = `<${tag}>`;
        option.value = tag;
        tagsSelect.appendChild(option);
    });

    wordsSlider.addEventListener('input', updateParagraphsValue);
    paragraphsSlider.addEventListener('input', updateWordsValue)

    generat.addEventListener('click', generateWords)

    tagsSelect.addEventListener("change", my)

    includeHtml.addEventListener('change', yesno)


}
function my() {
    a = tagsSelect.value;
    output.textContent = " ";
}

// create function to update paragraph value and words value;

function updateWordsValue() {
    let para = paragraphsSlider.value;
    paragraphValue.textContent = para;
}
function updateParagraphsValue() {
    let word = wordsSlider.value;
    wordsValue.textContent = word;


};
function generateWords(numWords) {
    my();
    const loremIpsumText =
        `Lorem ipsum dolor sit amet, consectetur 
		adipiscing elit, sed do eiusmod tempor 
		incididunt ut labore et dolore magna 
		aliqua. Diam in arcu cursus euismod 
		quis viverra nibh. Nunc aliquet bibendum 
		enim facilisis gravida neque convallis 
		a cras. Sagittis purus sit amet volutpat 
		Consequat mauris. Duis ultricies lacus 
		sed turpis tincidunt id. Consequat interdum 
		varius sit amet mattis vulputate. Enim sed 
		faucibus turpis in eu. Ridiculus mus mauris 
		vitae ultricies leo integer malesuada nunc vel. 
		Nulla pharetra diam sit amet nisl suscipit. 
		Lobortis elementum nibh tellus molestie nunc 
		non blandit massa enim. Dis parturient montes 
		nascetur ridiculus mus. Justo nec ultrices dui 
		sapien eget. Enim tortor at auctor urna nunc. 
		Dictumst quisque sagittis purus sit amet volutpat 
		consequat mauris nunc.`;


    // Split the Lorem Ipsum text into words 
    const words = loremIpsumText.split(' ');
    const wvalue = wordsSlider.value;
    const pvalue = paragraphsSlider.value;
    let data = ' ';
    // console.log(wvalue,pvalue);

    for (i = 0; i <= pvalue - 1; i++) {
        for (j = 0; j <= wvalue; j++) {
            let a = words.slice(0, j).join(' ');
            data = a;
        }
        // console.log(i)
        if (yes) {
            output.innerHTML += `<${a}> ${data} </${a}>`;
        } else {
            output.innerHTML += ` ${data} <br>`;
        }
    }
}

main();
