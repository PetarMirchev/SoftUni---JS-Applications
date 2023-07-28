import { post, get, put, del} from './api.js';

export async function getAllBooks(){ //ok
    return get('/data/events?sortBy=_createdOn%20desc');
}

export async function createBook(book){ 
    return post('/data/events', book);
    // Method: POST
    // URL: /data/fruits
}

// 
export async function editBook(id, book){
    return put(`/data/events/${id}`, book);

    // Method: PUT
    // URL: /data/fruits/:id
    //  {  title,
    //     description,
    //     imageUrl,
    //     type}
}


export async function getBookById(id){ // ok
    return get(`/data/events/${id}`);
    // Method: GET
    // URL: /data/fruits/:id
}



//delete book
export async function deleteBook(id){  // ok 
    return del(`/data/events/${id}`);
    // Method: DELETE
    // URL: /data/fruits/:id
}


//** ////////////////////////////////////////////////////////////////////////**********************///

// export async function searchItem(query){ // search item by some text from user
//     return get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
// }


//***************************************************************************************** */

//! like logic queries

export async function likeBook(eventId){
    return post('/data/going', {
        eventId
    });
    // Method: POST
    // URL: /data/likes
    // { bookId }
      
}

//request to get total going count for a event:
export async function getLikesByBookId(bookId){
    return get(`/data/going?where=eventId%3D%22${bookId}%22&distinct=_ownerId&count`); 
    // Method: GET
    // URL: /data/likes?where=bookId%3D%22{bookId}%22&distinct=_ownerId&count

}

export async function getMyLikeBookId(bookId, userId){
    return get(`/data/going?where=eventId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);  
    // Method: GET
    // URL:/data/likes?where=bookId%3D%22{bookId}%22%20and%20_ownerId%3D%22{userId}%22&count
}

//****************************************************************************************************** */