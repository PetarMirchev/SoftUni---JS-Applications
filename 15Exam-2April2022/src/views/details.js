import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getBookById, deleteBook} from '../data/services.js';
//import { getBookById, getLikesByBookId, getMyLikeBookId, deleteBook, likeBook } from '../data/services.js';
import { getUserData } from '../util.js';

//const detailsTemplate = (book, isOwner, onDelete, likes, showLikeButton, onLike) => html`
const detailsTemplate = (book, isOwner, onDelete) => html`


                <!--Details Page-->
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="${book.image}">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${book.name}</h1>
                        <h3>Breed: ${book.breed}</h3>
                        <h4>Age: ${book.age}</h4>
                        <h4>Weight: ${book.weight}</h4>
                        <h4 class="donation">Donation: 0$</h4>
                    </div>
                   
                    ${isOwner ? html`  
                     <!-- if there is no registered user, do not display div-->
                    <div class="actionBtn">
                        <!-- Only for registered user and creator of the pets-->
                        <a href="/edit/${book._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>

                        <!--(Bonus Part) Only for no creator and user-->
                        <a href="#" class="donate">Donate</a>

                     </div>   
                      ` : null }
                   
                </div>
            </div>
        </section>


`;


{/* <h3>Going: <span id="go">${likes}</span> times.</h3>         
<div id="action-buttons">
  ${isOwner ? html`   
    <!--Edit and Delete are only for creator-->
    <a href="/edit/${book._id}" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
  ` : null }

    <!--Bonus - Only for logged-in users ( not authors ) !!!!!!!-->
    ${likeControlsTemplate(showLikeButton, onLike)}
  </div>            
</div> */}



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


/*
const likeControlsTemplate = (showLikeButton, onLike) => {
    if(showLikeButton){
        return html`
            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book )
            <a @click=${onLike} class="button" href="javascript:void(0)">Like</a> -->

              <!--Bonus - Only for logged-in users ( not authors ) !!!!!!!-->
              <a @click=${onLike} href="javascript:void(0)" id="go-btn">Going</a>
        `;
    } else {
        return null;
    }
}
*/

//*************************************************************************** */


export async function detailsPage(ctx){
    const bookId = ctx.params.id;
    const book = await getBookById(bookId);
    const userId = getUserData()?._id; // check for user ID & get ID
    const isOwner = book._ownerId === userId; 
    // const likes = await getLikesByBookId(bookId);
    // const myLikes = await getMyLikeBookId(bookId, userId);
    const showLikeButton = !isOwner && userId; // is visible only when i em not the Owner, noLikes and you ar log
    //const showLikeButton = !isOwner && !myLikes && userId;

    //ctx.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeButton, onLike))
    ctx.render(detailsTemplate(book, isOwner, onDelete, showLikeButton))

  
    async function onDelete(){
        const confirmed = confirm(`Are you sure you want to delete ${book.title}?`);
        if (confirmed) {
            await deleteBook(bookId); 
            ctx.page.redirect("/");
        }
    }

    // async function onLike(){
    //     await likeBook(bookId);
    //     // ctx.page.redirect(`/details/${bookId}`);
    //     document.getElementById('go-btn').style.display = 'none'; // hide 'like' button after click

    //     // rerender to increase +1 count of likes
    //     let bookId1 = ctx.params.id;
    //     let likes1 = await getLikesByBookId(bookId1);
    //     ctx.render(detailsTemplate(book, isOwner, onDelete, likes1, showLikeButton, onLike))
    // }
}



//****************************************************************************************** */




