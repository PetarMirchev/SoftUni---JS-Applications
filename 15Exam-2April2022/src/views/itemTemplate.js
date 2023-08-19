import { render, html } from '../../node_modules/lit-html/lit-html.js';


export const itemTemplate =  (item) => html`

        <div class="animals-board">
            <img class="animal-image-cover" src="${item.image}">
              <h2 class="name">${item.name}</h2>
              <h3 class="breed">${item.breed}</h3>
                <div class="action">
                    <a class="btn" href="/details/${item._id}">Details</a>
                </div>
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
  
               
              
