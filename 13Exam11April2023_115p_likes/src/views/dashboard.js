import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../data/services.js';
import { bookPreview } from './bookTemplate.js'

//TO DO replace with actual view Dashboard 
const homeTemplate = (items) => html` 
    <!-- Dashboard Page ( for Guests and Users ) -->
    

    <!-- Dashboard page -->
    <h2>Current Events</h2>

    ${items.length === 0 ? html`
        <!-- Display an h4 if there are no posts -->
        <h4>No Events yet.</h4>
        ` : html`
            <!-- Display a div with information about every post (if any)-->
            <section id="dashboard">
            ${items.map(bookPreview)}
            </section> 
        `}


`;

export async function dashboardPage(ctx) {
    const items = await getAllBooks();
    //console.log(fruit);
    ctx.render(homeTemplate(items));
}






//  ${fruits.length === 0 ? html`
//  <!-- Display an h2 if there are no posts -->
//  <h2>No fruit info yet.</h2>
// ` : html`
//  <section id="dashboard">
//      <!-- Display ul: with list-items for All books (If any) -->
//      ${fruits.map(bookPreview)}
//  </section>
// `}        