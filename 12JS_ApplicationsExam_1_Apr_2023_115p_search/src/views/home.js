import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../data/services.js';
import { bookPreview } from './bookTemplate.js'

//TO DO replace with actual view Home/Dashboard 
const homeTemplate = () => html` 
        <!-- Home page -->
        <section id="home">
          <h1>Learn more about your favorite fruits</h1>
          <img
            src="/images/pexels-pixabay-161559-dImkWBDHz-transformed (1).png"
            alt="home"
          />

        </section>
`;

export async function homePage(ctx) {
    //const books = await getAllBooks();
    //console.log(books);
    ctx.render(homeTemplate());
}
