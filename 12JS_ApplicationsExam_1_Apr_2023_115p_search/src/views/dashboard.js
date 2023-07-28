import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../data/services.js';
import { bookPreview } from './bookTemplate.js'

//TO DO replace with actual view Dashboard 
const homeTemplate = (fruits) => html` 
    <!-- Dashboard Page ( for Guests and Users ) -->
    
    <!-- Dashboard page -->
    <h2>Fruits</h2>
        
          <!-- Display a div with information about every post (if any)-->
        
          ${fruits.length === 0 ? html`
                <!-- Display an h2 if there are no posts -->
                <h2>No fruit info yet.</h2>
            ` : html`
                <section id="dashboard">
                    <!-- Display ul: with list-items for All books (If any) -->
                    ${fruits.map(bookPreview)}
                </section>
            `}        

`;

export async function dashboardPage(ctx) {
    const fruits = await getAllBooks();
    //console.log(fruit);
    ctx.render(homeTemplate(fruits));
}
