function attachEvents() {
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');
    const phoneBook = document.getElementById('phonebook');

    const btnLoad = document.getElementById('btnLoad');
    const btnCreate = document.getElementById('btnCreate');

    const phoneBookURL = `http://localhost:3030/jsonstore/phonebook`;


    btnLoad.addEventListener('click', async () => {
        const res = await fetch(phoneBookURL);
        const data = await res.json();
        //console.log(data);

        Object.values(data).forEach( el => {
            const liEl = document.createElement('li');
            liEl.textContent = `${el.person}: ${el.phone}`; //same as --> `${el['person']}: ${el['phone']}`

            const btnDelete = document.createElement('button');
            btnDelete.setAttribute(`id`, el._id); // same as -->  el['_id']
            btnDelete.textContent = 'Delete';

            liEl.appendChild(btnDelete);
            phoneBook.appendChild(liEl);



            btnDelete.addEventListener('click', async (e) => {
                // console.log(e.target); //<button id="2d5ae478-87c7-45fa-acf9-f04aa4724421">Delete</button>
                const userID = e.target.id;
                const targetURL = `${phoneBookURL}/${userID}`; //http://localhost:3030/jsonstore/phonebook/123456
                //console.log(targetURL); //http://localhost:3030/jsonstore/phonebook/d749a819-1e41-4c65-9ce2-7b429c4ebd0d
                await fetch(targetURL, {
                    method: 'DELETE',  
                })
                e.target.parentNode.remove();
            })
        })
    });



    btnCreate.addEventListener('click', async (e) => {
        if(!phoneInput.value || !personInput.value) return alert('fields is empty!'); // check if fields is empty

        //create request for post 
        await fetch(phoneBookURL, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({person: personInput.value, phone: phoneInput.value})
        })
   
        //clear input fields
        personInput.value = '';
        phoneInput.value = '';
        // invoke Load Button
        btnLoad.click();  
    })
   
}

attachEvents();