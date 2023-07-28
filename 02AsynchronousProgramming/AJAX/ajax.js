
// old school -- web request in JS
// XMLHttpRequest – Standard API for AJAX


let button = document.querySelector("#load");
button.addEventListener("click", function loadRepos() {
    let url = 'https://api.github.com/users/testnakov/repos';

    const httpRequest = new XMLHttpRequest();

    httpRequest.addEventListener("readystatechange", function() {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            document.getElementById("res").textContent = httpRequest.responseText;
        }
    });

    httpRequest.open("GET", url);
    httpRequest.send();
    console.log(httpRequest.responseText);
});
