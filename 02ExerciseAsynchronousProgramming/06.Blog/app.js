function attachEvents() {
    let btnLoadPosts = document.getElementById('btnLoadPosts');
    let btnViewPost = document.getElementById('btnViewPost');

    btnLoadPosts.addEventListener('click', loadPosts);
    btnViewPost.addEventListener('click', viewPost)

    const posts = [];

    async function loadPosts() {
        try{
            const url =  'http://localhost:3030/jsonstore/blog/posts';
            let res = await fetch(url);
            
            if(!res.ok) throw new Error();
           
            const data = await res.json();

            //Do not forget to clear its content beforehand.
            document.getElementById('posts').innerHTML = ''; // <select id="posts"></select>


            Object.entries(data).forEach(([key, value]) => {
                const optionElement = document.createElement('option');
                optionElement.value = key;
                optionElement.textContent = value.title;
                document.getElementById('posts').appendChild(optionElement);
                posts.push({title: value.title, body: value.body}); // "title": "Unit Testing And Modules" , "body": "Lorem ipsum, dolor sit amet..."
            });

        } catch(e){
            console.log(e);
        }
    }

    async function viewPost() {
        try{
            const selectElement = document.getElementById('posts');
            const url = 'http://localhost:3030/jsonstore/blog/comments';
            let res = await fetch(url);

            if(!res.ok){
                throw new Error();
            }

            let data = await res.json();
            const comments = Object.values(data).filter(el => el.postId === selectElement.value); // "-MSbypx-13fHPDyzNRtf" --> id": "-MSgySbWEFw3rhCfIIns"
            
            document.getElementById('post-title').textContent = selectElement.selectedOptions[0].textContent;
            const po = posts.filter(p => p.title === selectElement.selectedOptions[0].textContent);
            // console.log(posts);
            // console.log(po);
            // console.log(selectElement.selectedOptions[0].textContent);
            document.getElementById('post-body').innerHTML = `${po[0].body}`;
            document.getElementById('post-comments').innerHTML = '';

            comments.forEach(el => {
                let liElement = document.createElement('li');
                liElement.textContent = el.text;
                document.getElementById('post-comments').appendChild(liElement);
            })
            

        } catch(e){
            console.log(e);
        }
    }
}

attachEvents();