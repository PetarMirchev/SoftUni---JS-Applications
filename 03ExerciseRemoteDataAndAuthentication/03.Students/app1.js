//let btnSubmit = document.getElementById('submit');
 
// 80/100


async function getStudents(){

    try {
         const res = await fetch(`http://localhost:3030/jsonstore/collections/students`);
        //console.log(await res.json());

        if(!res.ok) { // error occurred!
            const error = await res.json();
            throw new Error(error.message);
        }

        return await res.json();
    } catch (error) {
        alert(error.message);
    }
   
}

async function postStudent(data){
    try {
        const response = await fetch(`http://localhost:3030/jsonstore/collections/students`,   
        { method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(Object.fromEntries(data))
            // firstName - string, non-empty
            // lastName - string, non-empty
            // facultyNumber - string of numbers, non-empty
            // grade - number, non-empty
        })

        if (response.ok == false) {
            const error = await res.json();
            throw new Error(error.message);
        }

        return await response.json();

    } catch (error) {
        alert(error.message);
    }
    
}


function displayStudents(studentsData){
    let table = document.querySelector('#results > tbody');
    table.innerHTML = '';

    // create table whit the data
    Object.values(studentsData).forEach( student => {
        const tr = document.createElement('tr');

            Object.entries(student).forEach(([key, value]) => {
                const td = document.createElement('td');

                if(key !== '_id'){
                    td.innerHTML = value;
                    tr.appendChild(td);
                }
            });
        table.appendChild(tr)    
    })   
}



document.addEventListener('submit', async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    const data = [...formData.entries()]; // get data from fields -->  key: value

    if(validData(data)){
        await postStudent(data);
        displayStudents(await getStudents());

        //clear inputs
        clearInputFieldsFunction([...document.querySelectorAll('#form > div.inputs > input[type=text]')]);
    }
});

// helper function
function clearInputFieldsFunction(array) {
    array.forEach(element => {
        element.value = '';
    });  
}

//helper function check for valid data
function validData(data){
    return data.every(([_, value]) => value !== '');
}
