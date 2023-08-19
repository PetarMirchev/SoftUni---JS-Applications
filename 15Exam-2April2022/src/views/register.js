import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';


//TO DO Replace with actual view
const registerTemplate = (onRegisterSubmit) => html`

        <!--Register Page-->
        <section id="registerPage">
            <form @submit=${onRegisterSubmit} class="registerForm">
                <img src="./images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div class="on-dark">
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div class="on-dark">
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <div class="on-dark">
                    <label for="repeatPassword">Repeat Password:</label>
                    <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Register</button>

                <p class="field">
                    <span>If you have profile click <a href="/login">here</a></span>
                </p>
            </form>
        </section>

`;

//! important if fields are not matching on new HTML template --> name="password", name="confirm-pass"....
//  <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password"> --> 
// --> take the key name="confirm-pass" to be used in function onRegister --> ['confirm-pass']: repass -->  
// --> because is not 'repass', but 'confirm-pass' -->  to work logic written down


export function registerPage(ctx){
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));


    // TO DO change user object base on requirements! --> { email, password, ['confirm-pass']: repass }
    async function onRegister( { email, password, ['repeatPassword']: repass }, form) {
        if (email == '' || password == ''){
            return alert('All fields are required!');
        }
        if(password != repass){
            return alert('Passwords don\'t match!');
        }

        await register(email, password);
        form.reset();
        //TO DO use redirect location from requirements !
        ctx.page.redirect('/'); // current home
    }

}


//*********************************************************************** */









