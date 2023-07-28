import { render, html } from '../../node_modules/lit-html/lit-html.js';
import  { createSubmitHandler } from '../util.js';
import {createBook} from '../data/services.js';


const createTemplate = (onSubmit) => html`

       <!-- Create Page (Only for logged-in users) -->
<section id="create">
    <div class="form">
        <h2>Add Fruit</h2>
            <form @submit=${onSubmit} class="create-form">
              <input type="text" name="name" id="name" placeholder="Fruit Name"/>
              <input type="text" name="imageUrl" id="Fruit-image" placeholder="Fruit Image"/>
              <textarea id="fruit-description" name="description" placeholder="Description" rows="10" cols="50"></textarea>
              <textarea id="fruit-nutrition" name="nutrition" placeholder="Nutrition" rows="10" cols="50"></textarea>
              <button type="submit">Add Fruit</button>
            </form>
    </div>
</section>

`;



export function createPage(ctx) {
    ctx.render(createTemplate(createSubmitHandler(onSubmit)));

    async function onSubmit(data) { 
        if(Object.values(data).some( (x) => x === "")){ // check if sam field is empty on form!
            return alert("All fields are required!");
        }

        await createBook(data); // create new article in store
        ctx.page.redirect('/dashboard');
    }
}




