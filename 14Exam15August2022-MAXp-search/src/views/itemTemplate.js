import { render, html } from '../../node_modules/lit-html/lit-html.js';


export const itemTemplate =  (item) => html`

        <li class="card">
              <img src="${item.imageUrl}" alt="travis" />
              <p>
                <strong>Brand: </strong><span class="brand">${item.brand}</span>
              </p>
              <p>
                <strong>Model: </strong><span class="model">${item.model}</span>
              </p>
              <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
              <a class="details-btn" href="/details/${item._id}">Details</a>
        </li>
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
  
               
              
