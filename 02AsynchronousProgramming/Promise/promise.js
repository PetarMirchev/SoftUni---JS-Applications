
// A promise is an asynchronous action that may complete at some point and produce a value

// * States:
// - Pending - operation still running (unfinished)
// - Fulfilled - operation finished (the result is available)
// - Failed - operation failed (an error is present)


// Promises use the Promise class
new Promise(executor);


//! Promise Methods
Promise.reject(reason)  //Returns an object that is rejected with the given reason
Promise.resolve(value) // Returns an object that is resolved with the given value
Promise.all(iterable) // Fulfills when all of the promises have fulfilled OR Rejects as soon as one of them rejects
Promise.allSettled(iterable) // Wait until all promises have settled
Promise.race(iterable) // Returns a promise that fulfills or rejects as soon as one of the promises in an iterable is settled
Promise.prototype.finally() // The handler is called when the promise is settled


//*--------------------------------------------------------------------------------------------------- */


//? What is Fetch?
//* The fetch() method allows making network requests
//* It is similar to XMLHttpRequest (XHR). The main difference is that the Fetch API:
// - Uses Promises
// - Enables a simpler and cleaner API
// - Makes code more readable and maintainable
/*     fetch('./api/some.json')
        .then(function(response) {…})
        .catch(function(err) {…})                                      */


//! GET Request
/*     fetch('https://api.github.com/users/testnakov/repos')
        .then((response) => response.json())
        .then((data) => console.log (data))
        .catch((error) => console.error(error))                        */

//! POST Request
/*     fetch('/url', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data),
        })                                                              */

//! Body Methods
// clone() - create a clone of the response
// json() -  resolves the promise with JSON
// redirect() - create new promise but with different URL
// text() - resolves the promise with string
// arrayBuffer() - resolve body with ArrayBuffer
// blob() - resolve body with Blob (file, image, etc.)
// formData() - resolve body with FormData

//! Response Types
// basic - normal, same origin response
// cors - response was received from a valid cross-origin request
// error - error network
// opaque - Response for "no-cors" request to cross-origin resource
// opaqueredirect - the fetch request was made with redirect: "manual"


//? Chaining Promises
/*    fetch('users.json')
        .then(status)
        .then(json)
        .then(function(data) {…})
        .catch(function(error) {…});                                 */




        

