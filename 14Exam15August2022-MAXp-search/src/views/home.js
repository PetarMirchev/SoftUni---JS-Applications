import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../data/services.js';
import { itemTemplate } from './itemTemplate.js'

//TO DO replace with actual view Home/Dashboard 
const homeTemplate = () => html` 

       <!-- Home page -->
       <section id="home">
          <h1>Welcome to Sole Mates</h1>
          <img src="./images/home.jpg" alt="home" />
          <h2>Browse through the shoe collectibles of our users</h2>
          <h3>Add or manage your items</h3>
        </section>
`;

export async function homePage(ctx) {
    //const books = await getAllBooks();
    //console.log(books);
    ctx.render(homeTemplate());
}

//***************************************************************************** */


