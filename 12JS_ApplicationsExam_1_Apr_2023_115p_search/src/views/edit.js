import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { editBook, getBookById } from '../data/services.js';
import  { createSubmitHandler } from '../util.js';



const editTemplate = (book, onSubmit) => html`

       <!-- Edit Page (Only for logged-in users) -->
       <section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
                .value=${book.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
                .value=${book.imageUrl}
              />
              <textarea
                id="fruit-description"
                name="description"
                placeholder="Description"
                .value=${book.description}
                rows="10"
                cols="50"
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                .value=${book.nutrition}
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>

`;



export async function editPage(ctx){
    const bookId = ctx.params.id;
    const book = await getBookById(bookId); 
    //console.log({book});  
    ctx.render(editTemplate(book, createSubmitHandler(onSubmit)));


    async function onSubmit(data) {
        if(Object.values(data).some( (x) => x === "")){
            return alert("All fields are required!");
        }

        await editBook(bookId, data);
        ctx.page.redirect(`/details/${bookId}`);
    }
   
}
