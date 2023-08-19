import {html, render} from './node_modules/lit-html/lit-html.js';


window.onload = async (event) => {// console.log("page is fully loaded");
   
   async function fetchData(){
      const url = `http://localhost:3030/jsonstore/advanced/table`
      const res = await fetch(url);
      const data = res.json();
      return data;
   }

//******************************************************************************************************** */


   const tableBody = document.querySelector('.container tbody'); // <table class="container">  --> <tbody>
   const studentsData = await fetchData();
   // console.log(items);

   const rowTemplate = (student) => html`
      <tr>                            
         <td>${student.firstName} ${student.lastName}</td>
         <td>${student.email}</td>
         <td>${student.course}</td>  
      </tr>  
   `;
            {/* <tr>
               <td>John Dan</td>
               <td>john@john-dan.com</td>
               <td>JS-CORE</td>
            </tr> */}

   const studentsTemplateTable = (studentsData) => html` ${studentsData.map( (student) => rowTemplate(student))} `;

   const resultBox =  studentsTemplateTable(Object.values(studentsData));        
   render(resultBox, tableBody); 
 };


//***************************************************************************************************** */

//! -->  search logic
document.querySelector('#searchBtn').addEventListener('click', onSearch);

function onSearch() { 
   const inputText = document.getElementById('searchField'); // <input type="text" id="searchField" />   
   
   const searchCriteria = inputText.value; // 'JS-CORE'

   //collect all generated Rows and data in them
   const tableRows = document.querySelector('.container tbody').children;

   //loop true all rows and check for matching from input text area
   for(const row of tableRows){ 
      row.classList.remove("select"); // set by default to be not active --> clear previous search

      if(row.textContent.toLocaleLowerCase().includes(searchCriteria.toLocaleLowerCase())){
         row.classList.add("select");
      }
   }

   inputText.value = '';
}   

