
// 100 / 100


function attachEvents() {
    document.getElementById('submit').addEventListener('click', onSubmit);
}
 
attachEvents();
 
async function getStudents() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/students/');
    const data = await response.json();
 
    return data;
}
 
async function onSubmit(e) {
    e.preventDefault();
 
    const firstName = document.getElementsByTagName('input')[0].value; //<input type="text" name="firstName" placeholder="First Name...">
    const lastName = document.getElementsByTagName('input')[1].value; //<input type="text" name="lastName" placeholder="Last Name...">
    const facultyNumber = document.getElementsByTagName('input')[2].value; //<input type="text" name="facultyNumber" placeholder="Faculty Number...">
    const grade = document.getElementsByTagName('input')[3].value; // <input type="text" name="grade"  placeholder="Grade...">

	//debugger
    const body = {
        firstName: firstName,
        lastName: lastName,
        facultyNumber: facultyNumber,
        grade: grade,
    }
 
    if (!firstName && !lastName && !facultyNumber && !grade) {
        alert('All fields are required!');
        throw new Error('All fields are required!');
    }
 
    const response = await fetch('http://localhost:3030/jsonstore/collections/students/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    })
 
    document.querySelector('#results > tbody').replaceChildren(render());//<table id="results"> -->  <tbody> xx </tbody>
}
 
async function render() {
    const data = await getStudents();
    
    const tbody = document.querySelector('#results > tbody'); //<table id="results"> -->  <tbody> xx </tbody>
 
    Object.values(data).forEach(x => {
        const { firstName, lastName, facultyNumber, grade } = x;
 
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = firstName;
        const td2 = document.createElement('td');
        td2.textContent = lastName;
        const td3 = document.createElement('td');
        td3.textContent = facultyNumber;
        const td4 = document.createElement('td');
        td4.textContent = grade;
 
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
 
        tbody.appendChild(tr);
    });
}
 
render()