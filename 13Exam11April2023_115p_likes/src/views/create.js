import { render, html } from '../../node_modules/lit-html/lit-html.js';
import  { createSubmitHandler } from '../util.js';
import {createBook} from '../data/services.js';


const createTemplate = (onSubmit) => html`

<!-- Create Page (Only for logged-in users) -->
<section id="create">
  <div class="form">
    <h2>Add Event</h2>
    <form @submit=${onSubmit} class="create-form">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Event"
      />
      <input
        type="text"
        name="imageUrl"
        id="event-image"
        placeholder="Event Image URL"
      />
      <input
        type="text"
        name="category"
        id="event-category"
        placeholder="Category"
      />


      <textarea
        id="event-description"
        name="description"
        placeholder="Description"
        rows="5"
        cols="50"
      ></textarea>
      
      <input
      type="text"
      name="date"
      id="date"
      placeholder="When?"
    />

      <button type="submit">Add</button>
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






