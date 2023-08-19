import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';


//TO DO Replace with actual view
const registerTemplate = (onRegisterSubmit) => html`

        <section id="register-page" class="register">
            <form @submit=${onRegisterSubmit} id="register-form" action="" method="" >
                <fieldset>
                    <legend>Register Form</legend>
                    <p class="field">
                        <label for="email">Email</label>
                        <span class="input">
                            <input type="text" name="email" id="email" placeholder="Email">
                        </span>
                    </p>
                    <p class="field">
                        <label for="password">Password</label>
                        <span class="input">
                            <input type="password" name="password" id="password" placeholder="Password">
                        </span>
                    </p>
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
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
    async function onRegister( { email, password, ['confirm-pass']: repass }, form) {
        if (email == '' || password == ''){
            return alert('All fields are required!');
        }
        if(password != repass){
            return alert('Passwords don\'t match!');
        }

        await register(email, password);
        form.reset();
        //TO DO use redirect location from requirements !
        ctx.page.redirect('/'); // current home is Dashboard Page
    }

}