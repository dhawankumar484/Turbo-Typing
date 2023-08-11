const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".container .input-field");
const tryAgainBtn = document.querySelector(".status .try-again .btn");
const timeTrack = document.querySelector(".status .time span b");
const mistakeTrack = document.querySelector(".status .mistake span");
const wpmTrack = document.querySelector(".status .wpm span");
const cpmTrack = document.querySelector(".status .cpm span");


let timer
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadTexts() {
    const randomIndex = Math.floor(Math.random() * texts.length);
    typingText.innerHTML = "";
    texts[randomIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}

function onTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        
        tryAgainBtn.innerText="Try Again"
        wpmTrack.innerText = wpm;
        mistakeTrack.innerText = mistakes;
        cpmTrack.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inputField.value = "";
    }   
}

function initTimer() {
    if(timeLeft > 0) {
        timeLeft--;
        timeTrack.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpmTrack.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}


loadTexts();
inputField.addEventListener("input", onTyping);
