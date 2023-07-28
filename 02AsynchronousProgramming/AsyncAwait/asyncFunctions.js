
//! Async/Await vs Promise.then

// Async/Await
async function logFetch1(url) {
        try {
            const response = await fetch(url);
            console.log(await response.text());
        }
        catch (err) {
            console.log(err);
        }
}

// Promise.then
function logFetch2(url) {
    return fetch(url)
    .then(response => { return response.text()})
    .then(text => {console.log(text);})
    .catch(err => {console.error(err);});
}