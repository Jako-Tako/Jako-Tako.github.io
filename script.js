const obfuscatedCode = ["1", "1", "4", "7", "3", "2", "1", "3", "3", "J", "D"];
var errorAudio = new Audio('error.mp3');
var successAudio = new Audio('success.mp3');

document.addEventListener("DOMContentLoaded", () => {

    const inputs = document.querySelectorAll("#form input");

    inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            if (input.value.length === input.maxLength) {
                const nextInput = inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        });
    });
});

function showToast(message, type = "info") {
    switch (type) {
        case 'error':
            errorAudio.play();
            break
        case 'success':
            successAudio.play();
            break
    }
    Toastify({
        text: message,
        duration: 3000,
        gravity: "top", // 'top' or 'bottom'
        position: "right", // 'left', 'center' or 'right'
        backgroundColor: type === "error" ? "#781a34" : "#3c8b3f",
        stopOnFocus: true,
    }).showToast();
}

function checkCode() {
    const userInputs = [];
    
    for (let i = 1; i <= 11; i++) {
        const inputValue = document.getElementById(i.toString()).value.trim();
        if (!inputValue) {
            showToast("Wszystkie pola muszą być wypełnione!", "error");
            return;
        }
        userInputs.push(inputValue.toUpperCase());
    }

    const isMatch = userInputs.every((val, index) => val === obfuscatedCode[index].toUpperCase());

    if (isMatch) {
        $('#form, #button').hide();
        $('#film').show();
        $('title').text('Gratulacje!')
        showToast("Kod poprawny! Przejdź dalej.", "success");
        let toggle = true;
        setInterval(() => {
            $('title').text(toggle ? '🥳' : '🎉');
            toggle = !toggle;
        }, 500);
    } else {
        $('#1, #2, #3, #4, #5, #6, #7, #8, #9, #10, #11').val('');
        showToast("Błędny kod!", "error");
    }
}

function goTo() {
    window.open('https://www.youtube.com/', '_blank');
}


document.addEventListener("keydown", (event) => {
    if (event.key === "F12" || (event.ctrlKey && (event.key === "u" || event.key === "s"))) {
        event.preventDefault();
        showToast("Podgląd kodu jest zablokowany!", "error");
    }
});

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    showToast("Kliknięcie prawym przyciskiem jest zablokowane!", "error");
});
