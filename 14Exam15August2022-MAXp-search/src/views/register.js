import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';


//TO DO Replace with actual view
const registerTemplate = (onRegisterSubmit) => html`

<!-- Register Page (Only for Guest users) -->
<section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onRegisterSubmit} class="login-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">login</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>

`;

//! important if fields are not matching on new HTML template --> name="password", name="confirm-pass"....
//  <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password"> --> 
// --> take the key name="confirm-pass" to be used in function onRegister --> ['confirm-pass']: repass -->  
// --> because is not 'repass', but 'confirm-pass' -->  to work logic written down


export function registerPage(ctx){
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));


    // TO DO change user object base on requirements! --> { email, password, ['confirm-pass']: repass }
    async function onRegister( { email, password, ['re-password']: repass }, form) {
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









