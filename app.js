let textArea = document.querySelector("textarea");

let upperCaseButton = document.getElementById("upper-case");
let lowerCaseButton = document.getElementById("lower-case");
let properCaseButton = document.getElementById("proper-case");
let sentenceCaseButton = document.getElementById("sentence-case");
let saveButton = document.getElementById("save-text-file");

upperCaseButton.disabled = true;
lowerCaseButton.disabled = true;
properCaseButton.disabled = true;
sentenceCaseButton.disabled = true;
saveButton.disabled = true;

textArea.addEventListener("input", function (){
    if (textArea.value !== ""){
        upperCaseButton.disabled = false;
        lowerCaseButton.disabled = false;
        properCaseButton.disabled = false;
        sentenceCaseButton.disabled = false;
        saveButton.disabled = false;
    } else {
        upperCaseButton.disabled = true;
        lowerCaseButton.disabled = true;
        properCaseButton.disabled = true;
        sentenceCaseButton.disabled = true;
        saveButton.disabled = true;
    }
})

upperCaseButton.addEventListener("click", function (){
    textArea.value = textArea.value.toUpperCase();
});

lowerCaseButton.addEventListener("click", function (){
    textArea.value = textArea.value.toLowerCase();
})

properCaseButton.addEventListener("click", function(){
    let text = textArea.value;
    text = text.split(" ");
    for (let i = 0; i < text.length; i++) {
        text[i] = text[i].charAt(0).toUpperCase() + text[i].slice(1).toLowerCase();
    }
    text = text.join(" ");
    textArea.value = text;
})

sentenceCaseButton.addEventListener("click", function (){
    let text = textArea.value;
    text = text.split(".");
    for (let i = 0; i < text.length; i++) {
        text[i] = text[i].trim();
        text[i] = text[i].charAt(0).toUpperCase() + text[i].slice(1).toLowerCase();
    }
    text = text.join(". ");
    textArea.value = text.slice(0, -1);
})

function download(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

saveButton.addEventListener("click", function (){
    download("text.txt",  textArea.value);
})