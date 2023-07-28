async function solution() {
    const content = document.getElementById('main'); //<section id="main">
    const dataPosts = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    const res = await dataPosts.json();
    // {
    //     "_id": "ee9823ab-c3e8-4a14-b998-8c22ec246bd3",
    // "title": "Scalable Vector Graphics"
    // }

    //console.log(res);
    res.forEach(x => content.appendChild(functionTemplateElement(x)));
}




function functionTemplateElement({_id, title}){

    let wrapper = document.createElement('div');
    wrapper.className = 'accordion';
    let headDiv = document.createElement('div');
    headDiv.className = "head";
    
    let titleSpan = document.createElement('span');
    titleSpan.textContent = title;

    let btn = document.createElement('button');
    btn.className = "button";
    btn.textContent = 'More';
    btn.id = _id;

    let extraDiv = document.createElement('div');
    extraDiv.className = "extra";
	extraDiv.style.display = 'none';

    let pContent = document.createElement('p');

    headDiv.appendChild(titleSpan);
    headDiv.appendChild(btn);
    
    extraDiv.appendChild(pContent);

    wrapper.appendChild(headDiv);
    wrapper.appendChild(extraDiv);

    // <!-- <div class="accordion">
    //         <div class="head">
    //             <span>Scalable Vector Graphics</span>
    //             <button class="button" id="ee9823ab-c3e8-4a14-b998-8c22ec246bd3">More</button>
    //         </div>
    //         <div class="extra">
    //             <p>Scalable Vector Graphics .....</p>
    //         </div>
    //     </div> -->

    //-------------------------------------------------------------------------------------------------

    // show & hide extra info from 'content' on selected element
    btn.addEventListener('click', async function x(){
        if(extraDiv.style.display == 'none'){ // show text
            const data1 = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${_id}`);
            const resData = await data1.json();
            btn.textContent = 'Less';
            extraDiv.style.display = 'block';
            pContent.textContent = resData.content; //content": "Scalable Vector Graphics (SVG)....
        } 
            else { // hide text 
                btn.textContent = 'More';
                extraDiv.style.display = 'none';
            }
    });


    return wrapper;
}
// attach retrieved data into dom content on loading
document.addEventListener('DOMContentLoaded', solution);


/* 
! creating tag elements whit function !

function eFactory (tag, className = '', content = '') {
	const e = document.createElement(tag);
	e.className = className;
	e.textContent = content;

	return e;
}

function template ({ _id, title }) {
	const wrapper = eFactory('div', 'accordion')
	const headDiv = eFactory('div', 'head')
	const titleSpan = eFactory('span', '', title)
	const btn = eFactory('button', 'button', 'More')
	const extraDiv = eFactory('div', 'extra')
	extraDiv.style.display = 'none'
	const contentParagraph = eFactory('p')
	btn.id = _id

	headDiv.append(titleSpan, btn)
	extraDiv.appendChild(contentParagraph)
	wrapper.append(headDiv, extraDiv)
                                            */  