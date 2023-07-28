import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';



const loginTemplate = (onLogin) => html`


<!-- Login Page (Only for Guest users) -->
<section id="login">
  <div class="form">
    <h2>Login</h2>
    <form @submit=${onLogin} class="login-form">
      <input type="text" name="email" id="email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <button type="submit">login</button>
      <p class="message">
        Not registered? <a href="/register">Create an account</a>
      </p>
    </form>
  </div>
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


