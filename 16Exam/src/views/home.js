import { render, html } from '../../node_modules/lit-html/lit-html.js';


//TO DO replace with actual view Home
const homeTemplate = () => html` 

          <!-- Home page -->
          <section id="home">
          <h1>Welcome to our website, where curiosity meets enjoyment!
             Discover fascinating fun facts that engage and entertain everyone,
              inviting you to participate in the joy of learning something new together.</h1>
              <img id="logo-img" src="./images/logo.png" alt=""/>
        </section>
`;

export async function homePage(ctx) {
    ctx.render(homeTemplate());
}



