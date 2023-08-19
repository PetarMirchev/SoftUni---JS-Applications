import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { getBookById, getLikesByBookId, getMyLikeBookId, deleteBook, likeBook } from '../data/services.js';
import { getUserData } from '../util.js';



const detailsTemplate = (book, isOwner, onDelete, likes, showLikeButton, onLike) => html`

        <!-- Details page -->
        <section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${book.imageUrl}" alt="example1" />
            <p id="details-category">${book.category}</p>
              <div id="info-wrapper">
                <div id="details-description">
                    <p id="description">${book.description}</p>
                    <p id ="more-info">${book.moreInfo}</p>
                </div>

                <h3>Likes:<span id="likes">${likes}</span></h3>
                  <div id="action-buttons">
                  ${isOwner ? html`  
                    <!--Edit and Delete are only for creator-->   
                      <a href="/edit/${book._id}" id="edit-btn">Edit</a>
                      <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>                         
                  ` : null }

                    <!--Bonus - Only for logged-in users ( not authors )-->
                    ${likeControlsTemplate(showLikeButton, onLike)}
                  </div>
              </div>
          </div>
        </section>


`;


const likeControlsTemplate = (showLikeButton, onLike) => {
    if(showLikeButton){
        return html`
              <!--Bonus - Only for logged-in users ( not authors )-->
              <a @click=${onLike} href="javascript:void(0)" id="like-btn">Like</a>  
        `;
        
    } else {
        return null;
    }
}


//*************************************************************************** */


export async function detailsPage(ctx){
    const itemId = ctx.params.id;
    const book = await getBookById(itemId);
    const userId = getUserData()?._id; // check for user ID & get ID
    const isOwner = book._ownerId === userId; 
    const likes = await getLikesByBookId(itemId);
    const myLikes = await getMyLikeBookId(itemId, userId);
    const showLikeButton = !isOwner && !myLikes && userId;// is visible only when i em not the Owner, noLikes and you ar log

    ctx.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeButton, onLike))
   
    async function onDelete(){
        const confirmed = confirm(`Are you sure you want to delete ${book.title}?`);
        if (confirmed) {
            await deleteBook(itemId); 
            ctx.page.redirect("/dashboard");
        }
    }

    async function onLike(){ 

        const element = document.getElementById("like-btn");
        element.remove();
        //document.getElementById('like-btn').style.display = 'none'; // hide 'like' button after click
        await likeBook(itemId);

        // rerender to increase +1 count of likes
        let likeId1 = ctx.params.id;
        let likes1 = await getLikesByBookId(likeId1);
        ctx.render(detailsTemplate(book, isOwner, onDelete, likes1, showLikeButton, onLike))
    }
}



