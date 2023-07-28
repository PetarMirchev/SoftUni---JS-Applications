
const registerForm =  document.querySelector('form');
document.getElementById('user').style.display = 'none'; // hide Logout


const url =  'http://localhost:3030/users/register';

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    //console.log(e.currentTarget);
    //target form & elements in form on event click
    const formData = new FormData(e.currentTarget);

    // get form data from input fields:
    const { email, password, rePass } = Object.fromEntries(formData);
    //console.log(email, password, rePass); // name="email", name="password", name="rePass" //sadsad 1111 2222

    try {
        //check if same input values in form is empty trow Error
        if([ ...formData.values()].some(el => el === '')){//spread all value input in 1 array // ['asdas', '1111', '2222']
            throw new Error('input is not correctly');
        } else if(password != rePass) {
            throw new Error('2 passwords is not matching');
        }  
        
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify({email, password, rePass})
        });

        //if response from BackEnd is not Ok throw new Error
        if(!res.ok){
            const error = await res.json();
            throw new Error(error.message);
        }

        const data = await res.json();
        // console.log(data);
        // accessToken: "02d9b3e99c2dab6de27f64351ea37844eac4de696c292c1f7090e6491ca80464"
        // email: "asd"
        // password: "11"
        // rePass: "11"
        // _createdOn: 1688404094449
        // _id: "22911c22-5726-4ad2-a818-d614e3c0a090"

        const user = {
            email: data.email,
            id: data._id,
            token: data.accessToken,
        }
            
        //put user data into Application -> LocalStorage in browser!
        localStorage.setItem("userData", JSON.stringify(user)); //{email: "qwer", id: "8151078f-81f8-41ce-9131-cf908307fb4e",…}
        
        window.location = './index.html'; //relocate user to home page

    } catch (error) {
        document.querySelector('form').reset(); // mark form & reset content in form by .reset()
        alert(error.message);
    }
});