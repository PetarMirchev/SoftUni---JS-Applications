import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../data/services.js';
import { itemTemplate } from './itemTemplate.js'

//TO DO replace with actual view Home/Dashboard 
const homeTemplate = () => html` 

             <!--Welcome Page-->
        <section class="welcome-content">
            <article class="welcome-content-text">
                <h1>We Care</h1>
                <h1 class="bold-welcome">Your Pets</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
            </article>
            <article class="welcome-content-image">
                <img src="./images/header-dog.png" alt="dog">
            </article>
        </section>
`;

export async function homePage(ctx) {
    //const books = await getAllBooks();
    //console.log(books);
    ctx.render(homeTemplate());
}

//***************************************************************************** */


