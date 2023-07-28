import { render, html } from '../../node_modules/lit-html/lit-html.js';


export const bookPreview =  (item) => html`

        <div class="event">
            <img src="${item.imageUrl}" alt="example1" />
            <p class="title">
                ${item.name}
            </p>
            <p class="date">${item.date}</p>
            <a class="details-btn" href="/details/${item._id}">Details</a>
        </div>
`;


//**************************************************** */
{/* <li class="otherBooks">
    <h3>A Court of Thorns and Roses</h3>
    <p>Type: Fiction</p>
    <p class="img"><img src="./images/book1.png"></p>
    <a class="button" href="#">Details</a>
</li> */}
//************************************************* */

{/* <div class="fruit">
    <img src="${item.imageUrl}" alt="example1" />
    <h3 class="title">${item.name}</h3>
    <p class="description">${item.description}</p>
    <a class="details-btn" href="/details/${item._id}">More Info</a>
</div> */}





// {
//     name,
//     imageUrl, 
//     category, 
//     description, 
//     date
//   } 
  
               
              
