import { render, html } from '../../node_modules/lit-html/lit-html.js';


export const bookPreview =  (book) => html`
                <li class="otherBooks">
                     <h3>${book.title}</h3>
                     <p>Type: ${book.type}</p>
                     <p class="img"><img src="${book.imageUrl}"/></p>
                     <a class="button" href="/details/${book._id}">Details</a>
                </li>

`;

{/* <li class="otherBooks">
    <h3>A Court of Thorns and Roses</h3>
    <p>Type: Fiction</p>
    <p class="img"><img src="./images/book1.png"></p>
    <a class="button" href="#">Details</a>
</li> */}
               
               
              
