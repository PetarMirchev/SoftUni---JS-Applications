import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { editBook, getBookById } from '../data/services.js';
import  { createSubmitHandler } from '../util.js';



const editTemplate = (book, onSubmit) => html`


<!-- Edit Page (Only for logged-in users) -->
<section id="edit">
  <div class="form">
    <h2>Edit item</h2>
    <form @submit=${onSubmit} class="edit-form">
      <input
        type="text"
        name="brand"
        id="shoe-brand"
        placeholder="Brand"
        .value=${book.brand}
      />
      <input
        type="text"
        name="model"
        id="shoe-model"
        placeholder="Model"
        .value=${book.model}
      />
      <input
        type="text"
        name="imageUrl"
        id="shoe-img"
        placeholder="Image url"
        .value=${book.imageUrl}
      />
      <input
        type="text"
        name="release"
        id="shoe-release"
        placeholder="Release date"
        .value=${book.release}
      />
      <input
        type="text"
        name="designer"
        id="shoe-designer"
        placeholder="Designer"
        .value=${book.designer}
      />
      <input
        type="text"
        name="value"
        id="shoe-value"
        placeholder="Value"
        .value=${book.value}
      />

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


//***************************************** */


