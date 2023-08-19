import { post, get, put, del} from './api.js';

export async function getAllBooks(){
    return get('/data/facts?sortBy=_createdOn%20desc');   
}

export async function createBook(book){ 
    return post('/data/facts', book);   
}

 
export async function editBook(id, book){
    return put(`/data/facts/${id}`, book);
}


export async function getBookById(id){
    return get(`/data/facts/${id}`);
}



//delete book
export async function deleteBook(id){
    return del(`/data/facts/${id}`);
}



//***************************************************************************************** */

//! like logic queries

export async function likeBook(factId){
    return post('/data/likes', {
        factId
    });
    // Method: POST
    // URL: /data/likes
    // { factId }
      
}


//request to get total likes:
export async function getLikesByBookId(factId){
    return get(`/data/likes?where=factId%3D%22${factId}%22&distinct=_ownerId&count`);  
}

export async function getMyLikeBookId(factId, userId){
    return get(`/data/likes?where=factId%3D%22${factId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

//****************************************************************************************************** */