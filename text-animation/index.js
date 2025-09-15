const words= "Vipin gurjar";
const ANIMATION_DUREATION=4000;
const characters= words.split("").forEach((char,i)=>{
    function createElement(offest){

        const div = document.createElement("div");
        div.innerText=char;
        div.classList.add("character");
        div.style.animationDelay=`-${i*ANIMATION_DUREATION/16-offest}ms`
        return div;



    }

    document.getElementById("sprial").append(createElement(0));
    document.getElementById("sprial2").append(createElement(-1 * (ANIMATION_DUREATION / 2)))

        
})
