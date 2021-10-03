let textArea = document.querySelector("textarea");

let upperCaseButton = document.getElementById("upper-case");
let lowerCaseButton = document.getElementById("lower-case");
let properCaseButton = document.getElementById("proper-case");
let sentenceCaseButton = document.getElementById("sentence-case");
let saveButton = document.getElementById("save-text-file");

let buttons = document.querySelectorAll("button");

let buttonsActive = false;

textArea.addEventListener("input", function (){
    if (textArea.value === ""){
        buttons.forEach(function (element) {
            element.className = element.className.replace("enabled", "disabled");
        });
        buttonsActive = false;
    } else {
        buttons.forEach(function (element) {
            element.className = element.className.replace("disabled", "enabled");
        });
        buttonsActive = true;
    }
});

textArea.addEventListener("focusin", function (){
    textArea.className = textArea.className.replace("focusout", "");
})

textArea.addEventListener("focusout", function (){
    textArea.className = "focusout";
});

function showSnackbar(){
    let snackbar = document.getElementById("snackbar");
    if (snackbar.className !== "show"){
        snackbar.className = "show";
        let snackbarBtn = document.querySelector("#snackbar div")

        let snackbarHidden = false;
        let snackbarClosed = false;

        snackbarBtn.addEventListener("click", function (){
            if (!snackbarHidden){
                snackbar.className = snackbar.className.replace("show", "hide");
                snackbarHidden = true;
                setTimeout(function (){
                    if (!snackbarClosed){
                        snackbar.className = snackbar.className.replace("hide", "");
                        snackbarClosed = true;
                    }
                }, 500);
            }
        });

        setTimeout(function (){
            if (!snackbarHidden){
                snackbar.className = snackbar.className.replace("show", "hide");
                snackbarHidden = true;
            }
            setTimeout(function (){
                if (!snackbarClosed){
                    snackbar.className = snackbar.className.replace("hide", "");
                    snackbarClosed = true;
                }
            }, 500);
        }, 5000)
    }
}

function shakeBtn(btn) {
    btn.classList.add("shake");
    setTimeout(function (){
        btn.classList.remove("shake");
    }, 820)
}

upperCaseButton.addEventListener("click", function (){
    if (buttonsActive) {
        textArea.value = textArea.value.toUpperCase();
    } else {
        shakeBtn(upperCaseButton);
        showSnackbar();
    }
});

lowerCaseButton.addEventListener("click", function (){
    if (buttonsActive) {
        textArea.value = textArea.value.toLowerCase();
    } else {
        shakeBtn(lowerCaseButton);
        showSnackbar();
    }
})

properCaseButton.addEventListener("click", function(){
    if (buttonsActive) {
        let text = textArea.value;
        text = text.split(" ");
        for (let i = 0; i < text.length; i++) {
            text[i] = text[i].charAt(0).toUpperCase() + text[i].slice(1).toLowerCase();
        }
        text = text.join(" ");
        textArea.value = text;
    } else {
        shakeBtn(properCaseButton);
        showSnackbar();
    }
})

sentenceCaseButton.addEventListener("click", function (){
    if (buttonsActive) {
        let text = textArea.value;
        text = text.split(".");
        for (let i = 0; i < text.length; i++) {
            text[i] = text[i].trim();
            text[i] = text[i].charAt(0).toUpperCase() + text[i].slice(1).toLowerCase();
        }
        text = text.join(".");
        textArea.value = text;
    } else {
        shakeBtn(sentenceCaseButton);
        showSnackbar();
    }
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

let modal = document.getElementById("file-name-dialog");

// Get the <span> element that closes the modal
let span = document.getElementById("close");

saveButton.addEventListener("click", function (){
    if (buttonsActive) {
        modal.style.display = "block";
    } else {
        shakeBtn(saveButton);
        showSnackbar();
    }
})

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

let downloadBtn = document.getElementById("download-btn");
downloadBtn.addEventListener("click", function (){
    let filenameInput = document.getElementById("filename-input");
    download( filenameInput.value + ".txt",  textArea.value);
})