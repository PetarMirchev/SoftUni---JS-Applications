import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getBookById, deleteBook } from '../data/services.js';
import { getUserData } from '../util.js';


const detailsTemplate = (book, isOwner, onDelete, showLikeButton, onLike) => html`

        <!-- Details page -->
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${book.imageUrl}" alt="example1" />
            <p id="details-title">${book.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                    <p>${book.description}</p>
                        <p id="nutrition">Nutrition</p>
                        <p id = "details-nutrition">
                            ${book.nutrition}
                        </p>
              </div>

              ${isOwner ? html`
                    <!--Edit and Delete are only for creator-->
                    <div id="action-buttons">
                        <a href="/edit/${book._id}" id="edit-btn">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                    </div>
              ` : null }
              
            </div>
        </div>
      </section>

`;



//*********************      **** **********        ******** */

//function for controlling visualizations of the buttons & likes
// const bookControlsTemplate = (book, isOwner, onDelete) => {
//     if (isOwner) {
//         return html`
//             <!-- Edit/Delete buttons ( Only for creator of this book )  -->
//             <a class="button" href="/edit/${book._id}">Edit</a>
//             <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
//         `;
//     } else {
//        return null; 
//     }
// };


// const likeControlsTemplate = (showLikeButton, onLike) => {
//     if(showLikeButton){
//         return html`
//             <!-- Bonus -->
//             <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
//             <a @click=${onLike} class="button" href="javascript:void(0)">Like</a>
//         `;
//     } else {
//         return null;
//     }
// }


//*************************************************************************** */


export async function detailsPage(ctx){
    const bookId = ctx.params.id;
    const book = await getBookById(bookId);
    const userId = getUserData()?._id; // check for user ID & get ID
    const isOwner = book._ownerId === userId; 
    // const likes = await getLikesByBookId(bookId);
    // const myLikes = await getMyLikeBookId(bookId, userId);
    const showLikeButton = !isOwner && userId; // is visible only when i em not the Owner, noLikes and you ar log

    ctx.render(detailsTemplate(book, isOwner, onDelete, showLikeButton, onLike))

    //console.log(book, userId, isOwner);
    async function onDelete(){
        const confirmed = confirm(`Are you sure you want to delete ${book.title}?`);
        if (confirmed) {
            await deleteBook(bookId); 
            ctx.page.redirect("/");
        }
    }

    async function onLike(){
        await likeBook(bookId);
        ctx.page.redirect(`/details/${bookId}`);
    }
}



//****************************************************************************************** */


// <!-- Details Page ( for Guests and Users ) -->
// <section id="details-page" class="details">
//     <div class="book-information">
//         <h3>${book.title}</h3>
//         <p class="type">Type: ${book.type}</p>
//         <p class="img"><img src="${book.imageUrl}"></p>
//         <div class="actions">

//             <!-- Edit/Delete buttons ( Only for creator of this book )  -->
//             ${bookControlsTemplate(book, isOwner, onDelete)}

//             <!-- Bonus -->
//             <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
//             ${likeControlsTemplate(showLikeButton, onLike)}

//             <!-- ( for Guests and Users )  -->
//             <div class="likes">
//                 <img class="hearts" src="/images/heart.png">
//                 <span id="total-likes">${likes}</span>
//             </div>
//             <!-- Bonus -->
//         </div>
//     </div>
//     <div class="book-description">
//         <h3>Description:</h3>
//         <p>${book.description}</p>
//     </div>
// </section>