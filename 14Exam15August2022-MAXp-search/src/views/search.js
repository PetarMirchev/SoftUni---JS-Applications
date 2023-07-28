import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import { searchItem } from '../data/services.js';
import { getUserData } from '../util.js';


const searchTemplate = (userData, item, onSearch) => html` 


        <!-- Search Page (Only for logged-in users) -->
        <section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf" @submit=${onSearch}>
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3>
          ${item != undefined ? html `
            <div id="search-container">     
                        ${item.length === 0 
                            ? html` <h2>There are no results found.</h2>` 
                            : html`<ul class="card-wrapper">
                                ${item.map( (item1) => itemCardTemplate(userData, item1))}
                            </ul>`}
            </div>
          `: ''}
        </section>


`;


//******************************************************************************* */

const itemCardTemplate = (userData, item) => html`
<li class="card">
    <img src=${item.imageUrl} alt="travis" />
    <p><strong>Brand: </strong><span class="brand">${item.brand}</span></p>
    <p><strong>Model: </strong><span class="model">${item.model}</span></p>
    <p><strong>Value:</strong><span class="value">${item.value}</span>$</p>
    ${userData ? html`
        <a class="details-btn" href="/details/${item._id}">Details</a>` 
    : null}
</li>
`;



//************************************************************************************ */


export async function searchPage(ctx) {
    // render empty page from search results
    let items = undefined;
    const userData = getUserData(); // register user or undefined ?
    ctx.render(searchTemplate(userData, items, createSubmitHandler(onSearch)));

    async function onSearch({search}) {
        if (search == '') { 
            return alert('Enter search parameter!');
        }

        items = await searchItem(search);
        ctx.render(searchTemplate(userData, items, createSubmitHandler(onSearch)));
    }    
   
}


