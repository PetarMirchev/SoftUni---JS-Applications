import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import { searchItem } from '../data/services.js';


const searchTemplate = (fruits, onSearch) => html` 

       <!-- Search page -->
    <section id="search">
        <div class="form">
            <h2>Search</h2>
                <form class="search-form">
                    <input type="text" name="search" id="search-input"/>
                    <button @click=${onSearch} class="button-list">Search</button>
                </form>
        </div>

        <h4>Results:</h4>

        ${fruits != undefined ? html `
        <div class="search-result">
        ${
          fruits.length == 0 ? html` <p class="no-result">No result.</p>` 
            : fruits.map( (fruit) => html`
                <div class="fruit">
                    <img src="${fruit.imageUrl}" alt="example1" />
                    <h3 class="title">${fruit.name}</h3>
                    <p>"${fruit.description}"</p>
                    <a class="details-btn" href="/details/${fruit._id}">More Info</a>
                </div>`)
        }
        </div> `: ''}

      
</section>

`;


//******************************************************************************* */


export async function searchPage(ctx) {
    // render empty page from search results
    let fruits = undefined;
    ctx.render(searchTemplate(fruits, onSearch));

    async function onSearch(e) {
        e.preventDefault();
        const search = document.querySelector('#search-input').value; // <input type="text" name="search" id="search-input"/>
        if (search == '') { 
            return alert('All fields are required!');
        }

        fruits = await searchItem(search);
        ctx.render(searchTemplate(fruits, onSearch));
    }    
   
}


