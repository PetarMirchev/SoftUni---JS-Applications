

const loginForm = document.querySelector('form');

document.getElementById('user').style.display = 'none'; // hide Logout


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    //target 2 fields in form
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        const res = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        if(!res.ok) { // error occurred!
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        const userData = {
            email: data.email,
            id: data._id,
            token: data.accessToken,
        };

        //push data into the localStorage on browser!
        localStorage.setItem('userData', JSON.stringify(userData));
        window.location = './index.html';

    } catch (error) {
        document.querySelector('form').reset();
        alert(error.message);
    }
})