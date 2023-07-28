
const userData = JSON.parse(localStorage.getItem('userData'));// get user session from localStorage

if(userData){
    document.querySelector('.email span').textContent = userData.email;  //<p class="email">Welcome, <span>petar_g@abv.bg</span></p>
    document.getElementById('guest').style.display = 'none'; // hide -->  Login & Register btn

    document.querySelector('#addForm .add').disabled = false; // enable ADD button

} else {
   document.getElementById('user').style.display = 'none'; // hide Logout, no user (guest)
}


document.querySelector('#addForm').addEventListener('submit', async function onSubmit(e){
    e.preventDefault();

    if(!userData){ //  if no user go to login page
        window.location = './login.html';
        return;
    }

    const formData = new FormData(e.target);

    const data = [... formData.entries()].reduce((acc, [key, value]) => Object.assign(acc, {[key]: value}), {});
    //console.log(data); //{angler: 'sadsa', weight: '111', species: 'sasa', location: 'saas', bait: 'sasa', …}

    try {
        if(Object.values(data).some(x => x === '')) {
            throw new Error('All fields must have content! to be not empty!');
       }


       const res = await fetch('http://localhost:3030/data/catches', {
        method: 'POST', // o Method: POST
        headers: {'Content-Type': 'application/json',
                  'X-Authorization': userData.token},
        body: JSON.stringify(data)// o Request body (JSON): {"angler":"…", "weight":…, "species":"…","location":"…", "bait":"…", "captureTime":…}
       });
       
       if(!res.ok){
        let error = await res.json();
        throw new Error(error.message);
       }

       loadData();
       e.target.reset();

    } catch (error) {
        alert(error.message);
    }
})

//load all data
document.querySelector('.load').addEventListener('click', loadData);


//button delegation  delete & update
document.querySelector('#main').addEventListener('click', buttonDelegation)

function buttonDelegation(e){
    const currBtn = e.target.textContent;// get text in the button to know wat it is --> 'delete' or 'update'
    const id = e.target.id === '' ? e.target.dataset.id : e.target.id;
    const currentCatchEL = e.target.parentElement;

    if(currBtn === 'Delete'){
        deleteCatch(id);
    } else if(currBtn === 'Update'){
        updateCatchElement(id, currentCatchEL);
    }
}



async function deleteCatch(id){
    await fetch(`http://localhost:3030/data/catches/${id}`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',
        'X-Authorization': userData.token},     
    });
    loadData();
}


async function updateCatchElement(id, currentCatchEL){
    let [angler, weight, species, location, bait, captureTime] = currentCatchEL.querySelectorAll('input');

    try {
        const res = await fetch(`http://localhost:3030/data/catches/${id}`,{
            method: 'PUT',
            headers: { 'Content-Type': 'application/json',
                       'X-Authorization': userData.token },   
            body: JSON.stringify({
                angler: angler.value,
                weight: weight.value,
                species: species.value,
                location: location.value,
                bait: bait.value,
                captureTime: captureTime.value
            }) 
        });

        if(!res.ok){
            const error = await res.json();
            throw new Error(error.message);
        }
    } catch (error) {
        alert(error.message);

    }

    loadData();
}


async function loadData(e){
    // - List All Catches
    //     o Endpoint - http://localhost:3030/data/catches
    //     o Method: GET

    const res =  await fetch('http://localhost:3030/data/catches');
    const data = await res.json();

    // <div id="catches">
    document.getElementById('catches').replaceChildren(...data.map(createCatch));
};


function createCatch(data){
    let isDisabled = (userData && data._ownerId === userData.id) ? false : true;
    //console.log(userData.id, data._ownerId);

    let catches = createElement('div', {class: 'catch'}, 
    createElement('label', {}, 'Angler'),
    createElement('input', {type: 'text', class: 'angler', value: data.angler, disabled: isDisabled}),
    createElement('label', {}, 'Weight'),
    createElement('input', {type: 'text', class: 'weight', value: data.weight, disabled: isDisabled}),
    createElement('label', {}, 'Species'),
    createElement('input', {type: 'text', class: 'species', value: data.species, disabled: isDisabled}),
    createElement('label', {}, 'Location'),
    createElement('input', {type: 'text', class: 'location', value: data.location, disabled: isDisabled}),
    createElement('label', {}, 'Bait'),
    createElement('input', {type: 'text', class: 'bait', value: data.bait, disabled: isDisabled}),
    createElement('label', {}, 'Capture Time'),
    createElement('input', {type: 'text', class: 'captureTime', value: data.captureTime, disabled: isDisabled}),

    createElement('button', {class: 'update', id: data._id, disabled: isDisabled}, 'Update'),
    createElement('button', {class: 'delete', id: data._id, disabled: isDisabled}, 'Delete'),
    );
    return catches;
}


// helper function to create block of html elements
function createElement(type, attr, ...content){
    const element = document.createElement(type);

    for( let item in attr){
        if(item === 'class'){
            element.classList.add(attr[item]);
        } else if(item === 'disabled'){
            element.disabled = attr[item];
        } else {
            element[item] = attr[item];
        }
    }

    for (let item of content) {
       if(typeof item === 'string' || typeof item === 'number'){
            item = document.createTextNode(item);
       }

       element.appendChild(item);
    }
    return element;
    
}






// logout
document.getElementById('logout').addEventListener('click', async () => {
  await fetch(`http://localhost:3030/users/logout`, {
  headers: {'X-Authorization': userData.token},
  }); 
  localStorage.clear();
  document.getElementById('logout').style.display = 'none';
  document.querySelector('#addForm .add').disabled = true;
  document.getElementById('guest').style.display = 'block';
})

