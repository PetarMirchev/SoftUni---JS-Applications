import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';



const loginTemplate = (onLogin) => html`

        <!--Login Page-->
        <section id="loginPage">
            <form @submit=${onLogin} class="loginForm">
                <img src="./images/logo.png" alt="logo" />
                <h2>Login</h2>

                <div>
                    <label for="email">Email:</label>
                    <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
                </div>

                <div>
                    <label for="password">Password:</label>
                    <input id="password" name="password" type="password" placeholder="********" value="">
                </div>

                <button class="btn" type="submit">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </form>
        </section>


`;


export function loginPage(ctx){
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    // TO DO change user object based on requirements
    async function onLogin( { email, password }, form) {
        if (email == '' || password == '') {
          return alert('All fields are required!');
        }

        await login(email, password);
        form.reset();
        //TO DO use redirect location from requirements !
        ctx.page.redirect('/');
    }
}



