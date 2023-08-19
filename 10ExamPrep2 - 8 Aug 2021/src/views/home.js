import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getAllBooks } from '../data/services.js';
import { bookPreview } from './bookTemplate.js'

//TO DO replace with actual view Home/Dashboard 
const homeTemplate = (books) => html` 
    <!-- Dashboard Page ( for Guests and Users ) -->
    <section id="dashboard-page" class="dashboard">
            <h1>Dashboard</h1>
            ${books.length === 0 ? html`
                <!-- Display paragraph: If there are no books in the database -->
                <p class="no-books">No books in database!</p>
            ` : html`
                <ul class="other-books-list">
                    <!-- Display ul: with list-items for All books (If any) -->
                    ${books.map(bookPreview)}
                </ul>
            `}        
    </section>
`;

export async function homePage(ctx) {
    const books = await getAllBooks();
    //console.log(books);
    ctx.render(homeTemplate(books));
}