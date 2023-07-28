import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { editBook, getBookById } from '../data/services.js';
import  { createSubmitHandler } from '../util.js';



const editTemplate = (book, onSubmit) => html`

<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
  <div class="form">
    <h2>Edit Event</h2>
    <form @submit=${onSubmit} class="edit-form">
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Event"
        .value=${book.name}
      />
      <input
        type="text"
        name="imageUrl"
        id="event-image"
        placeholder="Event Image"
        .value=${book.imageUrl}
      />
      <input
        type="text"
        name="category"
        id="event-category"
        placeholder="Category"
        .value=${book.category}
      />


      <textarea
        id="event-description"
        name="description"
        placeholder="Description"
        .value=${book.description}
        rows="5"
        cols="50"
      ></textarea>
      
      <label for="date-and-time">Event Time:</label>
      <input
      type="text"
      name="date"
      id="date"
      placeholder="When?"
      .value=${book.date}
    />

      <button type="submit">Edit</button>
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


//***************************************** */


