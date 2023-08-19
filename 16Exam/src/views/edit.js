import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { editBook, getBookById } from '../data/services.js';


const editTemplate = (book, onSubmit) => html`

        <!-- Edit Page (Only for logged-in users) -->
        <section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            <form @submit=${onSubmit} class="edit-form">
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              .value=${book.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              .value=${book.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            .value=${book.description}
            rows="10"
            cols="50"
          ></textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            .value=${book.moreInfo}
            rows="10"
            cols="50"
          ></textarea>
              <button type="submit">Post</button>
            </form>
          </div>
        </section>

`;


export async function editPage(ctx){
  const itemId = ctx.params.id;
  const item = await getBookById(itemId); 
  ctx.render(editTemplate(item, onSubmit));


    async function onSubmit(e) {
      e.preventDefault();
  
      const formData = new FormData(e.target);
  
      const category = formData.get('category');
      const imageUrl = formData.get('image-url');
      const description = formData.get('description');
      const moreInfo = formData.get('additional-info');
  
      try {
        if (imageUrl == '' || category == '' || description == '' || moreInfo == '') {
          throw new Error('All fields are required');
        }

        await editBook(itemId, { category, imageUrl, description, moreInfo });
        ctx.page.redirect(`/details/${itemId}`);

      } catch (error) {
        alert(error.message);
      }
    }    
}
