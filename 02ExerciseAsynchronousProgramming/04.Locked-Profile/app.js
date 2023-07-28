function profileTemplate ({ username, email, age }, id) {
	const wrapper = document.createElement('div')
	const btn = document.createElement('button')
	btn.innerText = 'Show more'

	wrapper.className = 'profile'
	wrapper.innerHTML = `<img src="./iconProfile2.png" class="userIcon">
<label>Lock</label>
<input type="radio" name="user${id}Locked" value="lock" checked="">
<label>Unlock</label>
<input type="radio" name="user${id}Locked" value="unlock"><br>
<hr>
<label>Username</label>
<input type="text" name="user${id}Username" value=${username} disabled="" readonly="">
<div id="user${id}HiddenFields">
<hr>
<label>Email:</label>
<input type="email" name="user${id}Email" value=${email} disabled="" readonly="">
<label>Age:</label>
<input type="email" name="user${id}Age" value=${age} disabled="" readonly="">
</div>`

	btn.addEventListener('click', () => {
		const checked = wrapper.querySelector('input[type=radio]:checked')
		if (checked && checked.value === 'unlock') {
			if (btn.innerText === 'Show more') {
				wrapper.querySelector(`#user${id}HiddenFields`).style.display = 'block'
				btn.innerText = 'Hide it'
			} else {
				wrapper.querySelector(`#user${id}HiddenFields`).style.display = 'none'
				btn.innerText = 'Show more'
			}
		}
	})
	wrapper.appendChild(btn)

	return wrapper
}

async function lockedProfile () {
	const data = await fetch(`http://localhost:3030/jsonstore/advanced/profiles`)
	const des = await data.json()

	const main = document.querySelector('main')
	main.innerHTML = ''

	Object.values(des).forEach((x, i) => main.appendChild(profileTemplate(x, i+1)))
}













// function profileBoxFrame({username, email, age}, id){ 
//     const wrapperContainer = document.createElement('div');
//     const btn = document.createElement('button');
//     btn.innerText = 'Show more';
   

//     wrapperContainer.className = 'profile';
//     wrapperContainer.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
//                                     <label>Lock</label>
//                                     <input type="radio" name="user${id}Locked" value="lock" checked>
//                                     <label>Unlock</label>
//                                     <input type="radio" name="user${id}Locked" value="unlock"><br>
//                                     <hr>
//                                     <label>Username</label>
//                                     <input type="text" name="user${id}Username" value=${username} disabled readonly />
//                                     <div class="user${id}Username">
//                                         <hr>
//                                         <label>Email:</label>
//                                         <input type="email" name="user${id}Email" value=${email} disabled readonly />
//                                         <label>Age:</label>
//                                         <input type="text" name="user${id}Age" value=${age} disabled readonly />
//                                     </div>`;

//     btn.addEventListener("click", function duStaff() {

//         let checked = wrapperContainer.querySelector('input[type=radio]:checked');

//         if(checked && checked.value === 'unlocked') {
//             wrapperContainer.querySelector(`#user${id}HiddenFields`).style.display = 'block';
//             btn.innerText = 'Hide it';
//         } else {
//             wrapperContainer.querySelector(`#user${id}HiddenFields`).style.display = 'none';
//             btn.innerText = 'Show more';
//         }
//     });
//         wrapperContainer.appendChild(btn);

//         return wrapperContainer;
//     };




// async function lockedProfile () {
// 	const data = await fetch(`http://localhost:3030/jsonstore/advanced/profiles`);
// 	const res = await data.json();

// 	const main = document.querySelector('main'); // get the main form 
// 	main.innerHTML = ''  // clear the example to render new data from Fetch

// 	Object.values(res).forEach((x, i) => main.appendChild(profileBoxFrame(x, i+1)));
//     // "fb352199-bcbc-4e1d-a1dc-ed346a6fb49a": {
//     //     "_id": "fb352199-bcbc-4e1d-a1dc-ed346a6fb49a",
//     //     "username": "John",
//     //     "email": "john@users.bg",
//     //     "age": 31
//     //   },
// }