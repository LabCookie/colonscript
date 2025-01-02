document.addEventListener("DOMContentLoaded", function() {
    const textarea = document.getElementById("modules");
    textarea.addEventListener("keydown", function(event) {
        if (event.code == "Tab") {
            event.preventDefault();

            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            textarea.value = textarea.value.slice(0,start) + "\t" + textarea.value.slice(end);
            textarea.selectionStart = textarea.selectionEnd = start + 1;
        }
    })
    if (!textarea.value) {
        textarea.value = "function register() {}";
    }
})