function solve() {
    let infoElement = document.querySelector('div#info span.info');
    // console.log(infoElement); // <span class="info">Not Connected</span>
    let btnDepart = document.getElementById('depart');
    let btnArrive = document.getElementById('arrive');	

    let nextStopId = 'depot' // start point Depot
    let stopName;

    async function depart() {
        try{
            const res  = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${nextStopId}`);
            if(!res.ok){ // check for error on return data from server
                let error = new Error();
                error.status = responses.status;
                error.statusText = responses.statusText;
                throw error;
            }

            const data = await res.json();
            // {name: "Depot", next: "0361"}
            // name: "Depot" 
            // next: "0361"

            stopName = data.name;
            nextStopId = data.next;
            //console.log(data);
            infoElement.textContent = `Next stop ${stopName}`;
            btnDepart.disabled = true;
            btnArrive.disabled = false;
        }
        catch(error){
            infoElement.textContent = `Error`;
            btnDepart.disabled = true;
            btnArrive.disabled = true;

        }
    }

    function arrive() {
          try{
            infoElement.textContent = `Arriving at ${stopName}`;
            btnDepart.disabled = false;
            btnArrive.disabled = true;
        }
        catch(error){
            infoElement.textContent = `Error`;
            btnDepart.disabled = true;
            btnArrive.disabled = true;
        }
    }

    return {
        depart,
        arrive
    };
}

let result = solve();