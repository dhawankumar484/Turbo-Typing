const typingText = document.querySelector(".typing-text p");
const inputField = document.querySelector(".container .input-field");


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

loadTexts();