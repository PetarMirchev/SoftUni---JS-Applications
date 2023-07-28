import { post, get, put, del} from './api.js';

export async function getAllBooks(){ //ok
    return get('/data/fruits?sortBy=_createdOn%20desc');
}

export async function createBook(book){ 
    return post('/data/fruits', book);
    // Method: POST
    // URL: /data/fruits
}

// 
export async function editBook(id, book){
    return put(`/data/fruits/${id}`, book);

    // Method: PUT
    // URL: /data/fruits/:id
    //  {  title,
    //     description,
    //     imageUrl,
    //     type}
}


export async function getBookById(id){ // ok
    return get(`/data/fruits/${id}`);
    // Method: GET
    // URL: /data/fruits/:id
}



//delete book
export async function deleteBook(id){  // ok 
    return del(`/data/fruits/${id}`);
    // Method: DELETE
    // URL: /data/fruits/:id
}


//** ///////////////////////////////////////////////////////////////////////////

export async function searchItem(query){ // search item by some text from user
    return get(`/data/fruits?where=name%20LIKE%20%22${query}%22`);
}