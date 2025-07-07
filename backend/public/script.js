const apiUrl = 'http://localhost:3000/names'

async function fetchName () {
    const allName = await fetch(apiUrl) ;
    const jsonAllName = await allName.json() ;
    const displayName = document.getElementById('displayNames') ;
    displayName.innerHTML = '' ;
    jsonAllName.forEach((name,index) => {
        displayName.innerHTML += `
            <li>
                <span class="name-text">${name} </span>
                <div class="action-buttons">
                    <button  class="edit" onClick="editName(${index})"> Edit </button>
                    <button  class="delete" onClick="deleteName(${index})"> Delete </button>
                </div>
            </li>
        `;
    });
}

async function addName() {
    const newName = document.getElementById('newName') ;
    if (newName.value.trim() !== '') {
        await fetch(apiUrl , {
            method : "POST" , 
            headers : { 'Content-Type' : 'application/json'} , 
            body : JSON.stringify({ name : newName.value}) 
        })
        newName.value = '' ;
    }
    fetchName() ;
}

async function deleteName(index) {
    await fetch (`${apiUrl}/${index}` , {
        method : "Delete"
    })
    fetchName() ;
}

async function editName(index) {
    const updatedName = prompt("Enter updated name ...") ;
    if (updatedName) {
        await fetch(`${apiUrl}/${index}` , {
            method : "PUT" , 
            headers : { "Content-Type" : "application/json" } , 
            body : JSON.stringify({ updatedName : updatedName})
        })
    }
    fetchName() ;
}

fetchName()