import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../data/services.js';
import { itemTemplate } from './itemTemplate.js'

//TO DO replace with actual view Dashboard 
const homeTemplate = (items) => html` 
    <!-- Dashboard Page ( for Guests and Users ) -->
      
<!-- Dashboard page -->
<section id="dashboard">
    <h2>Collectibles</h2>
        
    ${items.length === 0 ? html`
        <!-- Display an h2 if there are no posts -->
        <h2>There are no items added yet.</h2>
          ` : html`
        <ul class="card-wrapper">
            <!-- Display a li with information about every post (if any)-->
            ${items.map(itemTemplate)}
        </ul>
    `} 
</section>

            

`;

export async function dashboardPage(ctx) {
    const items = await getAllBooks();
    //console.log(fruit);
    ctx.render(homeTemplate(items));
}

//********************************************************************************* */

//  ${fruits.length === 0 ? html`
//  <!-- Display an h2 if there are no posts -->
//  <h2>No fruit info yet.</h2>
// ` : html`
//  <section id="dashboard">
//      <!-- Display ul: with list-items for All books (If any) -->
//      ${fruits.map(bookPreview)}
//  </section>
// `}        


