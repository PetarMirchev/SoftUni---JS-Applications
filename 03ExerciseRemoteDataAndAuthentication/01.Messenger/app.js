
// 100/100

function attachEvents () {
	const url = 'http://localhost:3030/jsonstore/messenger'

	const clearInputs = (arr) => arr.forEach(x => x.value = '')

	document.getElementById(`submit`).addEventListener('click', async () => {
		const author = document.querySelector('#controls > input[type=text]:nth-child(2)')
		const content = document.querySelector('#controls > input[type=text]:nth-child(5)')
		const rawData = { author: author.value, content: content.value }

		const response = await fetch(url, {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(rawData)
		})

		clearInputs([author, content])

		return response
	})

	document.getElementById('refresh').addEventListener('click', async () => {
		const data = await fetch(url)
		const deserialized = await data.json()

		console.log(deserialized)
		document.getElementById(`messages`).innerHTML =
			Object.values(deserialized).map(x => `${x.author}: ${x.content}`).join('\n')
	})
}

attachEvents()


//*********************************************************************************** */

// 50/100

function attachEvents1() {
    
    document.getElementById('submit').addEventListener('click', addComment);
    document.getElementById('refresh').addEventListener('click', displayAllComments);


    const urlMessage =  'http://localhost:3030/jsonstore/messenger';

    const clearInputs = (arr) => arr.forEach(x => x.value = '')

    async function addComment(){
        let authorName = document.querySelector('[name="author"]');  //<input name="author" type="text">
        let massageText = document.querySelector('[name="content"]'); // <input name="content" type="text">
        // let authorName = document.querySelector('#controls > input[type=text]:nth-child(2)'); //<input name="author" type="text">
        // let massageText = document.querySelector('#controls > input[type=text]:nth-child(5)'); // <input name="content" type="text">
        // console.log(authorName.value);
        // console.log(massageText.value);

        if(!authorName.value || !massageText.value) return; // if fields are empty no post!

        fetch(urlMessage, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                author: authorName.value.trim(),
                content: massageText.value.trim(),
            })
        }).then(res => {
            if(!res.ok) { throw new Error('Error') };
            clearInputs([authorName, massageText]);
            return res.json();
        }).catch( e =>  alert(e.message))
    }

   async function displayAllComments(){
        fetch(urlMessage)
        .then(res => {
            if(!res.ok) { 
                throw new Error('Error'); 
            }
            return res.json();
        })
        .then( (data) => {
            const textArea = document.querySelector('#messages');
            let allComments = [];
            // console.log(Object.values(data));   
            // console.log(Object.entries(data));                     //"author": "Spami", "content": "How are you?
            Object.values(data).forEach(comment => { allComments.push(`${comment.author} :${comment.content}`); });
            
            textArea.value = allComments.join('\n');
        })
        .catch (e => alert(e.massage));
    }

}

//attachEvents1();