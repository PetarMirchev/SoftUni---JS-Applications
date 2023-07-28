import { render, html } from '../../node_modules/lit-html/lit-html.js';


export const bookPreview =  (book) => html`

    <div class="fruit">
        <img src="${book.imageUrl}" alt="example1" />
        <h3 class="title">${book.name}</h3>
        <p class="description">${book.description}</p>
        <a class="details-btn" href="/details/${book._id}">More Info</a>
    </div>
`;



{/* <li class="otherBooks">
    <h3>A Court of Thorns and Roses</h3>
    <p>Type: Fiction</p>
    <p class="img"><img src="./images/book1.png"></p>
    <a class="button" href="#">Details</a>
</li> */}
               
               
              
