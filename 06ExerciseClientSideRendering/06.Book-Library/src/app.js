import { html, render } from "../node_modules/lit-html/lit-html.js";
import { mainTemplate } from "./templates/mainTemplate.js";
import { getAllBooks, deleteBook, getBookById, updateBook, createBook } from "./api.js";
import { tableRowsTemplate } from "./templates/tableRowsTemplate.js";
import {editFormTemplate} from "./templates/formTemplates.js";

const documentBody = document.querySelector("body");
render(mainTemplate(), documentBody);

const loadBooksData = document.getElementById("loadBooks").addEventListener("click", async () => {

  const booksData = await getAllBooks();

  const tableBody = documentBody.querySelector("table tbody");

  const books = [];

  for (const id in booksData) {
    books.push({
      author: booksData[id].author,
      title: booksData[id].title,
      _id: id,
    });
  }

  const context = {
    books,
    deleteHandler,
    updateHandler,
  };

  //pass book & buttons to 'tableRowsTemplate' wear is create new row whit book! --> created in tableBody
  render(tableRowsTemplate(context), tableBody); 
});

//************************************************************************************** */

function deleteHandler(id) {
  deleteBook(id);

  document.getElementById("loadBooks").click();
}


//*************************************************************************************** */


//!update book logic!
async function updateHandler(id) {
  // console.log("updateHandler ...", id);
  // book = request => getBookById(id)
  const bookData = await getBookById(id); //{author: 'J.K.Rowling', title: "Harry Potter and the Philosopher's Stone"}
  //console.log(bookData);

  // display form element (....style.display = 'block')
  document.getElementById('edit-form').style.display = 'block';
 
  // render editFormTemplate(id, book)
  const render1 = document.getElementById('edit-form');
  render(editFormTemplate(id, bookData), render1)

  //hide add book form
  const addFormBooksWindow = document.getElementById('add-form');
  addFormBooksWindow.style.display = 'none';


  const editFormElement = document.querySelector('#edit-form');
  editFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(editFormElement);
    const id = formData.get("id");
    const author = formData.get("author");
    const title = formData.get("title");

    if(!author || !title){
      return alert("Please fill all fields");
    }

    const book = {
      author,
      title,
    };

    updateBook(id, book).then( () => {
      document.getElementById("loadBooks").click();
      editFormElement.reset();
      editFormElement.style.display = 'none';
      addFormBooksWindow.style.display = 'block';
    });

  })

}


//********************************************************************************************** */



//add book logic
  const addFormElement = document.querySelector('#add-form');
  addFormElement.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(addFormElement);
    const author = formData.get("author");
    const title = formData.get("title");

    if(!author || !title){
      return alert("Please fill all fields");
    }

    const book = {
      author,
      title, 
    };

    await createBook(book).then((data) => {
      addFormElement.reset();
      document.getElementById("loadBooks").click();
    });
  });
