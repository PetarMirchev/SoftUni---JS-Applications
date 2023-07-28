
// 75/100


const submitForm = document.getElementById('submitForm');
const editForm = document.getElementById('editForm');
editForm.style.display = 'none';


const displayBooks = async () => displayBooksBase(await getBooks())

function displayBooksBase (data) {
	const display = document.querySelector('body > table > tbody')
	display.innerHTML = ''

	Object.entries(data)
		.forEach(([id, data]) => {
			const element = createBookElement({ ...data, id })
			display.appendChild(element)
		})
}

submitForm.addEventListener('submit', async (e) => {
	e.preventDefault()
	const formData = getFormData(e.target)

	if (formData.author !== '' && formData.title !== '') {
		await createBook(formData)
		displayBooks()
		clearFields(submitForm)
	} else {
		alert('All fields are required!')
	}
})

editForm.addEventListener('submit', async (e) => {
	e.preventDefault()
	const formData = getFormData(e.target)

	await updateBook(e, formData, submitForm, editForm)
	displayBooks()
})

document.addEventListener('click', e => {

	if (e.target.tagName === 'BUTTON') {
		const bookElement = e.target.parentNode.parentNode
		const actions = {
			loadBooks: displayBooks,
			editBook: () => displayEditForm(bookElement.id, submitForm, editForm),
			deleteBook: async () => {
				await removeBook(bookElement.id)
				bookElement.outerHTML = ''
			},
		}

		try {
			e.target.id ? actions[e.target.id]() : actions[e.target.className]()
		} catch (e) {
			console.log(e)
		}
	}
})


//******************************************************************************************* */

//requests
async function getBooks () {
	const response = await fetch('http://localhost:3030/jsonstore/collections/books')

	return await response.json()
}

async function getBook (id) {
	const book = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`)

	return await book.json()
}

async function postBook (data) {
	const response = await fetch('http://localhost:3030/jsonstore/collections/books', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})

	const result = await response.json();
	return result;
}

async function removeBook (id) {
	const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
		method: 'delete'
	})

	return response.json()
}

async function updateBookRequest (id, data) {
	const ajax = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})

	return await ajax.json()
}


//*************************************************************************************************** */


//helper

function displayForm (form, form1) {
	form.style.display = 'block'
	form1.style.display = 'none'
}

function getFormData (form) {
	const formData = new FormData(form)

	return Object.fromEntries([...formData.entries()])
}

function clearFields (form) {
	[...form.children].filter(x => x.tagName === 'INPUT').map(x => x.value = '')
}

function eFactory (tag, content = ' ', className = '') {
	const e = document.createElement(tag)
	e.innerHTML = content
	e.className = className

	return e
}


//************************************************************************************************* */

//editFunctionality

async function displayEditForm (id, submitForm, editForm) {
	const bookData = await getBook(id)
	const inputs = [...editForm.children].filter(x => x.tagName === 'INPUT')

	displayForm(editForm, submitForm)

	inputs[0].value = bookData.title
	inputs[1].value = bookData.author

	sessionStorage.setItem('editID', id)
}

async function updateBook (e, data, submitForm, editForm) {
	await updateBookRequest(sessionStorage.getItem('editID'), data)
	displayForm(submitForm, editForm)
}


//************************************************************************************************** */

//createFunctionality


function createBookElement ({ author, title, id }) {
	const tr = document.createElement('tr')
	tr.id = id
	const btnTd = document.createElement('td')
	const delBtn = eFactory('button', 'Delete', 'deleteBook')
	const editBtn = eFactory('button', 'Edit', 'editBook')
	const data = [title, author].map(x => eFactory('td', x))

	btnTd.append(editBtn, delBtn)
	tr.append(...data, btnTd)

	return tr
}

async function createBook (formData) {
	if (Object.values(formData).every(x => x !== '')) {
		await postBook(formData)
	}
}