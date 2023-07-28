async function getInfo() {
    let stopIdField = document.getElementById("stopId");
    let stopID = stopIdField.value;
    let bussesListElement = document.getElementById("buses");
    // clear content when call function again (to prevent stack new on top of old data)
    bussesListElement.innerHTML = '';


    try{
        const responses = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopID}`);
            if(!responses.ok){ // in status is not OK!  -->  create Error & put info about the error
                let error = new Error();
                error.status = responses.status;
                error.statusText = responses.statusText;
                throw error;
            }

        const data = await responses.json();    
        console.log(data);

        document.getElementById("stopName").textContent = data.name;
        Object.entries(data.buses).forEach(([busId, time]) => {
            const liElement = document.createElement("li");
            liElement.textContent = `Bus ${busId} arrives in ${time} minutes`;
            bussesListElement.appendChild(liElement);
        })

    } catch(error){ // catch error & du the logic!
       document.getElementById("stopName").textContent = 'Error';
       console.log(error);     
    }  
}