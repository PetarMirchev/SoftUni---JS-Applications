import {render, html} from './node_modules/lit-html/lit-html.js'
import {cats} from './catSeeder.js';

let allCatsContainer = document.querySelector('#allCats'); //<section id="allCats">

//https://lit.dev/docs/components/events/

let renderTemplate = 
        cats.map( (cat) => html`
            <li>
                <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
                <div class="info">
                    <button class="showBtn" @click="${onClick}" >Show status code</button>
                    <div class="status" style="display: none" id="${cat.id}">
                        <h4>Status Code: ${cat.statusCode}</h4>
                        <p>${cat.statusMessage}</p>
                    </div>
                </div>
            </li>
        `
        );


// render cats -->  (template, DOM element)
render(html`<ul> ${renderTemplate} </ul>`, allCatsContainer);



function onClick(e){
    e.preventDefault()

        const targetElement = e.target.parentNode;
        const status = targetElement.querySelector(".status");
        let buttonShow = targetElement.querySelector(".showBtn");
      
        if (buttonShow.textContent == "Show status code") {
          status.style.display = "block";
          buttonShow.textContent = "Hide status code";
        } else if (buttonShow.textContent == "Hide status code") {
          status.style.display = "none";
          buttonShow.textContent = "Show status code";
        }


    //! not working whit dat code!
    // //target the correct cat cart
    // const cat = e.target.parentNode;
    // const currentDisplayStatus = cat.querySelector('.status').style.display; // --> <div class="status" style="display: none" id="${cat.id}">
    // let buttonShow = targetElement.querySelector(".showBtn");

    // if(currentDisplayStatus === 'block'){ // hide text by click the button
    //     cat.querySelector('.showBtn').textContent = 'Show status bock';
    //     cat.querySelector('.status').style.display = 'none';
    // } else { // element is hide ! (need to show)
    //     cat.querySelector('.showBtn').textContent = 'Hide status bock';
    //     cat.querySelector('.status').style.display = 'block';
    // }
}