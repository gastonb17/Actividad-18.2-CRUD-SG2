const API_URL = "https://65427d74ad8044116ed375b3.mockapi.io/users";


const apiRequest = async (endpoint, id, params) => {
    const data = await fetch(`${endpoint}/${id || ''}`)
    let response = await data.json();
    console.log(response)
    return response
}


let params = {
  headers: { "Content-Type": "application/json; charset=utf-8" },
  method: 'POST',
  body: JSON.stringify({
    name: document.getElementById('inputPostNombre').value,
    lastname: document.getElementById('inputPostApellido').value
  })
}

apiRequest(API_URL)