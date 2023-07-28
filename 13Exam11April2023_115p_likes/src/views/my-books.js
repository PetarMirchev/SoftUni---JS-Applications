import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { bookPreview } from './bookTemplate.js';
import { getUserData } from '../util.js';
import { getMyBooks } from '../data/services.js';


const myBooksTemplate = (books) => html`

        <!-- My Books Page ( Only for logged-in users ) -->
        <section id="my-books-page" class="my-books">
            <h1>My Books</h1>          
            ${ books.length === 0 ? html`
                <!-- Display paragraph: If the user doesn't have his own books  -->
                <p class="no-books">No books in database!</p>
            ` : html`
                <!-- Display ul: with list-items for every user's books (if any) -->
                <ul class="my-books-list">
                    ${books.map(bookPreview)}
                </ul>
            `}      
        </section>

`;


export async function myBooksPage(ctx){
    const userData = getUserData();
    const myBooks = await getMyBooks(userData._id); //_id: "48425b18-0f9f-406a-b61e-5eaa42ba89aa"
    ctx.render(myBooksTemplate(myBooks));
}


// <ul class="my-books-list">
// <li class="otherBooks">
//     <h3>Outlander</h3>
//     <p>Type: Other</p>
//     <p class="img"><img src="/images/book2.png"></p>
//     <a class="button" href="#">Details</a>
// </li>
// <li class="otherBooks">
//     <h3>A Court of Thorns and Roses</h3>
//     <p>Type: Fiction</p>
//     <p class="img"><img src="/images/book1.png"></p>
//     <a class="button" href="#">Details</a>
// </li>
// </ul>