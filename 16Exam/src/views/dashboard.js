import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../data/services.js';
import { itemTemplate } from './itemTemplate.js'

//TO DO replace with actual view Dashboard 
const homeTemplate = (items) => html` 
    <!-- Dashboard Page ( for Guests and Users ) -->
      
            <!-- Dashboard page -->
            <h2>Fun Facts</h2>
            ${items.length === 0 ? html`
                <!-- Display an h2 if there are no posts -->
                <h2>No Fun Facts yet.</h2>
            ` : html`
                <section id="dashboard">
                <!-- Display a div with information about every post (if any)-->
                    ${items.map(itemTemplate)}
                </section>
            `} 
`;

export async function dashboardPage(ctx) {
    const items = await getAllBooks();
    ctx.render(homeTemplate(items));
}




