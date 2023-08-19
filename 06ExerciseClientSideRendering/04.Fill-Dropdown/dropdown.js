import {html, render} from './node_modules/lit-html/lit-html.js';



async function getAllData() {
    const res = await fetch(`http://localhost:3030/jsonstore/advanced/dropdown`);
    const data =  await res.json();
    return data;
}

// standard whe have object of objects as response --> change to array of objects
const items = Object.values(await getAllData());
// console.log(items);

const itemTemplate = html`
    ${items.map( (item) => html`<option value="${item._id}">${item.text}</option>`)}
`;

const menuSection = document.getElementById('menu');

render(itemTemplate, menuSection)



// logic to add more items in the dropdown menu
document.querySelector('input[type="submit"]').addEventListener('click', addItem)// <input type="submit" value="Add">

async function addItem(e) {
    e.preventDefault();
  const text = document.getElementById('itemText').value; //<input type="text" id="itemText" />

  const response = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text})
  });

  

  if(response.ok){
    // let newItemReturn = await response.json(); // take return element back from server response & add to list to see user
    // const newItemAddTemplate = html`<option value="${newItemReturn._id}">${newItemReturn.text}</option>`

    //rerender all data in box from server after new Item is added
    async function getAllData1() {
        const res = await fetch(`http://localhost:3030/jsonstore/advanced/dropdown`);
        const data =  await res.json();
        return data;
    }
    
    // standard whe have object of objects as response --> change to array of objects
    const items = Object.values(await getAllData1());  
    const itemTemplate = html`
        ${items.map( (item) => html`<option value="${item._id}">${item.text}</option>`)}
    `;
    const menuSection = document.getElementById('menu');
    
    render(itemTemplate, menuSection)

    document.getElementById('itemText').value = '';

  } else{
    alert('Error');
  }
}