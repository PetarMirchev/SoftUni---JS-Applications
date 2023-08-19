import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { editBook, getBookById } from '../data/services.js';
import  { createSubmitHandler } from '../util.js';



const editTemplate = (book, onSubmit) => html`

        <!--Edit Page-->
        <section id="editPage">
            <form @submit=${onSubmit} class="editForm">
                <img src="${book.image}">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" value="Max" .value=${book.name} >
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" value="Shiba Inu" .value=${book.breed}>
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" value="2 years" .value=${book.age} >
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" value="5kg" .value=${book.weight} >
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" .value="${book.image}">
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
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


