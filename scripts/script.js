const API_URL = "https://65427d74ad8044116ed375b3.mockapi.io/users";
const results = document.getElementById('results');

function enableBtn(inputs, btn) {

    let inputArr = Array.from(inputs);

    if (inputArr.every((input) => input.value)) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }
}

function addInputEvLis(boxId, btnId) {
    const box = document.getElementById(boxId);
    const inputs = box.getElementsByTagName('input');
    const btn = document.getElementById(btnId);

    box.addEventListener('keyup', () => {
        enableBtn(inputs, btn);
    });
}



function getData() {
    
    fetch(API_URL).then((response) => response.json()).then((data) => {
        let content = ``;
        for (let i = 0; i < data.length; i++) {
            content += `<li> <div class="name">
       ${data[i].name}
       </div>
       <div class="lastName">
       ${data[i].lastname}
       </div>
       <div class="id">
       ${data[i].id}
       </div>
       </li>
       <hr>`
        }
        results.innerHTML = content;
        return data
    })
    
}

function getUser(id) {
    fetch(`${API_URL}/${id}`).then((response) => response.json()).then((data) => {
        content = `<li> <div class="name">
       ${data.name}
       </div>
       <div class="lastName">
       ${data.lastname}
       </div>
       <div class="id">
       ${data.id}
       </div>
       </li>`
        results.innerHTML = content;
    })
    return data
}

function insertUser() {

    fetch(API_URL, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            name: document.getElementById('inputPostNombre').value,
            lastname: document.getElementById('inputPostApellido').value            
        })
    }).then(getData)
    
   
};

function updateUser(id) {
    const name = document.getElementById('inputPutNombre');
    const lastName = document.getElementById('inputPutApellido');

    fetch(API_URL + '/' + id, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify({
            name: name.value,
            lastname: lastName.value
        })
    }).then(getData)
}

function deleteUser(id) {
    fetch(API_URL + '/' + id, {
        method: 'DELETE'
    }).then(getData)        
}

document.addEventListener('DOMContentLoaded', async () => {
    const btnGet = document.getElementById("btnGet1");
    const inputGet = document.getElementById('inputGet1Id')
    const btnPost = document.getElementById("btnPost")
    const btnDelete = document.getElementById("btnDelete")
    const btnUpdate = document.getElementById('btnSendChanges')
    // Checkea si el usuario especificó una ID.
    // Si hay ID se hace Get a un usuario específico
    // Si no, se hace Get a la lista entera

    addInputEvLis('post-box', 'btnPost');
    addInputEvLis('put-box', 'btnPut');
    addInputEvLis('delete-box', 'btnDelete');
    addInputEvLis('dataModal', 'btnSendChanges');

    btnGet.addEventListener('click', () => {
        if (inputGet.value) {
            getUser(inputGet.value)
        }
        else {
            getData()
        }
    });

    btnPost.addEventListener('click', ()=>{
        insertUser()
    });

    btnDelete.addEventListener('click',() => {
        deleteUser(document.getElementById('inputDelete').value)
    });

    btnUpdate.addEventListener('click', () => {
        const inputId = document.getElementById('inputPutId');
        updateUser(inputId.value)
    })
})