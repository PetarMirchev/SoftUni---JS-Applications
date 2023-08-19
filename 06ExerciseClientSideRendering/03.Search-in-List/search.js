import {html, render} from './node_modules/lit-html/lit-html.js';
import {towns} from './towns.js';


let townsDiv = document.getElementById('towns');

{/* <ul>
   <li>Pleven</li>
   <li>Plovdiv</li>
   <li>Gorna Bania</li>
</ul>  */}

let townsRenderComponent = html`
   <ul>
      ${towns.map( (town) => html`<li id="${town}">${town}</li>`)}
   </ul>
`;

render(townsRenderComponent, townsDiv);



document.querySelector('button').addEventListener('click', () =>{

   let inputUser = document.getElementById('searchText').value;


   let filterResult = towns.filter( (town) => {
      if (town.includes(inputUser)){ 
         let match = document.getElementById(town); //<li id="${town}">${town}</li>
         match.setAttribute('class', 'active');
         return town;
      }
   });

   let resultElement = document.getElementById('result');

   resultElement.textContent = `${filterResult.length} matches found`;
});
