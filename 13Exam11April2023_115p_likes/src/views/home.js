import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../data/services.js';
import { bookPreview } from './bookTemplate.js'

//TO DO replace with actual view Home/Dashboard 
const homeTemplate = () => html` 

        <!-- Home page -->
        <section id="home">
          <div class="home-intro">
            <h1 class="fancy">Welcome to our community-driven events website! We believe that the best events
              come from the community.</h1>
               
               <p>So why wait? Join our community today and start 
                 discovering and sharing the best events in your area!</p>
                 <a class="event-btn" href="/dashboard">To Events</a>       
          </div>
          <img class="party-img" src="./images/party people.png" alt="event">
        </section>
`;

export async function homePage(ctx) {
    //const books = await getAllBooks();
    //console.log(books);
    ctx.render(homeTemplate());
}
