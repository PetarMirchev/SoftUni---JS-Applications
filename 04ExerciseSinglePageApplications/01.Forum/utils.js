export function createElements(type, content, parent, attributes){//createElements('div', '', divElement, {'class': 'nick-name'});
    
    let element = document.createElement(type);
    element.textContent = content;
    
    if (parent) {
      parent.appendChild(element);
    }
  
    for (const attribute of Object.keys(attributes)) {
      element.setAttribute(attribute, attributes[attribute]);
    }
    
    return element;
  }
  


// <!-- Post structure example in the Home view -->

// <div class="topic-container">
//     <div class="topic-name-wrapper">
//         <div class="topic-name">
//             <a href="#" class="normal">
//                 <h2>Angular 10</h2>
//             </a>
//             <div class="columns">
//                 <div>
//                     <p>Date: <time>2020-10-10T12:08:28.451Z</time></p>
//                     <div class="nick-name">
//                         <p>Username: <span>David</span></p>
//                     </div>
//                 </div>


//             </div>
//         </div>
//     </div>
// </div>